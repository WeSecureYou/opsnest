// Role-Based Access Control
export const ROLE_HIERARCHY = {
  admin: 3,
  manager: 2,
  member: 1,
  guest: 0,
};

export type Role = keyof typeof ROLE_HIERARCHY;

export const PERMISSIONS: Record<Role, string[]> = {
  admin: [
    "org:manage",
    "user:create",
    "user:delete",
    "user:invite",
    "user:manage",
    "role:manage",
    "dept:manage",
    "task:create",
    "task:edit",
    "task:delete",
    "task:assign",
    "approval:create",
    "approval:manage",
    "approval:approve",
    "approval:reject",
    "announcement:create",
    "announcement:edit",
    "announcement:delete",
    "activity:view",
  ],
  manager: [
    "task:create",
    "task:edit",
    "task:delete",
    "task:assign",
    "approval:create",
    "approval:approve",
    "approval:reject",
    "announcement:create",
    "announcement:edit",
    "announcement:delete",
    "user:invite",
  ],
  member: [
    "task:create",
    "task:edit",
    "approval:create",
    "announcement:view",
  ],
  guest: ["task:view", "announcement:view"],
};

export function hasPermission(role: string, permission: string): boolean {
  const rolePermissions = PERMISSIONS[role as Role] || [];
  return rolePermissions.includes(permission);
}

export function canEditTask(
  userRole: string,
  taskCreatedBy: string,
  userId: string
): boolean {
  if (userRole === "admin") return true;
  if (userRole === "manager") return true;
  if (taskCreatedBy === userId) return true;
  return false;
}
