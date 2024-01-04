import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import { gradeService } from '../../services/grade/GradeService';
import { GradeStructure } from '../../models/IGradeComposition';
import { apiCall } from '../../utils/apiCall';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

interface GradeStructureItem {
  gradeCategory: GradeStructure;
  enable: boolean;
  isCreated: boolean;
}

const CreateHomework = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [grades, setGrades] = useState<Array<GradeStructureItem>>([]);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => {
    getAllGradeCategories();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    gradeCompositionId: Yup.number().required('Option is required'),
    maxScore: Yup.number()
      .required('Score is required')
      .min(0, 'Score must be at least 0'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      gradeCompositionId: '',
      maxScore: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      await apiCall(
        gradeService.createGradeManagementAssignment(parseInt(id!), values),
        {
          ifSuccess: (data) => {
            enqueueSnackbar(data.message, {
              variant: 'success',
            });
            formik.resetForm();
          },
          ifFailed: (err) => {
            enqueueSnackbar(err?.message ?? err.response?.data?.message, {
              variant: 'error',
            });
          },
        },
      );
    },
  });

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-between items-center text-[#1976d2] mb-3">
            <div className="flex gap-3 items-center">
              <FactCheckIcon className="w-6 h-6" />
              <div className="text-xl font-semibold">{t('exercises')}</div>
            </div>
            <Button type="submit" variant="contained" color="primary">
              {t('create')}
            </Button>
          </div>

          <TextField
            fullWidth
            label={t('name')}
            variant="outlined"
            margin="normal"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="gradeCompositionId">
              {t('gradeCategories')}
            </InputLabel>
            <Select
              label={t('gradeCategories')}
              id="gradeCompositionId"
              name="gradeCompositionId"
              value={formik.values.gradeCompositionId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.gradeCompositionId &&
                Boolean(formik.errors.gradeCompositionId)
              }
            >
              {isLoading && (
                <CircularProgress size={20} sx={{ marginRight: '10px' }} />
              )}
              {grades.map((item) => (
                <MenuItem
                  key={item.gradeCategory.id}
                  value={item.gradeCategory.id}
                >
                  {item.gradeCategory.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label={t('maxScore')}
            variant="outlined"
            margin="normal"
            name="maxScore"
            type="number"
            value={formik.values.maxScore}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.maxScore && Boolean(formik.errors.maxScore)}
            helperText={formik.touched.maxScore && formik.errors.maxScore}
          />
        </form>
      </Box>
    </Container>
  );
};

export default CreateHomework;
