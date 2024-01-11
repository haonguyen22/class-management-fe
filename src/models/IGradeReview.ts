interface GradeReviewItem {
  className: string;
  assignmentId: number;
  assignmentName: string;
  expectedValue: number;
  id: number;
  message: string;
  studentId: string;
  value: number;
  time: Date;
  avatar: string;
}

interface gradeReviewClass {
  id: number;
  className: string;
  gradeReviews: GradeReviewItem[];
}

interface IGradeReview {
  assignmentId: number;
  assignmentName: string;
  expectedValue: number;
  id: number;
  message: string;
  studentId: string;
  time: string;
  value: number;
  avatar: string;
  composition: number;
}

interface IComment {
  gradeReviewId: number;
  message: string;
  time: Date;
  byUser: string;
  avatar?: string;
}

interface IGradeComposition {
  id: number;
  name: string;
  weight: number;
  priority: number;
}

export {
  GradeReviewItem,
  gradeReviewClass,
  IGradeReview,
  IComment,
  IGradeComposition,
};
