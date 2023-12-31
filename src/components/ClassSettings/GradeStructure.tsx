import { useTranslation } from 'react-i18next';
import { SortableList } from '../../components/ClassSettings/SortableList';
import { useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { GradeStructureItem } from '../../models/GradeStructureItem';
import SettingFrameLayout from './SettingFrameLayout';

function GradeStructureBox() {
  const { t } = useTranslation();

  const [items, setItems] = useState<GradeStructureItem[]>([
    {
      id: 1,
      name: 'Final Exam',
      gradeScale: '100',
      enable: false,
    },
    {
      id: 2,
      name: 'Midterm Exam',
      gradeScale: '100',
      enable: false,
    },
    {
      id: 3,
      name: 'Homework',
      gradeScale: '100',
      enable: false,
    },
    {
      id: 4,
      name: 'Attendance',
      gradeScale: '100',
      enable: false,
    },
  ]);

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: GradeStructureItem,
  ) => {
    const { name, value } = event.target;
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, [name]: value } : i)),
    );
  };

  const addGradeCategory = () => {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: '',
        gradeScale: '',
        enable: true,
      },
    ]);
  };

  const onEditCategory = (item: GradeStructureItem) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, enable: !item.enable } : i)),
    );
  };

  const removeCategory = (item: GradeStructureItem) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  return (
    <SettingFrameLayout
      title={t('gradeCategories')}
      trailing={<Button variant="contained">{t('save')}</Button>}
    >
      <SortableList
        items={items}
        getItemId={(item) => item.id}
        renderItem={({
          item,
          isActive,
          isDragged,
          ref,
          props,
          handleProps,
        }) => {
          let className = 'MyListItem';
          if (isActive) className += ' isActive';
          if (isDragged) className += ' isDragged';

          return (
            <div
              className={className + ' w-full flex flex-row items-center'}
              ref={ref}
              key={item.id}
              {...props}
            >
              <div className="handle" {...handleProps}>
                <DragIndicatorIcon />
              </div>

              <TextField
                id="filled-basic"
                label={t('gradeCategory')}
                variant="filled"
                required
                disabled={!item.enable}
                name="name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onTextChange(e, item)
                }
                value={item.name}
                sx={{ padding: '0px', flex: 1, margin: '4px' }}
              />
              <TextField
                id="filled-basic"
                label={t('percentage')}
                variant="filled"
                name="gradeScale"
                required
                disabled={!item.enable}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onTextChange(e, item)
                }
                value={item.gradeScale}
                sx={{ padding: '0px', flex: 1, margin: '4px' }}
              />
              <div className="flex flex-row justify-around items-center">
                {item.enable ? (
                  <DoneIcon
                    component="svg"
                    sx={{ margin: '6px' }}
                    onClick={() => onEditCategory(item)}
                  />
                ) : (
                  <EditIcon
                    component="svg"
                    sx={{ margin: '6px' }}
                    onClick={() => onEditCategory(item)}
                  />
                )}

                <ClearIcon
                  sx={{ margin: '6px' }}
                  onClick={() => removeCategory(item)}
                />
              </div>
            </div>
          );
        }}
        onSort={(oldIndex, newIndex) => {
          const newItems = items.slice();
          newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);
          setItems(newItems);
        }}
      />
      <Button
        sx={{ maxWidth: '200px', marginTop: '20px', fontWeight: '500' }}
        onClick={addGradeCategory}
      >
        {t('addGradeCategory')}
      </Button>
    </SettingFrameLayout>
  );
}

export default GradeStructureBox;
