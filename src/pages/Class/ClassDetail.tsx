import { useEffect, useState } from 'react';
import ClassBanner from '../../components/ClassBanner';
import ClassCode from '../../components/ClassCode';
import { useParams } from 'react-router-dom';
import { classService } from '../../services/class/ClassService';
import { useAuthHeader } from 'react-auth-kit';
import { handleAxiosReponse } from '../../utils/handleReponse';

const ClassDetail = () => {
  const { id } = useParams();
  const header = useAuthHeader();
  const token = header()!.substring(7);

  const [code, setCode] = useState('');

  const getClassCode = async () => {
    const res = await classService.getClassCode(token, id!);
    handleAxiosReponse(res, {
      ifSuccess: (data) => {
        setCode((data?.data?.metadata as { code: string })?.code);
      },
      ifFailed: () => {},
    });
  };

  useEffect(() => {
    getClassCode();
  }, []);

  return (
    <>
      <ClassBanner />
      <div className="mt-3">
        <ClassCode code={code} />
      </div>
    </>
  );
};

export default ClassDetail;
