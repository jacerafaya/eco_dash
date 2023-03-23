import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { getService } from '../../lib/helper';

const TableDemo = () => {
    console.log(getService());
    const [customers1, setCustomers1] = useState(null);

    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);


    const [globalFilterValue1, setGlobalFilterValue1] = useState('');



    const [filterValue, setFilterValue] = useState('');

    const filterData = () => {
        return customers1?.filter((row) =>
          Object.values(row)
            .join('')
            .toLowerCase()
            .includes(filterValue?.toLowerCase())
        );
      };




   


    const clearFilter1 = () => {
        setFilterValue(null)
        initFilters1();
    };

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://localhost:5050/';
    useEffect(() => {

        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'coordonneClient')
        .then((response) => response.json())
        .then((data) => {

            setLoading1(false)
            setCustomers1(data)
                        
        })
        .catch((error) => console.log(error));
       



        initFilters1();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    console.log("customer1",customers1)



    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    };





    const header1 = renderHeader1();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Les informations des personnes ayant rempli le formulaire de devis</h5>
                    <DataTable
                        value={customers1}
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        
                        filterDisplay="menu"
                        
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                        header={header1}

                        data={filterData()}
                        filterValue={filterValue}
                        onFilterChange={(e) => setFilterValue(e.target.value)}



                    >
                        <Column field="nom" header="Nom" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="prenom" header="Prenom" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="numeroTelephone" header="Numéro de Telephone" filterField="numeroTelephone" filter  dataType="numeric" filterPlaceholder="Search by name" style={{ minWidth: '12rem' } }  />
                        <Column field="age" header="Age" filterField="numeroTelephone" filter   filterPlaceholder="Search by name" style={{ minWidth: '12rem' } }  />
                       
                        <Column field="email" header="email" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="fonction" header="fonction" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="localisation" header="localisation" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        
             
                        
                    </DataTable>
                </div>
            </div>


        </div>
    );
};

export default TableDemo;
