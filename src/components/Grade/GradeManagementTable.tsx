import React, { useContext, useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { CircularProgress, Input } from '@mui/material';
import GradeHeaderDropdown from './GradeHeaderDropdown';
import { apiCall } from '../../utils/apiCall';
import { gradeManagementService } from '../../services/gradeManagement/GradeManagementService';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  IGradeAssignment,
  IGradeBoardColumn,
  IStudentList,
} from '../../models/IGradeManagement';
import { enqueueSnackbar } from 'notistack';
import { debounce } from 'lodash';
import { gradeService } from '../../services/grade/GradeService';
import { ClassContext } from '../../context/ClassContext';
import { downloadFileXlsx } from '../../utils/xlsx';
import FormUpload from './FormUpload';

export default function StickyHeadTable({
  setLoading,
}: {
  setLoading: (isLoading: boolean) => void;
}) {
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();

  const { classDetail } = useContext(ClassContext);

  const [localLoading, setLocalLoading] = useState<string>();

  const [openUpload, setOpenUpload] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [gradeBoardColumns, setGradeBoardColumns] = useState<
    IGradeBoardColumn[]
  >([]);

  const [studentList, setStudentList] = useState<IStudentList[]>([]);

  const assignmentId = useRef<number>(-1);

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
        console.log(data);
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

  const handleUpdateGrade = async (studentId: string, score: number, assignmentId: number) => {
    console.log(studentId, score, assignmentId);
    await apiCall(gradeService.updateGradeOfStudent(parseInt(id!),{studentId, assignmentId, score}), {
      ifSuccess: (data) => {
        console.log(data);
        enqueueSnackbar(data.message, { variant: 'success' });
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const onDownloadGradeTemplate = async (assignment: IGradeAssignment) => {
    setLoading;
    await apiCall(
      gradeManagementService.downloadTemplateGradeAssignment(
        parseInt(id!),
        assignment.assignmentId,
      ),
      {
        ifSuccess: (data) => {
          downloadFileXlsx({
            data: data as unknown as Blob,
            fileName: `[${classDetail?.name}]-${assignment.assignmentName}.xlsx`,
          });
          enqueueSnackbar('Download success', {
            variant: 'success',
          });
        },
        ifFailed: (err) => {
          enqueueSnackbar(err?.message ?? err.response?.data?.message, {
            variant: 'error',
          });
        },
      },
    );
    setLoading(false);
  };

  const onSubmitUploadGrade = async (assignmentId: number, file: File) => {
    setLoading(true);
    await apiCall(
      gradeManagementService.uploadGradeAssignmentTemplate(
        parseInt(id!),
        assignmentId,
        file,
      ),
      {
        ifSuccess: (data) => {
          enqueueSnackbar(data.message, { variant: 'success' });
          getTotalGradeBoard();
        },
        ifFailed: (error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      },
    );
    setLoading(false);
  };


  useEffect(() => {
    getTotalGradeBoard();
  }, []);

  return (
    <>
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
                          minWidth: 120,
                          backgroundColor: '#f3f4f6',
                          fontWeight: 'bold',
                          borderRight: '1px solid #ddd',
                        }}
                      >
                        <GradeHeaderDropdown
                          name={assignment?.assignmentName}
                          totalMark={assignment?.maxScore}
                          gradeCategory={gradeColumn?.compositionName}
                          onDownloadGradeTemplate={() =>
                            onDownloadGradeTemplate(assignment)
                          }
                          onUploadGrade={() => {
                            setOpenUpload(true);
                            assignmentId.current = assignment.assignmentId;
                          }}
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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={studentIdx}
                  >
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
                              {isEdit ?
                                <div className='flex flex-col items-center'>
                                  <Input
                                    type="text"
                                    value={
                                      assignment?.gradesBoard?.find(
                                        (item) =>
                                          item.indexStudent === studentIdx,
                                      )?.value
                                    }

                                    onChange={async (e) => {
                                      const newGradeBoardColumns = [...gradeBoardColumns];
                                      newGradeBoardColumns[gradeColumnIdx].assignmentsBoard[assignmentIdx].gradesBoard.forEach((item) => {
                                        if (item.indexStudent === studentIdx) {
                                          item.value = parseInt(e.target.value)||0;
                                        }
                                      });
                                      setGradeBoardColumns(newGradeBoardColumns);
                                    }}

                                    onBlur={debounce(async (e) => {
                                      setLocalLoading(`${studentIdx} - ${gradeColumnIdx} - ${assignmentIdx}`);
                                      await handleUpdateGrade(student.studentId, parseInt(e.target.value) || 0, assignment.assignmentId);
                                      setLocalLoading('');
                                    }, 3000)}

                                    sx={{
                                      textAlign: 'center',
                                      marginLeft: 'auto',
                                      marginRight: 'auto',
                                      marginBottom: '4px',
                                      width: 'fit-content',
                                      fontSize: `${localLoading === `${studentIdx} - ${gradeColumnIdx} - ${assignmentIdx}` ? '12px' : '16px'}`,
                                      height: `${localLoading === `${studentIdx} - ${gradeColumnIdx} - ${assignmentIdx}` ? '14px' : '28px'}`
                                    }}
                                    endAdornment={
                                      assignment.maxScore && (
                                        <span className="text-gray-500 font-semibold">
                                          /{assignment.maxScore}
                                        </span>
                                      )
                                    }
                                  />
                                  { localLoading === `${studentIdx} - ${gradeColumnIdx} - ${assignmentIdx}` && <span className='text-sm text-green-600'> saving...</span>}
                                </div>
                               : (
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

      {/* Form when upload file grade assignment */}
      <FormUpload
        handleSubmit={(file) => onSubmitUploadGrade(assignmentId.current, file)}
        titleForm={t('FormUpload.titleStudentList')}
        open={openUpload}
        setOpen={setOpenUpload}
      />
    </>
  );
}