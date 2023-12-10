import TypeMember from '../../components/TypeMember';
import ListUser from '../../components/ListUser';
import LayoutSmall from '../../common/Layout/MarginSmall';

const ClassMember = () => {
  return (
    <div>
      <LayoutSmall>
      {/* giáo viên */}
        <div>
          <ListUser type="Giáo viên"></ListUser>
        </div>
        {/* học sinh */}
        <div>
          <ListUser type={'Học Sinh'}></ListUser>
        </div>
      </LayoutSmall>
    </div>
  );
};

export default ClassMember;