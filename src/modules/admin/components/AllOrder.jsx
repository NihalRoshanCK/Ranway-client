import {
    Card,
  } from "@material-tailwind/react";
import { classNames } from 'primereact/utils';
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { Tag } from 'primereact/tag';
// import { CustomerService } from './CustomerService';
import api from "../../../axiosInterceptor";
function AllOrder() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);
    
    const getSeverity = (status) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };
    const CustomerService=[]
    useEffect(() => {
        (async()=>{
            
          
            api.get(`product/order/`).then((response)=>{
                console.log(response.data)
                setCustomers(response.data)
            })
            
        })()
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 p-2 sm:w-full md:w-11/12 lg:w-11/12 xl:w-11/12 mx-auto">
            <h4 className="m-0">Orders</h4>
            <div className="flex">
              <span className="p-input-icon-left hidden sm:inline-block">
                <i className="pi pi-search" />
              </span>
              <InputText
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                className="w-full sm:w-auto"
                placeholder="Keyword Search"
              />
            </div>
          </div>
        );
    };

 

   

   

    
    const header = renderHeader();

  return (

      <DataTable value={customers} scrollable scrollHeight="500px" paginator header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="id" selectionMode="checkbox" selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                    filters={filters} filterDisplay="menu" globalFilterFields={['order_id', 'country.name', 'representative.name', 'balance', 'status']}
                    emptyMessage="No order found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="order_id" header="Order" sortable  filterPlaceholder="Search by name" />
                 <Column field="booking.hbd" header="HBD" sortable  filterPlaceholder="Search by country" />
                <Column field="booking.cpd" header="CPD" sortable  filterField="representative" showFilterMatchModes={false} />
                <Column field="booking.from_address" header="From Address" sortable  filterField="representative" showFilterMatchModes={false} />
                <Column field="booking.product_name" header="Product Name" sortable  filterField="representative" showFilterMatchModes={false} />
                <Column field="status" header="Status" sortable    filterField="representative"   />
                
            </DataTable>
  )
}

export default AllOrder

