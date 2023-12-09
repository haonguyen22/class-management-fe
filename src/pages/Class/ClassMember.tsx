import TypeMember from '../../components/TypeMember';
import ListUser from '../../components/ListUser';
import LayoutSmall from '../../common/Layout/LayoutSmall';

const ClassMember = () => {
  return (
    <div>
      <LayoutSmall>
      {/* giáo viên */}
        <div>
          <TypeMember type='Giáo viên'></TypeMember>
          <ListUser></ListUser>
        </div>
        {/* học sinh */}
        <div>
          <TypeMember type='Học sinh'></TypeMember>
          <ListUser></ListUser>
        </div>
      </LayoutSmall>
    </div>
  );
};

export default ClassMember;