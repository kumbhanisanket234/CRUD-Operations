import React from 'react'

function AddNewDataModal({ Name, setName, Phone, setPhone, Department, setDepartment, Email, setEmail, Exp, setExp, Salary, setSalary   }) {
    return (
        <div>
            Name:<input type="text" className="form-control" value={Name} onChange={(evt) => { setName(evt.target.value) }} />
            Department:<input type="text" className="form-control" value={Department} onChange={(evt) => setDepartment(evt.target.value)} />
            Experience:<input type="text" className="form-control" value={Exp} onChange={(evt) => { setExp(evt.target.value) }} />
            Email:<input type="email" className="form-control" value={Email} onChange={(evt) => { setEmail(evt.target.value) }} />
            Phone:<input type="tel" className="form-control" value={Phone} onChange={(evt) => { setPhone(evt.target.value) }} />
            salary:<input type="text" className="form-control" value={Salary} onChange={(evt) => { setSalary(evt.target.value) }} />
        </div>
    )
}

export default AddNewDataModal
