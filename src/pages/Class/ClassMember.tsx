import TypeMember from '../../components/TypeMember';
import ListUser from '../../components/ListUser';
import LayoutSmall from '../../common/Layout/MarginSmall';
import { useTranslation } from 'react-i18next';

const ClassMember = () => {
  const {t} = useTranslation();
  return (
    <div>
      <LayoutSmall>
      {/* giáo viên */}
        <div>
          <ListUser type={t('ClassMember.Teacher')}></ListUser>
        </div>
        {/* học sinh */}
        <div>
          <ListUser type={t('ClassMember.Student')}></ListUser>
        </div>
      </LayoutSmall>
    </div>
  );
};

export default ClassMember;