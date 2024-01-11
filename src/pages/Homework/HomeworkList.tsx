import { CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import CreateHomeworkButton from '../../components/Homework/CreateHomeworkButton';
import FeedIcon from '@mui/icons-material/Feed';
import { useParams } from 'react-router-dom';
import { apiCall } from '../../utils/apiCall';
import { gradeManagementService } from '../../services/gradeManagement/GradeManagementService';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

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

interface IHomework {
  assignmentId: number;
  assignmentName: string;
  maxScore: number;
  time: Date;
};


const HomeworkList = () => {
  const { id } = useParams();
  const [homeworkList, setHomeworkList] = useState<IHomework[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {enqueueSnackbar} = useSnackbar();

  const getListAssignment = async () => {
    setIsLoading(true);
    await apiCall(gradeManagementService.getListAssignment(parseInt(id!)), {
      ifSuccess: (data) => {
        console.log(data);
        setHomeworkList(data.metadata as IHomework[]);
      },
      ifFailed: (error) => {
        enqueueSnackbar(error.message, {variant: 'error'});
      },
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getListAssignment();
  }, []);

  return (
    <div className="sm:mx-0 md:mx-10 lg:mx-20 xl:mx-40">
      <CreateHomeworkButton />
      {isLoading && (
        <div className='flex items-center justify-center'>
          <CircularProgress className="w-12 h-12" />
        </div>
      )}
      {!isLoading && homeworkList.length > 0 && (
        <List sx={{ marginTop: '16px' }}>
          {homeworkList.map((homework) => (
            <ListItem
              key={homework.assignmentId}
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
                    {homework.assignmentName}
                  </>
                }
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    color="GrayText"
                    fontWeight={400}
                  >
                    {homework.maxScore}
                  </Typography>
                }
                className="flex justify-between items-center"
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default HomeworkList;
