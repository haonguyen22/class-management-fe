import { useContext, useEffect, useState } from 'react';
import ClassDetailBanner from '../../components/ClassDetail/ClassDetailBanner';
import { useParams } from 'react-router-dom';

import { apiCall } from '../../utils/apiCall';
import { useTranslation } from 'react-i18next';
import DropdownCode from '../../components/ClassDetail/DropdownCode';
import { IClass } from '../../models/IClass';
import { CircularProgress } from '@mui/material';
import { classService } from '../../services/class/ClassService';
import { ClassContext } from '../../context/ClassContext';
import { Role } from '../../enums/RoleClass';

const ClassDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const [code, setCode] = useState('');
  const [classDetail, setClassDetail] = useState<IClass>();
  const [isLoading, setIsLoading] = useState(false);
  const { role } = useContext(ClassContext);

  const getClassCode = async () => {
    console.log(role);
    await apiCall(classService.getClassCode(id!), {
      ifSuccess: (data) => {
        setCode((data?.metadata as { code: string })?.code);
      },
      ifFailed: () => {
        console.log('🐛 Get class code error');
      },
    });
  };

  const getClassDetail = async () => {
    setIsLoading(true);
    await apiCall(classService.getClassById(id!), {
      ifSuccess: (data) => {
        setClassDetail(data.metadata as IClass);
      },
      ifFailed: (err) => {
        console.log('🐛 Get detail class error :', err.message);
      },
    });

    setIsLoading(false);
  };

  useEffect(() => {
    if (role === Role.TEACHER) getClassCode();
    getClassDetail();
  }, [id, role]);

  if (isLoading)
    return (
      <div className="flex flex-row items-center justify-center">
        <CircularProgress />
      </div>
    );
  else
    return (
      <>
        <ClassDetailBanner
          name={classDetail?.name}
          description={classDetail?.description}
          avatar={classDetail?.avatar}
        />
        {role === Role.TEACHER && (
          <div className="mt-3">
            <div className="inline-block w-60 border border-gray-500 shadow-md rounded-md p-3">
              <div className="flex items-center justify-between px-3 py-2">
                <h1 className="text-lg font-bold">{t('ClassCode.title')}</h1>
                <DropdownCode code={code} />
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <h1 className="text-xl font-bold text-blue-500">
                  {code || <CircularProgress />}
                </h1>
              </div>
            </div>
          </div>
        )}
      </>
    );
};

export default ClassDetail;
