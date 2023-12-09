import React, { useEffect, useState } from 'react';
import RowUser from './RowUser';
import { Checkbox } from '@mui/material';



const ListUser = () => {
  // tree user data
  const data = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: ''
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      email: ''
    },
    {
      id: 3,
      name: 'Nguyễn Văn C',
      email: ''
    },
    {
      id: 4,
      name: 'Nguyễn Văn D',
      email: ''
    },
    {
      id: 5,
      name: 'Nguyễn Văn E',
      email: ''
    },
  ];

  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);

  const handleCheckAll = () => {
    setCheckedAll(!checkedAll);
    if (checkedAll) {
      setChecked([]);
    } else {
      setChecked(data.map((user) => user.id));
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
    if (checked.length === data.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked]);

  return (
    <div>
      <div>
        <Checkbox checked={checkedAll} onChange={handleCheckAll}></Checkbox>
        <span>Chọn tất cả</span>
      </div>
      {data.map((user) => {
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