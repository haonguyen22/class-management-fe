import { useTranslation } from 'react-i18next';
import { SortableList } from '../../components/ClassSettings/SortableList';
import { useEffect, useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import SettingFrameLayout from './SettingFrameLayout';
import {
  GradeComposition,
  GradeStructure,
} from '../../models/IGradeComposition';
import { apiCall } from '../../utils/apiCall';
import { gradeService } from '../../services/grade/GradeService';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import AddBoxIcon from '@mui/icons-material/AddBox';

interface GradeStructureItem {
  gradeCategory: GradeStructure;
  enable: boolean;
  isCreated: boolean;
}

function GradeStructureBox() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [grades, setGrades] = useState<GradeStructureItem[]>([]);

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: GradeStructureItem,
  ) => {
    const { name, value } = event.target;
    setGrades((prev) =>
      prev.map((i) =>
        i?.gradeCategory?.id === item?.gradeCategory?.id
          ? { ...i, gradeCategory: { ...i.gradeCategory, [name]: value } }
          : i,
      ),
    );
  };

  const addGradeCategory = () => {
    setGrades((prev) => [
      ...prev,
      {
        gradeCategory: {
          id: prev.length + 1,
          priotity: prev.length + 1,
          name: '',
          weight: 0,
        },
        enable: true,
        isCreated: false,
      },
    ]);
  };

  const onEditCategory = (item: GradeStructureItem) => {
    setGrades((prev) =>
      prev.map((i) =>
        i?.gradeCategory?.id === item?.gradeCategory?.id
          ? { ...i, enable: !i.enable }
          : i,
      ),
    );
  };

  const removeCategory = (item: GradeStructureItem) => {
    setGrades((prev) =>
      prev.filter((i) => i?.gradeCategory?.id !== item?.gradeCategory?.id),
    );
  };

  const getAllGraddeCategories = async () => {
    await apiCall(gradeService.getGradeComposition(parseInt(id!)), {
      ifSuccess: (data) => {
        setGrades(
          (data.metadata as GradeStructure[])?.map((i) => ({
            gradeCategory: i,
            enable: false,
            isCreated: true,
          })),
        );
      },
      ifFailed: (err) => {
        enqueueSnackbar(err?.message ?? err.response?.data?.message, {
          variant: 'error',
        });
      },
    });
  };

  const handleAddGradeCategory = async (item: GradeComposition) => {
    await apiCall(gradeService.createGradeComposition(parseInt(id!), item), {
      ifSuccess: (data) => {
        enqueueSnackbar(t('createGradeCategory.success'), {
          variant: 'success',
        });
        getAllGraddeCategories();
      },
      ifFailed: (err) => {
        enqueueSnackbar(err.response?.data?.message ?? err?.message, {
          variant: 'error',
        });
      },
    });
  };

  useEffect(() => {
    getAllGraddeCategories();
  }, []);

  return (
    <SettingFrameLayout
      title={t('gradeCategories')}
      trailing={<Button variant="contained">{t('save')}</Button>}
    >
      {grades.length !== 0 ? (
        <SortableList
          items={grades}
          getItemId={(item) => item?.gradeCategory?.id?.toString()}
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
                className={
                  className + ' w-full flex flex-row grades-center items-center'
                }
                ref={ref}
                key={item?.gradeCategory?.id}
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
                  value={item?.gradeCategory?.name}
                  sx={{ padding: '0px', flex: 1, margin: '4px' }}
                />
                <TextField
                  id="filled-basic"
                  label={t('percentage')}
                  variant="filled"
                  name="weight"
                  required
                  disabled={!item.enable}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onTextChange(e, item)
                  }
                  value={item?.gradeCategory?.weight.toString()}
                  sx={{ padding: '0px', flex: 1, margin: '4px' }}
                />
                <div className="flex flex-row justify-around items-center">
                  {item.isCreated === false ? (
                    <AddBoxIcon
                      component="svg"
                      sx={{ margin: '6px' }}
                      onClick={() =>
                        handleAddGradeCategory({
                          name: item.gradeCategory.name,
                          weight: item.gradeCategory.weight,
                        })
                      }
                    />
                  ) : item.enable ? (
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
            const newItems = grades.slice();
            newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);
            setGrades(newItems);
          }}
        />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg font-semibold">{t('noGradeCategory')}</p>
        </div>
      )}
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
