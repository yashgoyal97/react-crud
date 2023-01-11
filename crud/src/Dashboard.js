//class component

import React from 'react';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
        this.updateEmployeeData = this.updateEmployeeData.bind(this);
        this.deleteEmployeeData = this.deleteEmployeeData.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8000/employees')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    employees: data
                });
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
    }

    updateEmployeeData(emp) {
        this.props.updateEmployeeData(emp, true);
    }

    deleteEmployeeData(emp) {
        console.log(emp);
    }

    render() {
        
        let employees = this.state.employees;
        const rows = employees.map((emp) => {
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

        return(
            <>
                <h2>Employee Dashboard</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Employee ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </>
            
        );
    }
}

//functional component

// export default function Dashboard() {}