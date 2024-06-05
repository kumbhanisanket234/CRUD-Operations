import React from 'react'

function MoreDetailsModal({ Exp, Salary, Phone, Email}) {
    return (
        <div>
            <h5>Email</h5>
            <p>{Email}</p>
            <h5>Phone</h5>
            <p>{Phone}</p>
            <h5>Experience</h5>
            <p>{Exp} Years</p>
            <h5>Salary</h5>
            <p>{Salary}</p>
        </div>
    )
}

export default MoreDetailsModal
