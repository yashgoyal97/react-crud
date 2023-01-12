import './Form.css';

export default function Form(props) {

    function handleInputChange(e) {
        props.handleUpdateState({
            ...props.employeeObj,
            [e.target.name]: e.target.value
        }, props.isUpdateForm, false);
    }

    function handleEmployeeUpdate() {
        props.handleUpdateState({
            name: "",
            empId: ""
        }, false, true);
    }

    function resetEmployeeObject() {
        props.handleUpdateState({
            name: "",
            empId: ""
        }, false, false);
    }

    function submitForm(e) {
        e.preventDefault();
        if (props.employeeObj.name && props.employeeObj.empId) {

            let method = 'POST';
            const id = props.employeeObj.id;
            let url = 'http://localhost:8000/employees';

            if (props.isUpdateForm) {
                method = 'PUT';
                url = `http://localhost:8000/employees/${id}`;
            }

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(props.employeeObj)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success: ', data);
                    handleEmployeeUpdate();
                })
                .catch((error) => {
                    console.log('Error: ', error);
                    resetEmployeeObject();
                });

        }
    }

    const buttonText = props.isUpdateForm ? 'Update' : 'Save';

    return(
        <form>
            <input id="name" name="name" placeholder="Enter Name" value={props.employeeObj.name} onChange={handleInputChange} />
            <input id="empId" name="empId" placeholder="Enter Employee ID" value={props.employeeObj.empId} onChange={handleInputChange} />
            <div>
                <button className='form-button' onClick={submitForm}>{buttonText}</button>
                <button className='form-button' onClick={resetEmployeeObject}>Reset</button>
            </div>
        </form>
    );
}