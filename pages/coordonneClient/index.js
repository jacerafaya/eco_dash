import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const MyDataTable = () => {
  const [globalFilter, setGlobalFilter] = useState(''); // initial empty global filter

  const data = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 35 },
    { name: 'moo', age: 5 },
    { name: 'Hey', age: 10 },
    { name: 'Bay', age: 7 },
  ];

  const handleGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };
  console.log("globalfilter",globalFilter)

  return (
    <div>
      <input type="text" value={globalFilter} onChange={handleGlobalFilterChange} placeholder="Search" />
      <DataTable value={data} globalFilter={globalFilter} onGlobalFilter={setGlobalFilter}>
        <Column field="name" header="Name" />
        <Column field="age" header="Age" />
      </DataTable>
    </div>
  );
};
export default MyDataTable;