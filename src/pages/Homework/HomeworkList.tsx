import { List, ListItem, ListItemText, Typography } from '@mui/material';
import CreateHomeworkButton from '../../components/Homework/CreateHomeworkButton';
import FeedIcon from '@mui/icons-material/Feed';

const homeworkData = [
  {
    id: 122,
    name: '123',
    weight: 123,
    priority: 1,
  },
  {
    id: 123,
    name: '1234',
    weight: 1234,
    priority: 2,
  },
  {
    id: 124,
    name: '123',
    weight: 123,
    priority: 3,
  },
  {
    id: 125,
    name: '123',
    weight: 123,
    priority: 4,
  },
  {
    id: 126,
    name: '1',
    weight: 1,
    priority: 5,
  },
  {
    id: 127,
    name: '123',
    weight: 123,
    priority: 6,
  },
  {
    id: 128,
    name: '11',
    weight: 1111,
    priority: 7,
  },
  {
    id: 135,
    name: 'qwqw',
    weight: 1,
    priority: 8,
  },
  {
    id: 139,
    name: 'btvn',
    weight: 20,
    priority: 9,
  },
];

const HomeworkList = () => {
  return (
    <div className="sm:mx-0 md:mx-10 lg:mx-20 xl:mx-40">
      <CreateHomeworkButton />
      <List sx={{ marginTop: '16px' }}>
        {homeworkData.map((homework) => (
          <ListItem
            key={homework.id}
            alignItems="flex-start"
            className={
              'hover:bg-gray-200 border-b-2 rounded-sm hover:border hover:border-gray-300'
            }
          >
            <ListItemText
              primary={
                <>
                  <FeedIcon
                    className="mr-2 text-blue-600 text-lg"
                    fontSize="large"
                  />
                  {homework.name}
                </>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="GrayText"
                  fontWeight={400}
                >
                  {homework.weight}
                </Typography>
              }
              className="flex justify-between items-center"
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default HomeworkList;
