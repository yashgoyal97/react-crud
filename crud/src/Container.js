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
            isUpdateForm: false
        }
    }

    handleUpdateState(employeeObj, isUpdateForm) {
        this.setState({
            employeeObj,
            isUpdateForm
        });
    }

    render() {

        return(
            <Fragment>
                <Form isUpdateForm={this.state.isUpdateForm} employeeObj={this.state.employeeObj} handleUpdateState={this.handleUpdateState} />
                <hr />
                <Dashboard updateEmployeeData={this.handleUpdateState} />
            </Fragment>
        );
    }
}

export default Container;