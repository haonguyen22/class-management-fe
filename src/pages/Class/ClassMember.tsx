import LayoutSmall from '../../common/Layout/MarginSmall';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { IMember, IResponse } from '../../models/IAxiosResponse';
import { classService } from '../../services/class/ClassService';
import { useParams } from 'react-router-dom';
import { ListMember } from '../../components/ClassMember/ListMember';

const ClassMember = () => {
  const { t } = useTranslation();
  const useHeader = useAuthHeader();
  const { id } = useParams<{ id: string }>();

  const [teachers, setTeachers] = React.useState<IMember[]>([]);
  const [students, setStudents] = React.useState<IMember[]>([]);

  const getListUser = async (id: string | undefined) => {
    const token = useHeader().replace('Bearer ', '');
    const res = (await classService.GetListMember(id, token)) as IResponse;
    if (res.status === 200) {
      const data = res.data.metadata as {
        students: IMember[];
        teachers: IMember[];
      };
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
        <ListMember type={t('ClassMember.Teacher')} members={teachers} />
        <ListMember type={t('ClassMember.Student')} members={students} />
      </LayoutSmall>
    </div>
  );
};

export default ClassMember;
