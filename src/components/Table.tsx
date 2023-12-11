import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';
import ButtonDrop from './ButtonDrop';
import { IMember } from '../models/IAxiosResponse';
import { Calculate } from '@mui/icons-material';

interface HeaderProps {
  field: string;
  headerName: string;
  type: string;
  minWidth: number;
  maxWidth: number;
}

interface RowProps {
  id: number;
  name: string;
  email: string;
  action: string;
}

interface TableProps {
  value: IMember[];
}

const headers: HeaderProps[] = [
  { field: 'id', headerName: 'ID', type: 'number', maxWidth: 200, minWidth: 10  },
  { field: 'name', headerName: 'Name', type: 'string',  maxWidth: 400, minWidth: 200},
  { field: 'email', headerName: 'Email', type: 'string',  maxWidth: 600, minWidth: 300 },
  { field: 'action', headerName: 'Action', type: 'ButtonDrop',  maxWidth: 200, minWidth: 10 },
];

const Table: React.FC<TableProps> = ({ value }) => {
  const columns: GridColDef[] = headers.map((header) => {
    if (header.type === 'ButtonDrop') {
      return {
        field: header.field,
        headerName: header.headerName,
        minWidth: header.minWidth,
        maxWidth: header.maxWidth,
        renderCell: (params: GridValueGetterParams) => (
          <ButtonDrop id={params.row.id.toString()} />
        ),
      } as GridColDef;
    }

    return {...header, resizable:true} as GridColDef;
  });

  return (
    <div className="w-full overflow-x-auto">
      <DataGrid
        rows={value}
        columns={columns}
        pageSizeOptions={[5, 10,100]}
        checkboxSelection
      />
    </div>
  );
};

export default Table;
