import { useTranslation } from 'react-i18next';
import React from 'react';
import { classService } from '../../services/class/ClassService';
import { useParams } from 'react-router-dom';
import { ListMember } from '../../components/ClassMember/ListMember';
import { apiCall } from '../../utils/apiCall';
import { IUser } from '../../models/User';

const ClassMember = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const [teachers, setTeachers] = React.useState<IUser[]>([]);
  const [students, setStudents] = React.useState<IUser[]>([]);

  const getListUser = async (id: string | undefined) => {
    await apiCall(classService.getListMember(id), {
      ifSuccess: (data) => {
        if (data.status === 200) {
          const metadata = data.metadata as {
            students: IUser[];
            teachers: IUser[];
          };
          setTeachers(metadata.teachers as IUser[]);
          setStudents(metadata.students as IUser[]);
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
