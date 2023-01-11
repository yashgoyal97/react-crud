export default function Form(props) {

    function handleInputChange(e) {
        props.handleUpdateState({
            ...props.employeeObj,
            [e.target.name]: e.target.value
        }, props.isUpdateForm);
    }

    function resetEmployeeObject() {
        props.handleUpdateState({
            name: "",
            empId: ""
        }, false);
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
                    resetEmployeeObject();
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
            <input id="name" name="name" placeholder="Enter name" value={props.employeeObj.name} onChange={handleInputChange} />
            <input id="empId" name="empId" placeholder="Enter employee ID" value={props.employeeObj.empId} onChange={handleInputChange} />
            <button onClick={submitForm}>{buttonText}</button>
        </form>
    );
}