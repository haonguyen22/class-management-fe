import ClassCard from '../../components/Class/ClassCard';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { avatarDefault } from '../../constants/globalConst';
import { useTranslation } from 'react-i18next';
import LocaleContext from '../../context/LocaleContext';

const HomePage = () => {
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  const { classes, fetchClasses, isFetchingClasses } =
    useContext(GlobalContext);

  useEffect(() => {
    fetchClasses();
  }, []);

  if (!isFetchingClasses && classes.length === 0) {
    return (
      <div className="flex mt-12 justify-center h-[300px]">{t('noClass')}</div>
    );
  } else {
    return (
      <div className="flex flex-wrap items-start min-h-[400px]">
        {classes.map((item) => {
          return (
            <ClassCard
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
