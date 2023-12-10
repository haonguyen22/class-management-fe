import TypeMember from '../../components/TypeMember';
import ListUser from '../../components/ListUser';
import LayoutSmall from '../../common/Layout/MarginSmall';
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { IClassContext, ClassContext } from '../../context/ClassContext';
import { ClassService } from '../../services/Class/ClassService';
import { useAuthHeader } from 'react-auth-kit';
import { IMember, IResponse } from '../../models/IAxiosResponse';

const ClassMember = () => {
  const {t} = useTranslation();
  const useHeader = useAuthHeader();
  const {id} = useContext(ClassContext) as IClassContext;

  const [teachers, setTeachers] = React.useState<IMember[]>([]);
  const [students, setStudents] = React.useState<IMember[]>([]);

  const getListUser = async (id: string|undefined) => {
    const token = useHeader().replace('Bearer ', '');
    const res = await ClassService.GetListMember(id, token) as IResponse;
    if (res.status === 200) {
      const data = res.data.metadata as {students: IMember[], teachers: IMember[]};
      setTeachers(data.teachers);
      setStudents(data.students);
    }
  };

  React.useEffect(() => {
    getListUser(id);
  }, [id]);

  return (
    <div>
      <LayoutSmall>
      {/* giáo viên */}
        <div>
          <ListUser type={t('ClassMember.Teacher')} members={teachers}></ListUser>
        </div>
        {/* học sinh */}
        <div>
          <ListUser type={t('ClassMember.Student')} members={students}></ListUser>
        </div>
      </LayoutSmall>
    </div>
  );
};

export default ClassMember;