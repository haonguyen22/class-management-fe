export interface IGradeBoardColumn {
  compositionId: number;
  compositionName: string;
  compositionWeight: string;
  assignmentsBoard: IGradeAssignment[];
}

export interface IGradeAssignment {
  assignmentId: number;
  assignmentName: string;
  maxScore: number;
  gradesBoard: IGrade[];
}

export interface IGrade {
  studentId: number;

  value: number;
}

export interface IStudentList {
  studentId: number;
  fullName: string;
}
