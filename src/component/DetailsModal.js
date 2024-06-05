import React, { useState } from 'react'
import MoreDetailsModal from './Modals/MoreDetailsModal'
import AddNewDataModal from './Modals/AddNewDataModal'

export default function DetailsModal({ Exp, Salary, Phone, Email, Name, setName, setPhone, Department, setDepartment, setEmail, setExp, setSalary, handleClose, AddNewData, AddUpdatebtn, Modaltitle }) {

  return (
    <>
      <div className="modal show text-dark" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">

            <div className="modal-header">  
              <h5 className="modal-title">{Modaltitle}</h5>
              <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body text-start">

              {
                Modaltitle === "More Details"
                  ?
                  <MoreDetailsModal
                    Email={Email}
                    Phone={Phone}
                    Exp={Exp}
                    Salary={Salary}
                  />
                  :
                  <AddNewDataModal
                    Name={Name}
                    setName={setName}
                    Department={Department}
                    setDepartment={setDepartment}
                    Exp={Exp}
                    setExp={setExp}
                    Email={Email}
                    setEmail={setEmail}
                    Phone={Phone}
                    setPhone={setPhone}
                    Salary={Salary}
                    setSalary={setSalary}
                  />
              }
            </div>

            <div className="modal-footer">
              {
                Modaltitle === "Add Data" || Modaltitle === "Update Data"
                  ?
                  <button className="btn btn-success" onClick={AddNewData}>{AddUpdatebtn}</button>
                  : null
              }

              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  )
}
