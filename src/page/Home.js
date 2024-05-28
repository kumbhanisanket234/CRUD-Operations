import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import DetailsModal from "../component/DetailsModal";
import axios from "axios";

export default function Home() {

  const [Fdata, setFdata] = useState([]);
  const [Newfdata, setNewfdata] = useState([]);
  const [Load, setLoad] = useState(true);
  const [Reject, setReject] = useState(true);
  const [Search, setSearch] = useState("");

  const [ShowModal, setShowModal] = useState(false);
  const [Addmodal, setAddmodal] = useState(false);
  const [Name, setName] = useState("");
  const [Department, setDepartment] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Exp, setExp] = useState("");
  const [Salary, setSalary] = useState("");

  const [Id, setId] = useState(0);
  const [AddUpdatebtn, setAddUpdatebtn] = useState("Add");
  const [Modaltitle, setModaltitle] = useState("Add Data");
  const [Nextindex, setNextindex] = useState(9);
  const [Previousindex, setPreviousindex] = useState(-1);
  const [ShowPreviousBtn, setShowPreviousBtn] = useState(false);

  let ShowNextBtn = false;

  let UI = 0;
  let react = 0;
  let Python = 0;
  let DB = 0;
  let maxId;

  Newfdata.map((item) => {
    const dep = item.department;
    dep.toLowerCase().includes("ui/ux") ? UI = UI + 1 :
      dep.toLowerCase().includes("react") ? react = react + 1 :
        dep.toLowerCase().includes("db") ? DB = DB + 1 :
          dep.toLowerCase().includes("python") ? Python = Python + 1 : Python = Python
  })

  const handleShow = (data) => {
    setShowModal(true);
    setEmail(data.email);
    setPhone(data.phone);
    setExp(data.experience);
    setSalary(data.salary);
  }

  const handleClose = () => {
    setName("")
    setDepartment("");
    setEmail("");
    setPhone("");
    setExp("");
    setSalary("");

    setShowModal(false);
    setAddmodal(false);
  }
  const FetchData = async () => {
    try {
      const res = await fetch("http://192.168.11.198:8000/employees")
      const resdata = await res.json();
      setFdata(resdata);
      setNewfdata(resdata)
      setLoad(false);
      setReject(false)

    } catch (err) {
      console.log(err)
      setLoad(false)
      setReject(true)
    }
  };

  useEffect(() => {
    FetchData();

  }, []);

  useEffect(() => {
    const FilteredDepartment = Newfdata.filter((val) =>
      val.department.toLowerCase().includes(Search.toLowerCase())
    )
    const FilteredName = Newfdata.filter((val) =>
      val.name.toLowerCase().includes(Search.toLowerCase())
    )
    const FilteredId = Newfdata.filter((val) =>
      val.id === Search
    )

    const FilteredSet = new Set([...FilteredDepartment, ...FilteredName, ...FilteredId])
    const FilteredResults = [...FilteredSet]
    FilteredResults.length > 0 ? setFdata(FilteredResults) : setFdata([]);

  }, [Search])

  const DeleteItem = async (id) => {
    try {
      await axios.delete(`http://192.168.11.198:8000/employees/${id}`)
      FetchData();
    }
    catch (err) {
      console.log(err)
    }
  }

  Fdata.map((val) => {
    maxId = val.id;
  })

  const HandleAddNewReacordBtn = () => {
    setAddmodal(true);
    setAddUpdatebtn("Add");
    setModaltitle("Add Data");
  }
  const NewData = {
    id: maxId + 1,
    name: Name,
    department: Department.toUpperCase(),
    experience: Exp,
    email: Email,
    salary: Salary,
    phone: Phone
  }

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const AddNewData = async () => {

    if (NewData.name == "" || NewData.department == "" || NewData.experience == "" || NewData.email == "" || NewData.salary == "" || NewData.phone == "") {
      alert("Please fill all the fields")
    }
    else if (NewData.department !== "REACT" && NewData.department !== "PYTHON" && NewData.department !== "DB" && NewData.department !== "UI/UX") {
      alert("Department Not Allowed!");
    }
    else if (!validateEmail(NewData.email)) {
      alert("Enter a valid email address");
      return false;
    }
    else if ((NewData.phone.toLowerCase() >= 'a' && NewData.phone.toLowerCase() <= 'z') || (NewData.phone.length != 10)) {
      alert("Enter Valid Phone Number");
    }
    else if ((NewData.salary.toLowerCase() >= 'a' && NewData.salary.toLowerCase() <= 'z')) {
      alert("Enter Valid Salary");
    }

    else {
      if (AddUpdatebtn === "Add") {
        try {
          await axios.post('http://192.168.11.198:8000/employees', NewData)
          setAddmodal(false)
          setModaltitle("Update Data")
          FetchData();
        }
        catch (err) {
          console.log(err)
          alert('Failed To Add Data');
        }
      }

      else {
        NewData.id = Id;
        try {
          await axios.put(`http://192.168.11.198:8000/employees/${Id}`, NewData)
          setName("")
          setDepartment("")
          setExp("")
          setEmail("")
          setSalary("")
          setPhone("")
          setModaltitle("Add Data");
          setAddmodal(false)
          FetchData();
        }
        catch (err) {
          console.log(err)
          alert('Failed To Update Data');
        }
      }
    }
  }

  const OpenUpdateModal = (val) => {
    setAddmodal(true);
    setAddUpdatebtn("Update")
    setName(val.name);
    setDepartment(val.department);
    setExp(val.experience);
    setEmail(val.email);
    setSalary(val.salary);
    setPhone(val.phone);
    setId(val.id);
    setModaltitle("Update Data")
  }

  const handleNextBtn = () => {
    setPreviousindex(Nextindex);
    setNextindex(pre => pre + 10)

    if (Nextindex >= 9) {
      setShowPreviousBtn(true);
    }
  }

  const handlePreviosBtn = () => {
    setNextindex(Previousindex);
    setPreviousindex(pre => pre - 10)

    if (Previousindex <= 9) {
      setShowPreviousBtn(false);
    }
  }

  return (
    <>
      <Header />
      {
        Load
          ? <p>Loading...</p>
          :
          <>
            <div className="mt-4">
              <h5 className="mb-3">Technology Overview</h5>
              <div className="container">
                <table className="table table-info table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">React</th>
                      <th scope="col">Python</th>
                      <th scope="col">DB</th>
                      <th scope="col">UI/UX</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{react}</td>
                      <td>{Python}</td>
                      <td>{DB}</td>
                      <td>{UI}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {
              Reject
                ? <h1 style={{ color: '#ccc' }}>Data Not Found</h1>
                :
                <div className="mt-5">
                  <h5 className="mb-3">Employee List</h5>
                  <div className="container">


                    <div className="input d-flex justify-content-between mx-3 mb-3">
                      <input type="text" className="form-control" style={{ width: '300px' }} placeholder="Search..." onChange={(evt) => { setSearch(evt.target.value) }} />
                      <button className="btn btn-success me-3" onClick={HandleAddNewReacordBtn}>AddNewRecord</button>
                    </div>

                    <div className="container table_hight">
                      <table className="table table-light table-bordered">
                        <thead className="table-header">
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>

                          {
                            Fdata.length === 0
                              ? <tr>
                                <td colSpan="4">Search Item Not Found</td>
                              </tr>
                              :
                              Fdata.map((val, index) => {
                                return (
                                  <>
                                    {index <= Nextindex && index > Previousindex ?
                                      <tr key={index}>

                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.department.toUpperCase()}</td>
                                        <td>

                                          <button type="button" className="btn btn-danger" onClick={() => DeleteItem(val.id)}>Delete</button>
                                          <button type="button" className="btn btn-warning ms-2" onClick={() => OpenUpdateModal(val)}>Update</button>
                                          <button type="button" className="btn btn-primary ms-2" onClick={() => handleShow(val)}>More</button>

                                        </td>
                                      </tr>
                                      : null
                                    }
                                    {
                                      Nextindex >= Fdata.length - 1 ? ShowNextBtn = false : ShowNextBtn = true
                                    }
                                  </>
                                )
                              })
                          }
                        </tbody>
                      </table>

                      {ShowModal && (
                        <>
                          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">

                                <div className="modal-header">
                                  <h5 className="modal-title">More Details</h5>
                                  <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>

                                <div className="modal-body text-start">
                                  <h5>Email</h5>
                                  <p>{Email}</p>
                                  <h5>Phone</h5>
                                  <p>{Phone}</p>
                                  <h5>Experience</h5>
                                  <p>{Exp} Years</p>
                                  <h5>Salary</h5>
                                  <p>{Salary}</p>
                                </div>

                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Close
                                  </button>
                                </div>

                              </div>
                            </div>
                          </div>
                          <div className="modal-backdrop show"></div>
                        </>
                      )}
                      {Addmodal && (
                        <>
                          <div className='modal show' tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                            <div className="modal-dialog" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">{Modaltitle}</h5>
                                  <button type="button" className="close" onClick={handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body text-start">
                                  Name:<input type="text" className="form-control" value={Name} onChange={(evt) => { setName(evt.target.value) }} />
                                  Department:<input type="text" className="form-control" value={Department} onChange={(evt) => setDepartment(evt.target.value)} />
                                  Experience:<input type="text" className="form-control" value={Exp} onChange={(evt) => { setExp(evt.target.value) }} />
                                  Email:<input type="email" className="form-control" value={Email} onChange={(evt) => { setEmail(evt.target.value) }} />
                                  Phone:<input type="tel" className="form-control" value={Phone} onChange={(evt) => { setPhone(evt.target.value) }} />
                                  salary:<input type="text" className="form-control" value={Salary} onChange={(evt) => { setSalary(evt.target.value) }} />

                                </div>
                                <div className="modal-footer">
                                  <button className="btn btn-success" onClick={AddNewData}>{AddUpdatebtn}</button>
                                  <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-backdrop show"></div>
                        </>
                      )}
                      {
                        ShowPreviousBtn &&
                        <button className="btn btn-success" onClick={handlePreviosBtn}>Previous</button>
                      }
                      {
                        ShowNextBtn &&
                        <button className="btn btn-success ms-2" onClick={handleNextBtn}>Next</button>
                      }
                    </div>

                    <DetailsModal />
                  </div>
                </div>
            }
          </>
      }
    </>)
}