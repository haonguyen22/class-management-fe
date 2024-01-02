import ClassDetailBox from '../../components/ClassSettings/ClassDetailBox';
import GradeStructureBox from '../../components/ClassSettings/GradeStructure';

function ClassSettingsPage() {
  return (
    <>
      <div className="flex flex-row w-full items-start ">
        <GradeStructureBox />
        <ClassDetailBox />
      </div>
    </>
  );
}

export default ClassSettingsPage;
