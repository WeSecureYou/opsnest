import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { hasPermission } from "@/lib/rbac";

const approveSchema = z.object({
  approvalNotes: z.string().optional(),
});

const rejectSchema = z.object({
  rejectionReason: z.string().min(1),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();

    const approval = await prisma.approval.findUnique({
      where: { id: params.id },
      include: {
        createdBy: { select: { id: true, name: true, email: true } },
        currentApprover: { select: { id: true, name: true, email: true } },
        approvedBy: { select: { id: true, name: true, email: true } },
      },
    });

    if (!approval || approval.organizationId !== session.user.organizationId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(approval);
  } catch (error: any) {
    console.error("Get approval error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();
    const { pathname } = new URL(req.url);
    const isApprove = pathname.includes("approve");

    if (!hasPermission(session.user.role, "approval:approve")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const approval = await prisma.approval.findUnique({
      where: { id: params.id },
    });

    if (!approval || approval.organizationId !== session.user.organizationId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (
      approval.currentApproverId !== session.user.id &&
      session.user.role !== "admin"
    ) {
      return NextResponse.json(
        { error: "You are not the designated approver" },
        { status: 403 }
      );
    }

    const body = await req.json();

    if (isApprove) {
      const { approvalNotes } = approveSchema.parse(body);

      const updated = await prisma.approval.update({
        where: { id: params.id },
        data: {
          status: "approved",
          approvalNotes,
          approvedById: session.user.id,
          approvedAt: new Date(),
        },
        include: {
          createdBy: { select: { id: true, name: true, email: true } },
          approvedBy: { select: { id: true, name: true, email: true } },
        },
      });

      await prisma.activityLog.create({
        data: {
          action: "approved",
          entity: "Approval",
          entityId: approval.id,
          organizationId: session.user.organizationId,
          userId: session.user.id,
        },
      });

      return NextResponse.json(updated);
    } else {
      const { rejectionReason } = rejectSchema.parse(body);

      const updated = await prisma.approval.update({
        where: { id: params.id },
        data: {
          status: "rejected",
          rejectionReason,
          approvedById: session.user.id,
          approvedAt: new Date(),
        },
        include: {
          createdBy: { select: { id: true, name: true, email: true } },
          approvedBy: { select: { id: true, name: true, email: true } },
        },
      });

      await prisma.activityLog.create({
        data: {
          action: "rejected",
          entity: "Approval",
          entityId: approval.id,
          organizationId: session.user.organizationId,
          userId: session.user.id,
        },
      });

      return NextResponse.json(updated);
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Process approval error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
