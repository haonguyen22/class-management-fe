import { useTranslation } from 'react-i18next';
import React from 'react';
import { IMember } from '../../models/IAxiosResponse';
import { classService } from '../../services/class/ClassService';
import { useParams } from 'react-router-dom';
import { ListMember } from '../../components/ClassMember/ListMember';
import { apiCall } from '../../utils/apiCall';

const ClassMember = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const [teachers, setTeachers] = React.useState<IMember[]>([]);
  const [students, setStudents] = React.useState<IMember[]>([]);

  const getListUser = async (id: string | undefined) => {
    await apiCall(classService.getListMember(id), {
      ifSuccess: (data) => {
        if (data.status === 200) {
          const metadata = data.metadata as {
            students: IMember[];
            teachers: IMember[];
          };
          setTeachers(metadata.teachers as IMember[]);
          setStudents(metadata.students as IMember[]);
        }
      },
      ifFailed: (err) => {
        console.log(err);
      },
    });
  };

  React.useEffect(() => {
    getListUser(id);
  }, [id]);

  return (
    <div>
      <ListMember type={t('ClassMember.Teacher')} members={teachers} />
      <ListMember type={t('ClassMember.Student')} members={students} />
    </div>
  );
};

export default ClassMember;
