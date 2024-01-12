import { api } from '../api';

class GradeReviewService {
  async createGradeReview(classId: number, data: any) {
    const res = await api.post('/grade-review', data, {
      headers: { 'class-id': classId },
    });
    return res;
  }

  async getGradeReview() {
    const res = await api.get('/grade-review');
    return res;
  }

  async getGradeReviewDetail(gradeReviewId: number) {
    const res = await api.get(`/grade-review/${gradeReviewId}`);
    console.log(res);
    return res;
  }

  async createComment(gradeReviewId: number, data: any) {
    const res = await api.post('/grade-review/comment', {
      gradeReviewId,
      ...data,
    });
    return res;
  }

  async reviewGradeReview(gradeReviewId: number, data: any) {
    const res = await api.post('/grade-review/review', data);
    return res;
  }
}

export const gradeReviewService = new GradeReviewService();
