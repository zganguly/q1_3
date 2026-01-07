export type UserRole = "ut_admin" | "ut_user" | "ut_manager" | "ut_viewer" | "ut_editor";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}
