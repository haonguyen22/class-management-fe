import {
  AddGradeStructureItemDTO,
  GradeComposition,
} from '../../models/IGradeComposition';
import { api } from '../api';

class GradeService {
  async getGradeComposition(classId: number) {
    const res = await api.get('/grade-composition', {
      headers: { 'class-id': classId },
    });
    return res;
  }

  async createGradeComposition(classId: number, data: GradeComposition) {
    const res = await api.post(
      '/grade-composition',
      [
        {
          name: data.name,
          weight: parseInt(data.weight.toString()),
        },
      ],
      {
        headers: { 'class-id': classId },
      },
    );
    return res;
  }

  async updateGradeComposition(
    id: number,
    classId: number,
    data: AddGradeStructureItemDTO,
  ) {
    const res = await api.put(`/grade-composition/${id}`, data, {
      headers: { 'class-id': classId },
    });
    return res;
  }

  async deleteGradeComposition(id: number, classId: number) {
    const res = await api.delete(`/grade-composition/${id}`, {
      headers: { 'class-id': classId },
    });
    return res;
  }

  async arrangeGradeComposition(classId: number, data: number[]) {
    const res = await api.patch('/grade-composition/arrange', data, {
      headers: { 'class-id': classId },
    });
    return res;
  }

  async createGradeManagementAssignment(classId: number, data: any) {
    const res = await api.post('/grade-management/assignment', data, {
      headers: { 'class-id': classId },
    });
    return res;
  }

  async downloadStudentListTemplate(classId: number) {
    const res = await api.get('/grade-management/student-list-template', {
      headers: { 'class-id': classId },
      responseType: 'blob',
    });
    return res;
  }

  async uploadStudentList(classId: number, file: any) {
    const res = await api.post(
      '/grade-management/student-list-template',
      file,
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
    console.log(data);
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

export const gradeService = new GradeService();
