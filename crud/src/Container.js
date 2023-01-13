//Class component
// import React, { Fragment } from 'react';
// import Dashboard from './Dashboard';
// import Form from './Form';

// class Container extends React.Component {

//     constructor(props) {
//         super(props);
//         this.handleUpdateState = this.handleUpdateState.bind(this);
//         this.state = {
//             employeeObj: {
//                 name: "",
//                 empId: ""
//             },
//             isUpdateForm: false,
//             onUpdate: false,
//             employees: []
//         }
//     }

//     componentDidMount() {
//         fetch('http://localhost:8000/employees')
//             .then((response) => response.json())
//             .then((data) => {
//                 this.setState({
//                     ...this.state,
//                     employees: data
//                 });
//             })
//             .catch((error) => {
//                 console.log('Error: ', error);
//             })
//     }

//     componentDidUpdate() {
//         if (this.state.onUpdate) {
//             fetch('http://localhost:8000/employees')
//                 .then((response) => response.json())
//                 .then((data) => {
//                     this.setState({
//                         ...this.state,
//                         employees: data
//                     });
//                 })
//                 .catch((error) => {
//                     console.log('Error: ', error);
//                 });

//             this.setState({
//                 ...this.state,
//                 onUpdate: false
//             });
//         }
//     }

//     handleUpdateState(employeeObj, isUpdateForm, onUpdate) {
//         this.setState({
//             ...this.state,
//             onUpdate,
//             employeeObj,
//             isUpdateForm
//         });
//     }

//     render() {

//         return(
//             <Fragment>
//                 <Form isUpdateForm={this.state.isUpdateForm} employeeObj={this.state.employeeObj} handleUpdateState={this.handleUpdateState} />
//                 <hr />
//                 <Dashboard updateEmployeeData={this.handleUpdateState} employees={this.state.employees} />
//             </Fragment>
//         );
//     }
// }

// export default Container;

//Function component
import React, { Fragment, useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import Form from './Form';

function Container() {

    const [componentState, setComponentState] = useState({
        employeeObj: {
            name: "",
            empId: ""
        },
        isUpdateForm: false,
        onUpdate: false,
        employees: []
    });

    useEffect(() => {
        fetch('http://localhost:8000/employees')
            .then((response) => response.json())
            .then((data) => {
                setComponentState({
                    ...componentState,
                    employees: data
                });
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    },[]);

    useEffect(() => {
        if (componentState.onUpdate) {
            fetch('http://localhost:8000/employees')
            .then((response) => response.json())
            .then((data) => {
                setComponentState({
                    ...componentState,
                    employees: data,
                    onUpdate: false
                });
            })
            .catch((error) => {
                console.log('Error: ', error);
            });

            setComponentState({
                ...componentState,
                onUpdate: false
            });
        }
    },[componentState.onUpdate]);

    function handleUpdateState (employeeObj, isUpdateForm, onUpdate) {
        setComponentState({
            ...componentState,
            onUpdate,
            employeeObj,
            isUpdateForm
        });
    }

    return(
        <Fragment>
            <Form isUpdateForm={componentState.isUpdateForm} employeeObj={componentState.employeeObj} handleUpdateState={handleUpdateState} />
            <hr />
            <Dashboard updateEmployeeData={handleUpdateState} employees={componentState.employees} />
        </Fragment>
    );
}

export default Container;
