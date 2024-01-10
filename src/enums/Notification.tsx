import GradingIcon from '@mui/icons-material/Grading';
import RateReviewIcon from '@mui/icons-material/RateReview';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

export const NotificationType = {
  MARK_FINAL_GRADE: { title: 'MARK_FINAL_GRADE', icon: <GradingIcon /> },
  REVIEW_REQUEST: { title: 'REVIEW_REQUEST', icon: <RateReviewIcon /> },
  REQUEST_REVIEW: { title: 'REQUEST_REVIEW', icon: <QuestionAnswerIcon /> },

  isMarkFinalGrade: (type: string) =>
    type === NotificationType.MARK_FINAL_GRADE.title,

  isReviewRequest: (type: string) =>
    type === NotificationType.REVIEW_REQUEST.title,

  isRequestReview: (type: string) =>
    type === NotificationType.REQUEST_REVIEW.title,

  // check if type is one of the above
  isOneOf: (type: string) =>
    NotificationType.isMarkFinalGrade(type) ||
    NotificationType.isReviewRequest(type) ||
    NotificationType.isRequestReview(type),
  // convert type
  convert: (type: string) => {
    if (NotificationType.isMarkFinalGrade(type)) {
      return NotificationType.MARK_FINAL_GRADE;
    }
    if (NotificationType.isReviewRequest(type)) {
      return NotificationType.REVIEW_REQUEST;
    }
    if (NotificationType.isRequestReview(type)) {
      return NotificationType.REQUEST_REVIEW;
    }
  },
};
