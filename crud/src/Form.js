import { useState } from "react";

export default function Form() {

    const [employeeObj, setEmployeeObj] = useState({
        name: "",
        empId: ""
    });

    function handleInputChange(e) {
        setEmployeeObj({
            ...employeeObj,
            [e.target.name]: e.target.value
        });
    }

    function submitForm(e) {
        e.preventDefault();
        if (employeeObj.name && employeeObj.empId) {
            fetch('http://localhost:8000/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeObj)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success: ', data);
                    setEmployeeObj({
                        name: "",
                        empId: ""
                    });
                })
                .catch((error) => {
                    console.log('Error: ', error);
                    setEmployeeObj({
                        name: "",
                        empId: ""
                    });
                });
        }
    }

    return(
        <form>
            <input id="name" name="name" placeholder="Enter name" value={employeeObj.name} onChange={handleInputChange} />
            <input id="empId" name="empId" placeholder="Enter employee ID" value={employeeObj.empId} onChange={handleInputChange} />
            <button onClick={submitForm}>Submit</button>
        </form>
    );
}