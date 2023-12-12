import React, { useEffect, useState } from 'react';
import TypeMember from './TypeMember';
import { IMember } from '../models/IAxiosResponse';
import Table from './Table';
import AddMember from './AddMember';

interface ListMemberProps {
  type?: string;
  members?: IMember[];
}

const ListMember:React.FC<ListMemberProps> = ({type, members}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <div className='flex flex-col gap-3'>
        <TypeMember type={type} memberCount={members?.length} onclick={()=>setIsOpen(true)}></TypeMember>
        <Table value={members||[]}/>
        <AddMember open={isOpen} setClose={()=>setIsOpen(false)} type={type||''}></AddMember>
      </div>
  );
};

export default ListMember;