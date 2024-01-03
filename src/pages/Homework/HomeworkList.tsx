import { List, ListItem, ListItemText, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import CreateHomeworkButton from '../../components/Homework/CreateHomeworkButton';

const homeworkData = [
  {
    "id": 122,
    "name": "123",
    "weight": 123,
    "priority": 1
  },
  {
    "id": 123,
    "name": "1234",
    "weight": 1234,
    "priority": 2
  },
  {
    "id": 124,
    "name": "123",
    "weight": 123,
    "priority": 3
  },
  {
    "id": 125,
    "name": "123",
    "weight": 123,
    "priority": 4
  },
  {
    "id": 126,
    "name": "1",
    "weight": 1,
    "priority": 5
  },
  {
    "id": 127,
    "name": "123",
    "weight": 123,
    "priority": 6
  },
  {
    "id": 128,
    "name": "11",
    "weight": 1111,
    "priority": 7
  },
  {
    "id": 135,
    "name": "qwqw",
    "weight": 1,
    "priority": 8
  },
  {
    "id": 139,
    "name": "btvn",
    "weight": 20,
    "priority": 9
  }
];


const itemsPerPage = 3;

const HomeworkList = () => {
  const [page, setPage] = useState(1);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className='sm:mx-0 md:mx-10 lg:mx-20 xl:mx-40'>
      <Typography variant="h5" gutterBottom className='text-center'>
        Homework List
      </Typography>
      <CreateHomeworkButton />
      <List>
        {homeworkData.slice(startIndex, endIndex).map((homework, ind) => (
          <ListItem key={homework.id} alignItems="flex-start" className={`hover:bg-gray-200 ${ind + 1 < itemsPerPage && 'border-b-2'} rounded-md hover:border hover:border-gray-300`}>
            <ListItemText
              primary={homework.name}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {homework.weight}
                </Typography>
              }
              className='flex justify-between items-center'
            />
          </ListItem>
        ))}
      </List>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(homeworkData.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </div>
    </div>
  );
};

export default HomeworkList;