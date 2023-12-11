import { useContext, useEffect, useState } from 'react';
import ClassBanner from '../../components/ClassBanner';
import { useParams } from 'react-router-dom';

import { useAuthHeader } from 'react-auth-kit';
import { handleAxiosReponse } from '../../utils/handleReponse';
import { useTranslation } from 'react-i18next';
import DropdownCode from '../../components/DropdownCode';
import { IClass } from '../../models/IClass';
import { CircularProgress } from '@mui/material';
import { classService } from '../../services/Class/ClassService';
import { ClassContext } from '../../context/GlobalContext';

const ClassDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { setId } = useContext(ClassContext);
  const header = useAuthHeader();
  const token = header()!.substring(7);

  const [code, setCode] = useState('');
  const [classDetail, setClassDetail] = useState<IClass>();
  const [isLoading, setIsLoading] = useState(false);

  const getClassCode = async () => {
    const res = await classService.getClassCode(token, id!);
    handleAxiosReponse(res, {
      ifSuccess: (data) => {
        setCode((data?.data?.metadata as { code: string })?.code);
      },
      ifFailed: () => {},
    });
  };

  const getClassDetail = async () => {
    setIsLoading(true);
    const res = await classService.getClassById(token, id!);
    handleAxiosReponse(res, {
      ifSuccess: (data) => {
        setClassDetail(data.data.metadata as IClass);
      },
      ifFailed: (err) => {
        console.log('🐛Get detail class error :', err.message);
      },
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getClassCode();
    getClassDetail();
  }, [id]);

  if (isLoading)
    return (
      <div className="flex flex-row items-center justify-center">
        <CircularProgress />
      </div>
    );
  else
    return (
      <>
        <ClassBanner
          name={classDetail?.name}
          description={classDetail?.description}
          avatar={classDetail?.avatar}
        />
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
      </>
    );
};

export default ClassDetail;
