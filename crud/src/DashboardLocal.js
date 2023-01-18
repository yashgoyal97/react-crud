import React from 'react';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import './Dashboard.css';

export default class DashboardLocal extends React.Component {

    constructor(props) {
        super(props);
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
                            <button onClick={() => this.props.updateEmployeeData(emp, "DELETE")}><MdDeleteOutline /></button>
                            <button onClick={() => this.props.updateEmployeeData(emp, "EDIT")}><MdOutlineEdit /></button>
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
            <div id='dashboardContainer'>
                <h1>Dashboard</h1>
                <hr />
                { table }
            </div>
            
        );
    }
}