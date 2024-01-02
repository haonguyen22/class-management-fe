class RoleClass {
  ADMIN = 'admin';
  TEACHER = 'teacher';
  STUDENT = 'student';
  NONE = 'none';

  isStudentRole(role: string): boolean {
    return role === this.STUDENT;
  }

  isTeacherRole(role: string): boolean {
    return role === this.TEACHER;
  }
}

export const Role = new RoleClass();