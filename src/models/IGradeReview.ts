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
  studentId: number;
  time: string;
  value: number;
  avatar: string;
}

interface IComment {
  gradeReviewId: number;
  message: string;
  time: Date;
  byUser: string;
  avatar?: string;
}

export { GradeReviewItem, gradeReviewClass, IGradeReview, IComment };
