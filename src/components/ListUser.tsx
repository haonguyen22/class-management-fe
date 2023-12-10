import React, { useEffect, useState } from 'react';
import RowUser from './RowUser';
import { Checkbox } from '@mui/material';
import TypeMember from './TypeMember';
import { IMember } from '../models/IAxiosResponse';

interface ListUserProps {
  type?: string;
  members?: IMember[];
}


const ListUser: React.FC<ListUserProps> = ({type, members}) => {
  // tree user data
  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);

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

  useEffect(() => {
    if (checked.length === members?.length && members?.length !== 0) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked]);

  return (
    <div>
      <TypeMember type={type} memberCount={members?.length}></TypeMember>
      <div className='px-7'>
        <Checkbox checked={checkedAll} onChange={handleCheckAll}></Checkbox>
      </div>
      {members && members.map((user) => {
        let test = false;
        if(checked.includes(user.id))
          test = true;
        return <RowUser key={user.id} name={user.name} isChecked={test}
        setIsChecked={()=>handleCheck(user.id)}></RowUser>;
      })}
    </div>
  );
};

export default ListUser;