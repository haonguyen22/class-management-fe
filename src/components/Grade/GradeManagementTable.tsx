import React, { useContext, useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Input, Tooltip } from '@mui/material';
import GradeHeaderDropdown from './GradeHeaderDropdown';
import { apiCall } from '../../utils/apiCall';
import { gradeManagementService } from '../../services/gradeManagement/GradeManagementService';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {
  IGradeAssignment,
  IGradeBoardColumn,
  IStudentList,
} from '../../models/IGradeManagement';
import { enqueueSnackbar } from 'notistack';
import { debounce } from 'lodash';
import { ClassContext } from '../../context/ClassContext';
import { downloadFileXlsx } from '../../utils/xlsx';
import FormUpload from './FormUpload';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import { Role } from '../../enums/RoleClass';
import * as XLSX from 'xlsx';

export default function StickyHeadTable({
  setLoading,
  flag,
}: {
  flag: number;
  setLoading: (isLoading: boolean) => void;
}) {
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();

  const { classDetail } = useContext(ClassContext);
  const [dataBoard, setDataBoard] = useState<string[][]>([[], []]); // Data export to grade board excel

  const [localLoading, setLocalLoading] = useState<string>();

  const { role } = useContext(ClassContext);

  const [openUpload, setOpenUpload] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [gradeBoardColumns, setGradeBoardColumns] = useState<
    IGradeBoardColumn[]
  >([]);

  const [finalGrade] = useState<number[]>([]);

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
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const getGradeStudentBoard = async () => {
    await apiCall(gradeManagementService.getGradeStudentBoard(parseInt(id!)), {
      ifSuccess: (data) => {
        console.log(data);
        const res = data.metadata as {
          totalGradeBoard: IGradeBoardColumn[];
          student: IStudentList[];
        };
        console.log(res);
        setGradeBoardColumns(res.totalGradeBoard);
        setStudentList(res.student);
      },
      ifFailed: (error) => {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    });
  };

  const handleUpdateGrade = async (
    studentId: string,
    score: number,
    assignmentId: number,
  ) => {
    console.log(studentId, score, assignmentId);
    await apiCall(
      gradeManagementService.updateGradeOfStudent(parseInt(id!), {
        studentId,
        assignmentId,
        score,
      }),
      {
        ifSuccess: (data) => {
          console.log(data);
          enqueueSnackbar(data.message, { variant: 'success' });
        },
        ifFailed: (error) => {
          console.log(error);
          enqueueSnackbar(error.message, { variant: 'error' });
        },
      },
    );
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
            fileName: `[${classDetail?.name}]-${assignment.assignmentName}`,
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

  const onReturnGradeAssignment = async (gradeCompositionId: number) => {
    setLoading(true);
    await apiCall(
      gradeManagementService.markViewableGrade(
        parseInt(id!),
        gradeCompositionId,
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

  const exportGradeBoard = async () => {
    setLoading(true);
    setDataBoard([[], []]);
    dataBoard[0].push('');
    dataBoard[0].push('');
    dataBoard[0].push('');
    dataBoard[1].push('StudentId');
    dataBoard[1].push('StudentName');
    dataBoard[1].push('Final');
    const mergeCell = new Array<string>();
    let startCol = 3;
    // Add assignment name to data board
    gradeBoardColumns?.forEach((gradeColumn) => {
      if (gradeColumn.assignmentsBoard?.length > 0 ?? false) {
        mergeCell.push(
          `${XLSX.utils.encode_cell({
            c: startCol,
            r: 0,
          })}:${XLSX.utils.encode_cell({
            c: startCol + gradeColumn.assignmentsBoard!.length - 1,
            r: 0,
          })}`,
        );
        dataBoard[0].push(
          `${gradeColumn.compositionName} (${gradeColumn.compositionWeight}%)`,
        );
        startCol += gradeColumn.assignmentsBoard!.length;
        dataBoard[0].push(gradeColumn.compositionWeight.toString() + '%');
        gradeColumn.assignmentsBoard?.forEach((assignment) => {
          dataBoard[1].push(
            `${assignment.assignmentName} (${assignment.maxScore})`,
          );
        });
      }
    });

    // Add student data to data board

    studentList?.forEach((student, studentIdx) => {
      const studentData = new Array<string>();
      studentData.push(student.studentId.toString());
      studentData.push(student.fullName);
      studentData.push(`${finalGrade[studentIdx].toFixed(2)}%`);
      gradeBoardColumns?.forEach((gradeColumn) => {
        gradeColumn.assignmentsBoard?.forEach((assignment) => {
          studentData.push(`${assignment.gradesBoard[studentIdx].value}`);
        });
      });
      dataBoard.push(studentData);
    });

    const ws = XLSX.utils.aoa_to_sheet(dataBoard);
    ws['!merges'] = mergeCell.map((merge) => XLSX.utils.decode_range(merge));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, classDetail?.name);
    XLSX.writeFile(wb, `[${classDetail?.name}]-GradeBoard.xlsx`);

    setLoading(false);
  };

  const calcFinalScore = (studentIdx: number) => {
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
            (curr.gradesBoard?.find((i) => i.indexStudent === studentIdx)
              ?.value ?? 0)
          );
        }, 0) ?? 0;

      return totalScore === 0
        ? 0
        : (total / totalScore) * allGradeBoard!.compositionWeight!;
    });

    const finalScore = Math.min(
      totalGradeComposition.reduce((prev, curr) => prev + curr, 0),
      100,
    );
    if (finalGrade.length > studentIdx) {
      finalGrade[studentIdx] = finalScore;
    } else {
      finalGrade.push(finalScore);
    }
    return finalScore;
  };

  const onChangeInputGrade = async (
    e: React.ChangeEvent<HTMLInputElement>,
    {
      assignment,
      studentIdx,
      gradeColumnIdx,
      assignmentIdx,
    }: {
      assignment: IGradeAssignment;
      studentIdx: number;
      gradeColumnIdx: number;
      assignmentIdx: number;
    },
  ) => {
    const value = parseInt(e.target.value);
    const maxScore = value > assignment.maxScore ? assignment.maxScore : value;
    setLoading(true);
    const newGradeBoardColumns = [...gradeBoardColumns];
    newGradeBoardColumns[gradeColumnIdx].assignmentsBoard[
      assignmentIdx
    ].gradesBoard.forEach((item) => {
      if (item.indexStudent === studentIdx) {
        item.value = maxScore || 0;
      }
    });
    setGradeBoardColumns(newGradeBoardColumns);
    setLoading(false);
  };

  useEffect(() => {
    role === Role.TEACHER && getTotalGradeBoard();
    role === Role.STUDENT && getGradeStudentBoard();
  }, [role]);

  useEffect(() => {
    if (flag !== 0) exportGradeBoard();
  }, [flag]);

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
                  rowSpan={2}
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
                  rowSpan={2}
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
                  rowSpan={2}
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
                    gradeColumn.assignmentsBoard?.length >= 1 && (
                      <TableCell
                        key={`${i}`}
                        align={'center'}
                        colSpan={gradeColumn.assignmentsBoard.length}
                        sx={{
                          minWidth: 120,
                          backgroundColor: '#f3f4f6',
                          fontWeight: 'bold',
                          borderRight: '1px solid #ddd',
                        }}
                      >
                        <div className="flex flex-row items-center justify-between">
                          <div></div>
                          <div className="flex flex-row items-center justify-center">
                            {gradeColumn.viewable && (
                              <Tooltip
                                title={t('markAsFinalized')}
                                placement="bottom"
                              >
                                <TaskAltIcon fontSize="small" color="success" />
                              </Tooltip>
                            )}
                            <span className="ml-2">
                              {gradeColumn.compositionName}
                            </span>
                          </div>
                          <div>
                            {gradeColumn.viewable === false && (
                              // === false
                              <Tooltip
                                title={t('returnGradeAssignment')}
                                placement="bottom"
                              >
                                <AssignmentReturnedIcon
                                  fontSize="small"
                                  color="primary"
                                  sx={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    onReturnGradeAssignment(
                                      gradeColumn.compositionId,
                                    )
                                  }
                                />
                              </Tooltip>
                            )}
                          </div>
                        </div>
                        <div className="py-1  text-center text-xs text-gray-500 font-thin">
                          {gradeColumn.compositionWeight}%
                        </div>
                      </TableCell>
                    ),
                )}
              </TableRow>
              <TableRow>
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
                          role={role}
                          name={assignment?.assignmentName}
                          totalMark={assignment?.maxScore}
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
                        {calcFinalScore(studentIdx)?.toFixed(2) ?? 0}%
                      </TableCell>
                      {gradeBoardColumns?.map((gradeColumn, gradeColumnIdx) => {
                        return gradeColumn.assignmentsBoard?.map(
                          (assignment, assignmentIdx) => {
                            const isLocalLoading =
                              localLoading ===
                              `${studentIdx} - ${gradeColumnIdx} - ${assignmentIdx}`;
                            return (
                              <TableCell
                                key={`${studentIdx}${gradeColumnIdx}${assignmentIdx}`}
                                align={'center'}
                                sx={{
                                  borderRight: '1px solid #ddd',
                                  textAlign: 'center',
                                }}
                              >
                                {role !== Role.NONE && role !== Role.STUDENT ? (
                                  <div className="flex flex-col items-center">
                                    <Input
                                      type="number"
                                      value={
                                        assignment?.gradesBoard?.find(
                                          (item) =>
                                            item.indexStudent === studentIdx,
                                        )?.value
                                      }
                                      onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                      ) =>
                                        onChangeInputGrade(e, {
                                          assignment,
                                          studentIdx,
                                          gradeColumnIdx,
                                          assignmentIdx,
                                        })
                                      }
                                      onBlur={debounce(async (e) => {
                                        setLocalLoading(
                                          `${studentIdx} - ${gradeColumnIdx} - ${assignmentIdx}`,
                                        );
                                        await handleUpdateGrade(
                                          student.studentId,
                                          parseInt(e.target.value) || 0,
                                          assignment.assignmentId,
                                        );
                                        setLocalLoading('');
                                      }, 3000)}
                                      sx={{
                                        textAlign: 'center',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        marginBottom: '4px',
                                        width: 'fit-content',
                                        fontSize: `${
                                          isLocalLoading ? '12px' : '16px'
                                        }`,
                                        height: `${
                                          isLocalLoading ? '14px' : '28px'
                                        }`,
                                      }}
                                      endAdornment={
                                        assignment.maxScore && (
                                          <span className="text-gray-500 font-semibold">
                                            /{assignment.maxScore}
                                          </span>
                                        )
                                      }
                                    />
                                    {isLocalLoading && (
                                      <span className="text-sm text-green-600">
                                        {t('saving')}
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  `${assignment.value != false && assignment.value ? assignment.value+'/'+assignment.maxScore:''}`
                                )}
                              </TableCell>
                            );
                          },
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
