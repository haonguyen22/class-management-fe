import { api } from '../api';

class GradeReviewService {
  async createGradeReview(classId: number, data: any) {
    const res = await api.post('/grade-review', data, {
      headers: { 'class-id': classId },
    });
    console.log(res);
    return res;
  }
}

export const gradeReviewService = new GradeReviewService();
