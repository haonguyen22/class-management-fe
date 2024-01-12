import ClassCard from '../../components/Class/ClassCard';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import { avatarDefault, backgroundDefault } from '../../constants/globalConst';
import { useTranslation } from 'react-i18next';
import LocaleContext from '../../context/LocaleContext';
import { useAuthHeader, useSignIn } from 'react-auth-kit';
import { apiCall } from '../../utils/apiCall';
import { userService } from '../../services/user/UserService';
import { IUser } from '../../models/User';

const HomePage = () => {
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();
  const SignIn = useSignIn();

  const { classes, fetchClasses, isFetchingClasses } =
    useContext(GlobalContext);
  const authHeader = useAuthHeader();
  const getMe = async () => {

    const [tokenType, token] = authHeader().split(' ');

    await apiCall(userService.getMe(), {
      ifSuccess: (data) => {
        SignIn({
          token,
          tokenType,
          expiresIn: 3600,
          authState: { user: data.metadata as IUser },
        });
      },
      ifFailed: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    getMe();
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
              backgroundUrl={item.backgroundImage ?? backgroundDefault}
              avatar={item?.owner?.avatar || avatarDefault}
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
