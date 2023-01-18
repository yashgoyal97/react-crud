import React, { Fragment, useEffect, useState } from 'react';
import DashboardLocal from './DashboardLocal';
import FormLocal from './FormLocal';

function ContainerLocal() {

    const [employeeObj, setEmployeeObj] = useState({
        name: "",
        empId: ""
    });

    const [employees, setEmployees] = useState([]);

    const handleInputChange = (employee) => {
        setEmployeeObj(employee)
    }

    const saveEmployeeData = (employee) => {
        if (employee.uniqueId) {
            const {name, empId, uniqueId} = employee;
            let empArr = employees.map((emp) => {
                if (emp['uniqueId'] === uniqueId) {
                    emp['name'] = name;
                    emp['empId'] = empId
                }
                return emp;
            });
            setEmployees(empArr);
        } else {
            const uniqueId = employees.length ? employees[employees.length - 1]['uniqueId'] + 1 : 1;
            employee['uniqueId'] = uniqueId;
            setEmployees([
                ...employees,
                employee
            ]);
        }
    }

    const deleteEmployeeData = (employee) => {
        let empArr = employees.filter((emp) => {
            return emp.uniqueId !== employee.uniqueId;
        });
        setEmployees(empArr);
    }

    const updateEmployeeData = (employee, action) => {
        if (action.toUpperCase() === "DELETE") {
            deleteEmployeeData(employee);
        } else {
            setEmployeeObj(employee);
        }
    }

    useEffect(() => {
        console.log(employees);
        setEmployeeObj({
            name: "",
            empId: ""
        });
    }, [employees]);

    return(
        <Fragment>
            <FormLocal employeeObj={employeeObj} onInputChange={handleInputChange} saveEmployeeData={saveEmployeeData} />
            <hr />
            <DashboardLocal updateEmployeeData={updateEmployeeData} employees={employees} />
        </Fragment>
    );
}

export default ContainerLocal;
