import React from 'react';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.updateEmployeeData = this.updateEmployeeData.bind(this);
        this.deleteEmployeeData = this.deleteEmployeeData.bind(this);
    }

    updateEmployeeData(emp) {
        this.props.updateEmployeeData(emp, true, false);
    }

    deleteEmployeeData(emp) {
        let { id } = emp;
        let method = 'DELETE';
        let url = `http://localhost:8000/employees/${id}`;

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emp)
        })
            .then((response) => response.json())
            .then(() => {
                console.log('Record deleted successfully');
                this.props.updateEmployeeData(emp, false, true);
            })
            .catch((error) => {
                console.log('Error: ', error);
            });

    }

    render() {

        let employees = this.props.employees;
        let rows, table;
        if (employees && employees.length) {
            rows = employees.map((emp) => {
                return(
                    <tr key={emp.empId}>
                        <td>{emp.name}</td>
                        <td>{emp.empId}</td>
                        <td>
                            <button onClick={() => this.deleteEmployeeData(emp)}>Delete</button>
                            <button onClick={() => this.updateEmployeeData(emp)}>Update</button>
                        </td>
                    </tr>
                );
            });

            if (rows) {
                table = <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Employee ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </table>
            } else {
                table = <h3>No data available</h3>
            }
        } else {
            table = <h3>No data available</h3>
        }

        return(
            <>
                <h1>Dashboard</h1>
                { table }
            </>
            
        );
    }
}