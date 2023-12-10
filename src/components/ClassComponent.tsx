import { useTranslation } from 'react-i18next';
import { BsPeopleFill } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

ClassComponent.propsType = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  teacherName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  numOfStudent: PropTypes.number.isRequired,
  numOfTeacher: PropTypes.number.isRequired,
  lastUpdate: PropTypes.string.isRequired,
};

function ClassComponent(props: {
  name: string;
  description: string;
  teacherName: string;
  avatar: string;
  numOfStudent: number;
  numOfTeacher: number;
  lastUpdate: string;
  onClick?: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div
      onClick={props.onClick}
      className="m-6 w-[300px] rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:cursor-pointer border border-solid border-gray-300"
    >
      <div className=" flex flex-col ">
        <div className="bg-blue-700 h-[100px] w-full px-[16px] pt-[16px] pb-[12px] flex flex-row items-center justify-between">
          <div className="text-white w-4/5 ">
            <div className="text-lg font-medium truncate  hover:underline">
              {props.name}
            </div>
            <div className="text-[14px]  truncate">{props.description}</div>
            <div className="text-[12px] font-bold mt-1 truncate">
              {props.teacherName}
            </div>
          </div>
        </div>
        <div className="h-[120px]  w-full relative">
          <img
            src={props.avatar}
            className="rounded-full absolute right-0 top-0 -mt-8 mr-4 border-4 border-white  w-[70px] h-[70px]"
          />
          <div className="flex flex-col items-start justify-between h-full">
            <div className="flex flex-row mt-6 pl-4">
              <FaChalkboardTeacher className="text-2xl text-purple-700 mr-2" />
              <div className="text-lg text-black font-bold mr-8">
                {props.numOfTeacher}
              </div>

              <BsPeopleFill className="text-2xl text-purple-700 mr-2" />
              <div className="text-lg text-black font-bold mr-3">
                {props.numOfStudent}
              </div>
            </div>
            <div className="w-full">
              <hr />
              <div className=" text-sm text-black font-normal text-right pr-2 py-4">
                {t('lastUpdate', { date: props.lastUpdate })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassComponent;
