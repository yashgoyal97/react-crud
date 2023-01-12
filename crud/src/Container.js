import React, { Fragment } from 'react';
import Dashboard from './Dashboard';
import Form from './Form';

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.handleUpdateState = this.handleUpdateState.bind(this);
        this.state = {
            employeeObj: {
                name: "",
                empId: ""
            },
            isUpdateForm: false,
            onUpdate: false,
            employees: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8000/employees')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    ...this.state,
                    employees: data
                });
            })
            .catch((error) => {
                console.log('Error: ', error);
            })
    }

    componentDidUpdate() {
        if (this.state.onUpdate) {
            fetch('http://localhost:8000/employees')
                .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        ...this.state,
                        employees: data
                    });
                })
                .catch((error) => {
                    console.log('Error: ', error);
                });

            this.setState({
                ...this.state,
                onUpdate: false
            });
        }
    }

    handleUpdateState(employeeObj, isUpdateForm, onUpdate) {
        this.setState({
            ...this.state,
            onUpdate,
            employeeObj,
            isUpdateForm
        });
    }

    render() {

        return(
            <Fragment>
                <Form isUpdateForm={this.state.isUpdateForm} employeeObj={this.state.employeeObj} handleUpdateState={this.handleUpdateState} />
                <hr />
                <Dashboard updateEmployeeData={this.handleUpdateState} employees={this.state.employees} />
            </Fragment>
        );
    }
}

export default Container;