import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserPlus } from 'react-icons/fa';

interface AddMemberProps {
  type?: string;
  memberCount?: number;
  onclick?: () => void;
  enableAddMember: boolean;
}

export const AddMember: React.FC<AddMemberProps> = ({
  type,
  memberCount,
  onclick,
  enableAddMember,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-between items-center p-3 text-blue-700">
        <span className="text-2xl font-bold">
          {type?.toUpperCase() || 'Default member'}
        </span>
        <div className="flex justify-between items-center gap-5">
          <span className="text-sm">{`${memberCount} ${t(
            'TypeMember.type',
          )}`}</span>
          {enableAddMember && (
            <div className="text-xl cursor-pointer" onClick={onclick}>
              <FaUserPlus />
            </div>
          )}
        </div>
      </div>
      <hr className="h-0.5 bg-blue-700 mb-3" />
    </>
  );
};
