import ClassComponent from '../../components/ClassComponent';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useAuthHeader } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const auth = useAuthHeader();
  const token = auth()!.substring(7);
  const navigate = useNavigate();

  const { classes, fetchClasses } = useContext(GlobalContext);

  useEffect(() => {
    fetchClasses(token);
  }, []);
  console.log('classes', classes);
  return (
    <div className="flex flex-wrap items-start min-h-[400px]">
      {classes.map((item) => {
        return (
          <ClassComponent
            onClick={() => navigate(`/class/${item.id}/detail`)}
            key={item.id}
            description={item.description}
            name={item.name}
            avatar={
              item.avatar ||
              'https://lh3.googleusercontent.com/ogw/ANLem4YUD68lxa_-KKaoufPpiFUzxyrjbxBWlsFUgJFx8Q=s32-c-mo'
            }
            teacherName={'Nguyen Huy Khanh'}
            numOfStudent={30}
            numOfTeacher={1}
            lastUpdate={new Date().toLocaleString()}
          />
        );
      })}
    </div>
  );
};

export default HomePage;
