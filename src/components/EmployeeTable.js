import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';
import _ from 'lodash';

export default function EmployeeTable({columns, data, searchTerm, ...props}) {

    const [filteredData, setFilteredData] = useState([]);
    const [sortColumn, setSortColumn] = useState({key: columns[0].field, direction: 'ASC'});

    useEffect(() => {
        sort(sortColumn.key, sortColumn.field);
    }, [data]);

    useEffect(() => {
        filter(searchTerm);
    }, [searchTerm]);
    
    const sort = (key, direction) => {
        setSortColumn({key, direction});
        setFilteredData(data.sort((a, b) => {
            let aValue = _.get(a, key);
            let bValue = _.get(b, key);

            if(direction === 'ASC')
            {
                if(aValue > bValue)
                    return 1;
                if(aValue < bValue)
                    return -1;
                return 0;
            } else {
                if(aValue < bValue)
                    return 1;
                if(aValue > bValue)
                    return -1;
                return 0;
            }
        }));
    };

    const filter = (value) => {
        if(!value)
        {
            return setFilteredData(data);
        }
        let filteredValues = data.filter((item) => {

            let maxIndexOf = Math.max(...columns.map(column => {
                return _.get(item, column.field).toLowerCase().indexOf(value.toLowerCase());
            }));
            return maxIndexOf > -1;
        });
        setFilteredData(filteredValues);
    };


    let tableHeader = <TableHead>
        <TableRow>
            {columns.map(column => 
                <TableCell 
                    key={column.field} 
                    onClick={e => {
                        sort(column.field, (sortColumn.key === column.field && sortColumn.direction === 'ASC') ? 'DESC' : 'ASC');
                    }}
                >
                    {column.header}
                </TableCell>
            )}
        </TableRow>
    </TableHead>;

    return (
        <TableContainer component={Paper}>
            <Table>
                {tableHeader}
                <TableBody>
                    {
                        filteredData.map(row => 
                            <TableRow key={row.login.uuid}>
                                {
                                    columns.map(column => 
                                        <TableCell>
                                            {_.get(row, column.field)}
                                        </TableCell>
                                    )
                                }
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}