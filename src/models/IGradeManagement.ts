export interface IGradeBoardColumn {
  compositionId: number;
  compositionName: string;
  compositionWeight: number;
  viewable: boolean;
  assignmentsBoard: IGradeAssignment[];
}

export interface IGradeAssignment {
  assignmentId: number;
  assignmentName: string;
  maxScore: number;
  value?: unknown;
  gradesBoard: IGrade[];
}

export interface IGrade {
  indexStudent: number;

  value: number;
}

export interface IStudentList {
  studentId: string;
  fullName: string;
  grade: number;
}
