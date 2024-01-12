import { useContext, useEffect, useRef, useState } from 'react';
import ClassDetailBanner from '../../components/ClassDetail/ClassDetailBanner';
import { useParams } from 'react-router-dom';

import { apiCall } from '../../utils/apiCall';
import { useTranslation } from 'react-i18next';
import DropdownCode from '../../components/ClassDetail/DropdownCode';
import { CircularProgress } from '@mui/material';
import { classService } from '../../services/class/ClassService';
import { ClassContext } from '../../context/ClassContext';
import { Role } from '../../enums/RoleClass';
import { IClass } from '../../models/IClass';

const ClassDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { classDetail, setClassDetail, isLoading } = useContext(ClassContext);

  const [code, setCode] = useState('');
  const { role } = useContext(ClassContext);
  const index = useRef(0);
  const currentId = useRef(id);

  const getClassCode = async () => {
    await apiCall(classService.getClassCode(id!), {
      ifSuccess: (data) => {
        setCode((data?.metadata as { code: string })?.code);
      },
      ifFailed: () => {
        console.log('🐛 Get class code error');
      },
    });
  };

  async function onImageBackgroundUpload(file?: File) {
    if (!file) return;
    await apiCall(classService.uploadBackgroundImage(id!, file!), {
      ifSuccess: (data) => {
        setClassDetail({
          ...classDetail!,
          backgroundImage: (data.metadata as { backgroundImage: string })
            ?.backgroundImage,
        });
      },
      ifFailed: (err) => {
        console.log(err);
      },
    });
  }

  const getClassDetail = async () => {
    await apiCall(classService.getClassInfo(id!), {
      ifSuccess: (data) => {
        const classDetail = data.metadata as IClass;
        setClassDetail(classDetail);
      },
      ifFailed: () => {
        console.log('🐛 Get class detail error');
      },
    });
  };
  useEffect(() => {
    index.current = 0;
  }, [id]);

  useEffect(() => {
    console.log(role);
    getClassDetail();
    if (
      role === Role.TEACHER &&
      (index.current != 0 || currentId.current == id)
    ) {
      currentId.current = id;
      getClassCode();
    }
    index.current++;
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
          avatar={classDetail?.owner?.avatar}
          backgroundImage={classDetail?.backgroundImage}
          onImageBackgroundUpload={onImageBackgroundUpload}
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
