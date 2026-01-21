import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function withAuth(
  req: NextRequest,
  handler: (req: NextRequest, session: any) => Promise<Response>
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return handler(req, session);
}

export function withOrgContext(orgId: string) {
  return (session: any) => {
    if (session.user.organizationId !== orgId) {
      return NextResponse.json(
        { error: "Forbidden - organization mismatch" },
        { status: 403 }
      );
    }
    return session;
  };
}
