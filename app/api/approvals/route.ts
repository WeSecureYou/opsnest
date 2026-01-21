import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { hasPermission } from "@/lib/rbac";

const createApprovalSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  requestType: z.string().default("general"),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
  currentApproverId: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    const session = await requireAuth();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;

    const approvals = await prisma.approval.findMany({
      where: {
        organizationId: session.user.organizationId,
        ...(status && { status }),
      },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        currentApprover: { select: { id: true, name: true, email: true } },
        approvedBy: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.approval.count({
      where: {
        organizationId: session.user.organizationId,
        ...(status && { status }),
      },
    });

    return NextResponse.json({
      approvals,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Get approvals error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();

    if (!hasPermission(session.user.role, "approval:create")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, requestType, priority, currentApproverId } =
      createApprovalSchema.parse(body);

    const approval = await prisma.approval.create({
      data: {
        title,
        description,
        requestType,
        priority,
        organizationId: session.user.organizationId,
        createdById: session.user.id,
        currentApproverId,
      },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        currentApprover: { select: { id: true, name: true, email: true } },
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "created",
        entity: "Approval",
        entityId: approval.id,
        organizationId: session.user.organizationId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(approval, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Create approval error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
