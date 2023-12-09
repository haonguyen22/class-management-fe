import { useTranslation } from 'react-i18next';
import { BsPeopleFill } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';

function ClassComponent() {
  const { t } = useTranslation();

  return (
    <div className="mx-6 my-6 w-[300px] rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:cursor-pointer border border-solid border-gray-300">
      <div className=" flex flex-col ">
        <div className="bg-blue-700 h-[100px] w-full px-[16px] pt-[16px] pb-[12px] flex flex-row items-center justify-between">
          <div className="text-white w-4/5 ">
            <div className="text-lg font-medium truncate  hover:underline">
              Test Class asdf asdf asdf asdf asd fasdfa ads asd
            </div>
            <div className="text-[14px]  truncate">
              phat hien nhan giong moi
            </div>
            <div className="text-[12px] font-bold mt-1 truncate">
              Nguyen Khanh Huy
            </div>
          </div>
        </div>
        <div className="h-[120px]  w-full relative">
          <img
            src={
              'https://lh3.googleusercontent.com/ogw/ANLem4YUD68lxa_-KKaoufPpiFUzxyrjbxBWlsFUgJFx8Q=s32-c-mo'
            }
            className="rounded-full absolute right-0 top-0 -mt-8 mr-4 border-4 border-white  w-[70px] h-[70px]"
          />
          <div className="flex flex-col items-start justify-between h-full">
            <div className="flex flex-row mt-6 pl-4">
              <FaChalkboardTeacher className="text-2xl text-purple-700 mr-2" />
              <div className="text-lg text-black font-bold mr-8"> 10</div>

              <BsPeopleFill className="text-2xl text-purple-700 mr-2" />
              <div className="text-lg text-black font-bold mr-3"> 30</div>
            </div>
            <div className="w-full">
              <hr />
              <div className=" text-sm text-black font-normal text-right pr-2 py-4">
                {t('lastUpdate')}: 12/12/2021, 12:12
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassComponent;
