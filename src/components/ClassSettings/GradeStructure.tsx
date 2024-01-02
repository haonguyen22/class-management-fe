import { useTranslation } from 'react-i18next';
import { SortableList } from '../../components/ClassSettings/SortableList';
import { useEffect, useRef, useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, CircularProgress, TextField } from '@mui/material';
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

  const [grades, setGrades] = useState<Array<GradeStructureItem>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isDragged = useRef(false);

  useEffect(() => {
    getAllGradeCategories();
  }, []);

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: GradeStructureItem,
  ) => {
    const { name, value } = event.target;
    setGrades((prev) =>
      prev.map((i) =>
        i?.gradeCategory?.id === item?.gradeCategory?.id
          ? {
              ...i,
              gradeCategory: {
                ...i.gradeCategory,
                [name]: name === 'weight' ? parseInt(value) : value,
              },
            }
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
          priority: prev.length + 1,
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

  const removeGradeCategory = async (item: GradeStructureItem) => {
    if (item.isCreated === false) {
      setGrades((prev) =>
        prev.filter(
          (i) =>
            i.gradeCategory.name !== item.gradeCategory.name &&
            i.gradeCategory.weight !== item.gradeCategory.weight,
        ),
      );
      return;
    }
    setIsLoading(true);
    await apiCall(
      gradeService.deleteGradeComposition(item.gradeCategory.id, parseInt(id!)),
      {
        ifSuccess: () => {
          enqueueSnackbar(t('deleteGradeCategory.success'), {
            variant: 'success',
          });
          setGrades((prev) =>
            prev.filter((i) => i.gradeCategory.id !== item.gradeCategory.id),
          );
        },
        ifFailed: (err) => {
          enqueueSnackbar(err.response?.data?.message ?? err?.message, {
            variant: 'error',
          });
        },
      },
    );
    setIsLoading(false);
  };

  const getAllGradeCategories = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const handleAddGradeCategory = async (item: GradeComposition) => {
    setIsLoading(true);
    await apiCall(gradeService.createGradeComposition(parseInt(id!), item), {
      ifSuccess: async () => {
        await apiCall(gradeService.getGradeComposition(parseInt(id!)), {
          ifSuccess: (data) => {
            const res =
              (data.metadata as GradeStructure[])?.find(
                (i) => i.name === item.name && i.weight === item.weight,
              ) ?? undefined;
            setGrades(
              (prev) =>
                prev
                  ?.map((i) =>
                    i.gradeCategory.name === res?.name &&
                    i.gradeCategory.weight === res?.weight &&
                    i.isCreated === false
                      ? {
                          ...i,
                          enable: !i.enable,
                          isCreated: true,
                          gradeCategory: {
                            ...i.gradeCategory,
                            id: res?.id,
                          },
                        }
                      : i,
                  )
                  .sort(
                    (a, b) =>
                      a.gradeCategory.priority - b.gradeCategory.priority,
                  ),
            );
          },
          ifFailed: (err) => {
            enqueueSnackbar(err?.message ?? err.response?.data?.message, {
              variant: 'error',
            });
          },
        });

        enqueueSnackbar(t('createGradeCategory.success'), {
          variant: 'success',
        });
      },
      ifFailed: (err) => {
        enqueueSnackbar(err.response?.data?.message ?? err?.message, {
          variant: 'error',
        });
      },
    });
    setIsLoading(false);
  };

  const onDoneEditGrade = async (item: GradeStructureItem) => {
    setIsLoading(true);
    await apiCall(
      gradeService.updateGradeComposition(
        item.gradeCategory.id,
        parseInt(id!),
        item.gradeCategory,
      ),
      {
        ifSuccess: () => {
          enqueueSnackbar(t('updateGradeCategory.success'), {
            variant: 'success',
          });
          setGrades((prev) =>
            prev.map((i) =>
              i?.gradeCategory?.id === item?.gradeCategory?.id
                ? { ...i, enable: !i.enable }
                : i,
            ),
          );
        },
        ifFailed: (err) => {
          enqueueSnackbar(err.response?.data?.message ?? err?.message, {
            variant: 'error',
          });
        },
      },
    );
    setIsLoading(false);
  };

  const arrangeGradeCategory = async () => {
    setIsLoading(true);
    const gradeIndexes = grades.map((i) => i.gradeCategory.id);
    await apiCall(
      gradeService.arrangeGradeComposition(parseInt(id!), gradeIndexes),
      {
        ifSuccess: () => {
          enqueueSnackbar(t('save.success'), {
            variant: 'success',
          });
          setGrades((prev) =>
            prev.map((i) => ({
              ...i,
              gradeCategory: {
                ...i.gradeCategory,
                priority: gradeIndexes.indexOf(i.gradeCategory.id) + 1,
              },
            })),
          );
        },
        ifFailed: (err) => {
          enqueueSnackbar(err.response?.data?.message ?? err?.message, {
            variant: 'error',
          });
        },
      },
    );
    setIsLoading(false);
    isDragged.current = false;
  };

  const totalPercentage = grades.reduce(
    (acc, curr) => acc + curr.gradeCategory.weight,
    0,
  );
  return (
    <SettingFrameLayout
      title={t('gradeCategories')}
      trailing={
        <div className="flex flex-row items-center ">
          {isLoading && (
            <CircularProgress size={20} sx={{ marginRight: '10px' }} />
          )}
          <Button
            variant="contained"
            onClick={arrangeGradeCategory}
            disabled={isDragged.current === false}
          >
            {t('save')}
          </Button>
        </div>
      }
    >
      {grades.length !== 0 ? (
        <SortableList
          items={
            isDragged.current
              ? grades
              : grades.sort((a, b) => {
                  return a.gradeCategory.priority - b.gradeCategory.priority;
                })
          }
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
                  value={item?.gradeCategory?.weight?.toString()}
                  sx={{ padding: '0px', flex: 1, margin: '4px' }}
                />
                <div className="flex flex-row justify-around items-center">
                  {item.isCreated === false ? (
                    <AddBoxIcon
                      component="svg"
                      color="warning"
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
                      color="success"
                      onClick={() => onDoneEditGrade(item)}
                    />
                  ) : (
                    <EditIcon
                      component="svg"
                      color="primary"
                      sx={{ margin: '6px' }}
                      onClick={() => onEditCategory(item)}
                    />
                  )}

                  <ClearIcon
                    sx={{ margin: '6px' }}
                    color="error"
                    onClick={() => removeGradeCategory(item)}
                  />
                </div>
              </div>
            );
          }}
          onSort={(oldIndex, newIndex) => {
            const newItems = grades.slice();
            newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);
            setGrades(newItems);
            isDragged.current = true;
          }}
        />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg font-semibold">{t('noGradeCategory')}</p>
        </div>
      )}
      <div className="flex flex-row items-center justify-between mt-10">
        <Button
          sx={{ fontWeight: '500', fontSize: '14px' }}
          onClick={addGradeCategory}
        >
          <AddBoxIcon sx={{ marginRight: '4px' }} />
          {t('addGradeCategory')}
        </Button>
        <div className="text-sm font-semibold">
          {t('totalPercentage')}:{' '}
          <span
            className={`${
              totalPercentage < 100 ? 'text-red-500' : totalPercentage > 100 ? 'text-amber-600' : 'text-black'
            }`}
          >
            {totalPercentage}%
          </span>
        </div>
      </div>  
    </SettingFrameLayout>
  );
}

export default GradeStructureBox;
