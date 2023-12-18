import PropTypes from 'prop-types';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import { useEffect, useState } from 'react';

ClassCard.propsType = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  teacherName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  numOfStudent: PropTypes.number.isRequired,
  numOfTeacher: PropTypes.number.isRequired,
  lastUpdate: PropTypes.string.isRequired,
  backgroundUrl: PropTypes.string,
};

function ClassCard(props: {
  name: string;
  description: string;
  teacherName: string;
  avatar: string;
  numOfStudent: number;
  numOfTeacher: number;
  lastUpdate: string;
  backgroundUrl?: string;
  onClick?: () => void;
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = props.backgroundUrl || '';

    image.onload = () => {
      setIsImageLoaded(false);
    };
  }, []);

  return (
    <div
      onClick={props.onClick}
      className="m-6 w-[300px] rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:cursor-pointer border border-solid border-gray-300"
    >
      <div className=" flex flex-col ">
        <div
          className={`${!props.backgroundUrl && 'bg-green-700'} ${
            isImageLoaded && 'animate-pulse bg-slate-700'
          } h-[100px] w-full px-[16px] pt-[16px] pb-[12px] flex flex-row items-center justify-between`}
          style={{ backgroundImage: `url(${props.backgroundUrl})` }}
        >
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
        <div className="h-[150px]  w-full relative">
          <img
            src={props.avatar}
            className="rounded-full absolute right-0 top-0 -mt-8 mr-4  w-[70px] h-[70px]"
          />
          <div className="flex flex-col items-start justify-between h-full">
            <div className="flex flex-row mt-6 pl-4"></div>
            <div className="w-full">
              <hr />
              <div className=" text-right pr-2 py-4 z-10">
                <PeopleOutlinedIcon className="mx-2 hover:bg-slate-200" />
                <BallotOutlinedIcon className="mx-2 hover:bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
