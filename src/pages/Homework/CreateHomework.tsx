import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Container, Box } from '@mui/material';

const CreateHomework = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    option: Yup.string().required('Option is required'),
    score: Yup.number().required('Score is required').min(0, 'Score must be at least 0'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      option: '',
      score: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <form onSubmit={formik.handleSubmit}>
          <div className='flex justify-between items-center text-[#1976d2] mb-3'>
            <div className='flex gap-3 items-center'>
              <FactCheckIcon className='w-6 h-6'/>
              <div className='text-xl font-semibold'>Homework</div>
            </div>
            <Button type="submit" variant="contained" color="primary" >
              Create
            </Button>
          </div>
          <TextField
            fullWidth
            label="Name"
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
            <InputLabel htmlFor="option">Option</InputLabel>
            <Select
              label="Option"
              id="option"
              name="option"
              value={formik.values.option}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.option && Boolean(formik.errors.option)}
            >
              <MenuItem value="Option 1">Option 1</MenuItem>
              <MenuItem value="Option 2">Option 2</MenuItem>
              <MenuItem value="Option 3">Option 3</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Score"
            variant="outlined"
            margin="normal"
            name="score"
            type="number"
            value={formik.values.score}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.score && Boolean(formik.errors.score)}
            helperText={formik.touched.score && formik.errors.score}
          />
        </form>
      </Box>
    </Container>
  );
};

export default CreateHomework;
