export interface GradeReviewRowProps {
  id: number;
  className: string;
  student: string;
  imgSrc: string;
  message: string;
  checked?: boolean | undefined;
  time?: Date | undefined;
}
