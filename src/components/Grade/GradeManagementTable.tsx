import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Input } from '@mui/material';
import GradeHeaderDropdown from './GradeHeaderDropdown';
import { apiCall } from '../../utils/apiCall';
import { gradeManagementService } from '../../services/gradeManagement/GradeManagementService';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IGradeBoardColumn, IStudentList } from '../../models/IGradeManagement';
import { enqueueSnackbar } from 'notistack';

export default function StickyHeadTable() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [gradeBoardColumns, setGradeBoardColumns] = useState<
    IGradeBoardColumn[]
  >([]);

  const [studentList, setStudentList] = useState<IStudentList[]>([]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const isEdit = true;

  const getTotalGradeBoard = async () => {
    await apiCall(gradeManagementService.getTotalGradeBoard(parseInt(id!)), {
      ifSuccess: (data) => {
        const res = data.metadata as {
          totalGradeBoard: IGradeBoardColumn[];
          studentList: IStudentList[];
        };
        setGradeBoardColumns(res.totalGradeBoard);
        setStudentList(res.studentList);
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  useEffect(() => {
    getTotalGradeBoard();
  }, []);

  return (
    <Paper
      sx={{ width: '100%', overflow: 'hidden' }}
      className="shadow-md border border-gray-300"
    >
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          {/* ===================   Header =================== */}
          <TableHead>
            <TableRow>
              <TableCell
                align={'center'}
                sx={{
                  minWidth: 100,
                  backgroundColor: '#f3f4f6',
                  fontWeight: 'bold',
                  borderRight: '1px solid #ddd',
                }}
              >
                {t('studentId')}
              </TableCell>
              <TableCell
                align={'center'}
                sx={{
                  minWidth: 150,
                  backgroundColor: '#f3f4f6',
                  fontWeight: 'bold',
                  borderRight: '1px solid #ddd',
                }}
              >
                {t('studentName')}
              </TableCell>
              <TableCell
                align={'center'}
                sx={{
                  minWidth: 100,
                  backgroundColor: '#f3f4f6',
                  fontWeight: 'bold',
                  borderRight: '1px solid #ddd',
                }}
              >
                {t('final')}
              </TableCell>
              {gradeBoardColumns?.map(
                (gradeColumn, i) =>
                  gradeColumn.assignmentsBoard?.map((assignment, index) => (
                    <TableCell
                      key={`${i}-${index}`}
                      align={'center'}
                      sx={{
                        minWidth: 150,
                        backgroundColor: '#f3f4f6',
                        fontWeight: 'bold',
                        borderRight: '1px solid #ddd',
                      }}
                    >
                      <GradeHeaderDropdown
                        name={assignment?.assignmentName}
                        totalMark={assignment?.maxScore}
                        gradeCategory={gradeColumn?.compositionName}
                      />
                    </TableCell>
                  )),
              )}
            </TableRow>
          </TableHead>
          {/* ============================== BODY ============================== */}
          <TableBody>
            {studentList
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((student, studentIdx) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={studentIdx}>
                  <TableCell
                    align={'center'}
                    sx={{
                      borderRight: '1px solid #ddd',
                      textAlign: 'center',
                    }}
                  >
                    {student.studentId}
                  </TableCell>
                  <TableCell
                    align={'center'}
                    sx={{
                      borderRight: '1px solid #ddd',
                      textAlign: 'center',
                    }}
                  >
                    {student.fullName}
                  </TableCell>
                  <TableCell
                    align={'center'}
                    sx={{
                      borderRight: '1px solid #ddd',
                      textAlign: 'center',
                    }}
                  >
                    0
                  </TableCell>
                  {gradeBoardColumns?.map(
                    (gradeColumn, gradeColumnIdx) =>
                      gradeColumn.assignmentsBoard?.map(
                        (assignment, assignmentIdx) => (
                          <TableCell
                            key={`${studentIdx}${gradeColumnIdx}${assignmentIdx}`}
                            align={'center'}
                            sx={{
                              borderRight: '1px solid #ddd',
                              textAlign: 'center',
                            }}
                          >
                            {isEdit ? (
                              <Input
                                type="number"
                                value={
                                  assignment?.gradesBoard?.[studentIdx] ?? '0'
                                }
                                inputProps={{
                                  min: 0,
                                  max: 10,
                                }}
                                onChange={() => {}}
                                sx={{
                                  textAlign: 'center',
                                  marginLeft: 'auto',
                                  marginRight: 'auto',
                                  width: '60px',
                                }}
                                endAdornment={
                                  assignment.maxScore && (
                                    <span className="text-gray-500 font-semibold">
                                      /{assignment.maxScore}
                                    </span>
                                  )
                                }
                              />
                            ) : (
                              assignment.gradesBoard[studentIdx].value
                            )}
                          </TableCell>
                        ),
                      ),
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={studentList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
