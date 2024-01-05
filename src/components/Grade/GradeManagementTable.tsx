import React, { useContext, useEffect, useRef, useState } from 'react';
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
import {
  IGradeAssignment,
  IGradeBoardColumn,
  IStudentList,
} from '../../models/IGradeManagement';
import { enqueueSnackbar } from 'notistack';
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
                ?.map((student, studentIdx) => {
                  // ======================  Calculate total grade of student  ======================
                  const allCompositions = new Array<number>();
                  gradeBoardColumns?.forEach((gradeColumn) => {
                    allCompositions.push(gradeColumn.compositionId);
                  });

                  const totalGradeComposition = allCompositions.map((id) => {
                    const allGradeBoard = gradeBoardColumns?.find(
                      (item) => item.compositionId === id,
                    );

                    let totalScore = 0;
                    const total =
                      allGradeBoard?.assignmentsBoard.reduce((prev, curr) => {
                        totalScore += curr.maxScore;
                        return (
                          prev +
                          (curr.gradesBoard?.find(
                            (i) => i.indexStudent === studentIdx,
                          )?.value ?? 0)
                        );
                      }, 0) ?? 0;

                    return totalScore === 0
                      ? 0
                      : (total / totalScore) *
                          allGradeBoard!.compositionWeight!;
                  });

                  const finalScore = Math.min(
                    totalGradeComposition.reduce(
                      (prev, curr) => prev + curr,
                      0,
                    ),
                    100,
                  );

                  // ======================  Render  ======================

                  return (
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
                        {finalScore.toFixed(2)}%
                      </TableCell>
                      {gradeBoardColumns?.map((gradeColumn, gradeColumnIdx) => {
                        return gradeColumn.assignmentsBoard?.map(
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
                                    assignment?.gradesBoard?.find(
                                      (item) =>
                                        item.indexStudent === studentIdx,
                                    )?.value ?? '0'
                                  }
                                  inputProps={{
                                    min: 0,
                                    max: assignment.maxScore,
                                  }}
                                  onChange={() => {}}
                                  sx={{
                                    textAlign: 'center',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    width: 'fit-content',
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
                        );
                      })}
                    </TableRow>
                  );
                })}
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
        titleForm={t('uploadGradeAssignment')}
        open={openUpload}
        setOpen={setOpenUpload}
      />
    </>
  );
}
