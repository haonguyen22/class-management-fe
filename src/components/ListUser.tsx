import React, { useEffect, useState } from 'react';
import RowUser from './RowUser';
import { Checkbox, IconButton } from '@mui/material';
import TypeMember from './TypeMember';
import { IMember } from '../models/IAxiosResponse';
// import DropdownCode from './DropdownCode';
import AddMember from './AddMember';
import ActionDrop from './ActionDrop';
import SortByAlphaSharpIcon from '@mui/icons-material/SortByAlphaSharp';

interface ListUserProps {
  type?: string;
  members?: IMember[];
}


const ListUser: React.FC<ListUserProps> = ({type, members}) => {
  // tree user data
  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckAll = () => {
    setCheckedAll(!checkedAll);
    if (checkedAll) {
      setChecked([]);
    } else {
      setChecked(members?.map((user) => user.id)||[]);
    }
  };

  const handleCheck = (id: number) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((item) => item !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const typeTemp = (type === 'Teacher'||type ==='Giáo viên') ? 'teachers' : 'students';

  useEffect(() => {
    if (checked.length === members?.length && members?.length !== 0) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked]);
  console.log(checked, checked.length);

  return (
    <>
      <div className='w-full px-40 mb-1'>
        <TypeMember type={type} memberCount={members?.length} onclick={()=>setIsOpen(true)} />
        <div className={`px-7 ${typeTemp==='students'?'visible':'hidden'} mt-2 flex justify-between`}>
          <div className='flex gap-5'>
            <Checkbox checked={checkedAll} onChange={handleCheckAll}/>
            <ActionDrop visible={checked.length===0} />
          </div>
          <IconButton>
            <SortByAlphaSharpIcon sx={{ color: 'black'}}/>
          </IconButton>
        </div>
        {members && members.map((user) => {
          let test = false;
          if(checked.includes(user.id))
            test = true;
          return <RowUser key={user.id} name={user.name} isChecked={test} visible={typeTemp==='students'}
          setIsChecked={()=>handleCheck(user.id)}/>;
        })}
      </div>
      <AddMember open={isOpen} setClose={()=>setIsOpen(false)} type={type||''}/>
    </>
  );
};

export default ListUser;