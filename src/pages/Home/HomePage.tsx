import ClassComponent from '../../components/ClassComponent';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useAuthHeader } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { avatarDefault } from '../../constants/globalConst';
import { useTranslation } from 'react-i18next';
import LocaleContext from '../../context/LocaleContext';

const HomePage = () => {
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);
  const auth = useAuthHeader();
  const token = auth()!.substring(7);
  const navigate = useNavigate();

  const { classes, fetchClasses, isFetchingClasses } =
    useContext(GlobalContext);

  useEffect(() => {
    fetchClasses(token);
  }, []);

  if (!isFetchingClasses && classes.length === 0) {
    return <div className="flex mt-12 justify-center h-[300px]">{t('noClass')}</div>;
  } else {
    return (
      <div className="flex flex-wrap items-start min-h-[400px]">
        {classes.map((item) => {
          console.log(item);
          return (
            <ClassComponent
              onClick={() => navigate(`/class/${item.id}/detail`)}
              key={item.id}
              description={item.description}
              name={item.name}
              avatar={item.avatar || avatarDefault}
              teacherName={item.owner?.name}
              numOfStudent={item.numberOfStudents}
              numOfTeacher={item.numberOfTeachers}
              lastUpdate={new Date(item.updatedAt).toLocaleString(locale)}
            />
          );
        })}
      </div>
    );
  }
};

export default HomePage;
