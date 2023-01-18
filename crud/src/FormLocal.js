import './Form.css';

export default function FormLocal(props) {

    function handleInputChange(e) {
        props.onInputChange({
            ...props.employeeObj,
            [e.target.name]: e.target.value
        });
    }

    function resetForm(e) {
        e.preventDefault();
        props.onInputChange({
            name: "",
            empId: ""
        });
    }

    function submitForm(e) {
        e.preventDefault();
        if (props.employeeObj.name && props.employeeObj.empId) {
            props.saveEmployeeData(props.employeeObj);
        }
    }

    const buttonText = props.isUpdateForm ? 'Update' : 'Save';

    return(
        <form>
            <input id="name" name="name" placeholder="Enter Name" value={props.employeeObj.name} onChange={handleInputChange} />
            <input id="empId" name="empId" placeholder="Enter Employee ID" value={props.employeeObj.empId} onChange={handleInputChange} />
            <div>
                <button className='form-button' onClick={submitForm}>{buttonText}</button>
                <button className='form-button' onClick={resetForm}>Reset</button>
            </div>
        </form>
    );
}