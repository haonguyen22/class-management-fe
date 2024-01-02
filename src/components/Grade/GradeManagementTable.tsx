import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Input } from '@mui/material';

interface Column {
  id: 'id' | 'name' | 'homework1' | 'homework2' | 'homework3' | 'midterm' | 'final';
  name: string;
  minWidth?: number;
  align?: 'right'| 'left'| 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {name: 'ID', align: 'center', minWidth: 100, id: 'id'},
  {name: 'Name', align: 'center', minWidth: 150, id: 'name'},
  {name: 'Homework 1', align: 'center', minWidth: 50, id: 'homework1'},
  {name: 'Homework 2', align: 'center', minWidth: 50, id: 'homework2'},
  {name: 'Homework 3', align: 'center', minWidth: 50, id: 'homework3'},
  {name: 'Midterm', align: 'center', minWidth: 50, id: 'midterm'},
  {name: 'Final', align: 'center', minWidth: 50, id: 'final'},
];

interface Row {
  id: string;
  name: string;
  homework1: number;
  homework2: number;
  homework3: number;
  midterm: number;
  final: number;
  [key: string]: any;
}

const initialRows: Row[] = [
  {id: '1', name: 'John Doe', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '2', name: 'Jane Doe', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '3', name: 'John Smith', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '4', name: 'Jane Smith', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '5', name: 'John Doe', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '6', name: 'Jane Doe', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '7', name: 'John Smith', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '8', name: 'Jane Smith', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '9', name: 'John Doe', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '10', name: 'Jane Doe', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '11', name: 'John Smith', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
  {id: '12', name: 'Jane Smith', homework1: 10, homework2: 10, homework3: 10, midterm: 10, final: 10},
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState(initialRows);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const isEdit = true;
  const handleInputChange = (value: any, columnId: string, rowIndex: number) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        [columnId]: value,
      };
      return updatedRows;
    });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className='shadow-md border border-gray-300'>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, ind) => (
                <TableCell
                  key={ind}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#f3f4f6', fontWeight: 'bold' }}
                >
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, ind) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={ind}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.name} align={column.align}>
                          {index > 1 && isEdit ? (
                            <Input
                              type="number"
                              value={value}
                              inputProps={{
                                min: 0,
                                max: 10,
                              }}
                              onChange={(e) => handleInputChange(e.target.value, column.id, ind)}
                            />
                          ) : (
                            column.format && typeof value === 'number'
                              ? column.format(value)
                              : value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
