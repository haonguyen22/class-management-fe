import { useTranslation } from 'react-i18next';
import { BsPeopleFill } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';
import ClassComponent from '../../components/ClassComponent';

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center  ">
      <ClassComponent />
      <ClassComponent />
      <ClassComponent />
      <ClassComponent />
      <ClassComponent />
      <ClassComponent />
      <ClassComponent />
      <ClassComponent />
      <ClassComponent />
      <ClassComponent />
    </div>
  );
};

export default HomePage;
