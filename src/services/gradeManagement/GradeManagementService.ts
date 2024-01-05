import { api } from '../api';

class GradeManagementService {
  async createGradeManagementAssignment(classId: number, data: any) {
    const res = await api.post('/grade-management/assignment', data, {
      headers: { 'class-id': classId },
    });
    return res;
  }

  async previewStudentGradeBoard(classId: number) {
    const res = await api.get('/grade-management/preview-student-grade-board', {
      headers: { 'class-id': classId },
    });
    return res;
  }

  async downloadTemplateGradeAssignment(classId: number, assignmentId: number) {
    const res = await api.get('/grade-management/grade-assignment-template', {
      headers: { 'class-id': classId },
      responseType: 'blob',
      params: { 'assignment-id': assignmentId },
    });
    return res;
  }

  async uploadGradeAssignmentTemplate(
    classId: number,
    assignmentId: number,
    file: File,
  ) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post(
      '/grade-management/grade-assignment-template',
      formData,
      {
        headers: { 'class-id': classId, 'Content-Type': 'multipart/form-data' },
        params: { 'assignment-id': assignmentId },
      },
    );
    return res;
  }

  async getTotalGradeBoard(classId: number) {
    const res = await api.get('/grade-management/total-grade-board', {
      headers: { 'class-id': classId },
    });
    return res;
  }

  async markViewableGrade(classId: number, gradeCompositionId: number) {
    const res = await api.post(
      '/grade-management/mark-viewable-grade',
      {
        gradeCompositionId: gradeCompositionId,
      },
      {
        headers: { 'class-id': classId },
      },
    );
    return res;
  }

  async downloadStudentListTemplate(classId: number) {
    const res = await api.get('/grade-management/student-list-template', {
      headers: { 'class-id': classId },
      responseType: 'blob',
    });
    return res;
  }

  async uploadStudentList(classId: number, data: FormData) {
    const res = await api.post(
      '/grade-management/student-list-template',
      data,
      {
        headers: {
          'class-id': classId,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res;
  }

  async updateGradeOfStudent(classId: number, data: any) {
    const res = await api.post(
      '/grade-management/input-grade-student-assignment',
      data,
      {
        headers: { 'class-id': classId },
      },
    );
    return res;
  }
}

export const gradeManagementService = new GradeManagementService();
