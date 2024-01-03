import React, { useContext, useEffect, useState } from 'react';
import { Checkbox, IconButton } from '@mui/material';
import SortByAlphaSharpIcon from '@mui/icons-material/SortByAlphaSharp';
import ActionStudentButton from './ActionStudentButton';
import { RowUser } from './RowUser';
import AddMemberDialog from './AddMemberDialog';
import { AddMember } from './AddMember';
import { ClassContext } from '../../context/ClassContext';
import { Role } from '../../enums/RoleClass';
import { IUser } from '../../models/User';

interface ListMemberProps {
  type?: string;
  members?: IUser[];
}

export const ListMember: React.FC<ListMemberProps> = ({ type, members }) => {
  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useContext(ClassContext);

  const handleCheckAll = () => {
    setCheckedAll(!checkedAll);
    if (checkedAll) {
      setChecked([]);
    } else {
      setChecked(members?.map((user) => user.id!) || []);
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
  const isTeacherRole = Role.isTeacherRole(role);

  return (
    <>
      <div className="w-full mb-1">
        <AddMember
          type={type}
          memberCount={members?.length}
          onclick={() => setIsOpen(true)}
          enableAddMember={isTeacherRole}
        />
        <div
          className={`px-7 ${
            isTeacherRole ? 'visible' : 'hidden'
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
            if (checked.includes(user.id!)) test = true;
            return (
              <RowUser
                key={user.id}
                name={user.name}
                isChecked={test}
                avatar={user.avatar}
                visible={isTeacherRole}
                setIsChecked={() => handleCheck(user.id!)}
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
