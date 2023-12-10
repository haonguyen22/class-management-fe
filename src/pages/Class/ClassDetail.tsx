import React, { useEffect } from 'react';
import ClassBanner from '../../components/ClassBanner';
import ClassCode from '../../components/ClassCode';
import { useLocation, useParams } from 'react-router-dom';
import { ClassService } from '../../services/Class/ClassService';
import { IClassDetail, IResponse } from '../../models/IAxiosResponse';
import { useAuthHeader } from 'react-auth-kit';
import {ClassContext} from '../../context/ClassContext';

const ClassDetail = () => {
  const {id} = useParams<{id: string}>();
  const {setId} = React.useContext(ClassContext);
  const useHeader = useAuthHeader();
  const [classInfo, setClassInfo] = React.useState<IClassDetail>();

  const getClassInfo = async (id: string) => {
    const token = useHeader().replace('Bearer ', '');
    const res = await ClassService.GetClassInfo(id, token) as IResponse;
    if (res.status === 200) {
      setClassInfo(res.data.metadata as IClassDetail);
      console.log(res.data.metadata);
    }
  };

  useEffect(() => {
    getClassInfo(id||'');
    setId(id||'');
  }, [id]);
  return (
    <>
      <ClassBanner name={classInfo?.name} description={classInfo?.description}></ClassBanner>
      <div className='mt-3'>
        <ClassCode></ClassCode>
      </div>
    </>
  );
};

export default ClassDetail;