import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { hasPermission } from "@/lib/rbac";

const createAnnouncementSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  targetRole: z.string().optional(),
  targetDepartmentIds: z.array(z.string()).optional(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;

    const announcements = await prisma.announcement.findMany({
      where: {
        organizationId: session.user.organizationId,
      },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.announcement.count({
      where: {
        organizationId: session.user.organizationId,
      },
    });

    return NextResponse.json({
      announcements,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Get announcements error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();

    if (!hasPermission(session.user.role, "announcement:create")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, content, targetRole, targetDepartmentIds } =
      createAnnouncementSchema.parse(body);

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        targetRole,
        targetDepartmentIds: targetDepartmentIds || [],
        organizationId: session.user.organizationId,
        createdById: session.user.id,
      },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "created",
        entity: "Announcement",
        entityId: announcement.id,
        organizationId: session.user.organizationId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(announcement, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create announcement error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
