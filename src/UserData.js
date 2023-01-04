import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Link} from "react-router-dom";

const columns = [
 { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  { field: 'gender', headerName: 'Gender', width: 130 },
  {
    field: 'bmi',
    headerName: 'Bmi',
    type: 'number',
    width: 90,
  }
];

const data = localStorage.getItem("userData");

const rows= JSON.parse(data);

export default function UserData() {
  return (
    <div style={{ height: 400, width: '100%' }}>
    <Link to="/">Home</Link>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
