import ListUser from '../../components/ListUser';
import LayoutSmall from '../../common/Layout/MarginSmall';
import { useTranslation } from 'react-i18next';
import React, { useContext } from 'react';
import { IClassContext, ClassContext } from '../../context/GlobalContext';
import { useAuthHeader } from 'react-auth-kit';
import { IMember, IResponse } from '../../models/IAxiosResponse';
import { classService } from '../../services/Class/ClassService';
import { useParams } from 'react-router-dom';

const ClassMember = () => {
  const { t } = useTranslation();
  const useHeader = useAuthHeader();
  const { id } = useParams<{ id: string }>();
  const {setId} = useContext(ClassContext) as IClassContext;

  const [teachers, setTeachers] = React.useState<IMember[]>([]);
  const [students, setStudents] = React.useState<IMember[]>([]);

  const getListUser = async (id: string | undefined) => {
    const token = useHeader().replace('Bearer ', '');
    const res = (await classService.GetListMember(id, token)) as IResponse;
    if (res.status === 200) {
      console.log(res.data);
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
        {/* giáo viên */}
        <div>
          <ListUser type={t('ClassMember.Teacher')} members={teachers} />
        </div>
        {/* học sinh */}
        <div>
          <ListUser type={t('ClassMember.Student')} members={students} />
        </div>
      </LayoutSmall>
    </div>
  );
};

export default ClassMember;
