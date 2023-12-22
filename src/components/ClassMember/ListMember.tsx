import React, { useEffect, useState } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import { IMember } from '../../models/IAxiosResponse';
import SortByAlphaSharpIcon from '@mui/icons-material/SortByAlphaSharp';
import ActionStudentButton from './ActionStudentButton';
import { RoleClass } from '../../enums/RoleClass';
import { RowUser } from './RowUser';
import AddMemberDialog from './AddMemberDialog';
import { AddMember } from './AddMember';

interface ListMemberProps {
  type?: string;
  members?: IMember[];
}

export const ListMember: React.FC<ListMemberProps> = ({ type, members }) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckAll = () => {
    setCheckedAll(!checkedAll);
    if (checkedAll) {
      setChecked([]);
    } else {
      setChecked(members?.map((user) => user.id) || []);
    }
  };

  const handleCheck = (id: number) => {
    if (checked.includes(id)) {
      setChecked(checked.filter((item) => item !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  const typeTemp =
    type === 'Teacher' || type === 'Giáo viên'
      ? RoleClass.TEACHER
      : RoleClass.STUDENT;

  useEffect(() => {
    if (checked.length === members?.length && members?.length !== 0) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked]);

  return (
    <>
      <div className="w-full mb-1">
        <AddMember
          type={type}
          memberCount={members?.length}
          onclick={() => setIsOpen(true)}
        />
        <div
          className={`px-7 ${
            typeTemp === 'students' ? 'visible' : 'hidden'
          } mt-2 flex justify-between`}
        >
          <div className="flex gap-5">
            <Checkbox checked={checkedAll} onChange={handleCheckAll} />
            <ActionStudentButton visible={checked.length === 0} />
          </div>
          <IconButton>
            <SortByAlphaSharpIcon sx={{ color: 'black' }} />
          </IconButton>
        </div>
        {members &&
          members.map((user) => {
            let test = false;
            if (checked.includes(user.id)) test = true;
            return (
              <RowUser
                key={user.id}
                name={user.name}
                isChecked={test}
                visible={typeTemp === RoleClass.STUDENT}
                setIsChecked={() => handleCheck(user.id)}
              />
            );
          })}
      </div>
      <AddMemberDialog
        open={isOpen}
        setClose={() => setIsOpen(false)}
        type={type || ''}
      />
    </>
  );
};
