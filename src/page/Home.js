import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import DetailsModal from "../component/DetailsModal";
import axios from "axios";
import { useFilter } from "../component/Filterdata";
import Pagination from "../component/Pagination";

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
  const [nameicon, setNameicon] = useState("down");
  const [departmenticon, setDepartmenticon] = useState("down");
  const [idicon, setIdicon] = useState("down");
  const { department, updateDepartment, updateList, filter,themeMode } = useFilter();


  const [itemsperpage, setItemsperpage] = useState(10);
  const [currentpage, setCurrentpage] = useState(1);
  const pages = [];
  for (let i = 1; i <= Math.ceil(Fdata.length / itemsperpage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentpage * itemsperpage;
  const indexOfFirstItem = indexOfLastItem - itemsperpage;

  let UI = 0;
  let react = 0;
  let Python = 0;
  let DB = 0;
  let maxId = 0;

  Newfdata.map((item) => {
    const dep = item.department;
    dep.toLowerCase().includes("ui/ux") ? UI = UI + 1 :
      dep.toLowerCase().includes("react") ? react = react + 1 :
        dep.toLowerCase().includes("db") ? DB = DB + 1 :
          dep.toLowerCase().includes("python") ? Python = Python + 1 : Python = Python
  })

  const handleShow = (data) => {
    setShowModal(true);
    setModaltitle("More Details")
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

    setCurrentpage(1);
  }, [Search, Newfdata])

  const DeleteItem = async (id) => {

    if (window.confirm("Are You Sure To Delete This Record?")) {

      try {
        await axios.delete(`http://192.168.11.198:8000/employees/${id}`)
        FetchData();
      }
      catch (err) {
      }
    }
    else {
      return false;
    }
  }

  for (let i = 0; i < Newfdata.length; i++) {
    if (maxId < Newfdata[i].id) {
      maxId = Newfdata[i].id;
    }
  }

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

    switch (true) {
      case (NewData.name == "" || NewData.department == "" || NewData.experience == "" || NewData.email == "" || NewData.salary == "" || NewData.phone == ""):
        alert("Please fill all the fields")
        break;

      case (NewData.department !== "REACT" && NewData.department !== "PYTHON" && NewData.department !== "DB" && NewData.department !== "UI/UX"):
        alert("Department Not Allowed!");
        break;

      case (!validateEmail(NewData.email)):
        alert("Enter a valid email address");
        return false;

      case ((NewData.phone.toLowerCase() >= 'a' && NewData.phone.toLowerCase() <= 'z') || (NewData.phone.length != 10)):
        alert("Enter Valid Phone Number");
        break;

      case ((NewData.salary.toLowerCase() >= 'a' && NewData.salary.toLowerCase() <= 'z')):
        alert("Enter Valid Salary");
        break;

      default:
        if (AddUpdatebtn === "Add") {
          try {
            await axios.post('http://192.168.11.198:8000/employees', NewData)
            setAddmodal(false)
            setModaltitle("Update Data")
            FetchData();
          }
          catch (err) {
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
            alert('Failed To Update Data');
          }
        }
        break;
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

  const handleDepartmentFilter = (dept) => {
    updateDepartment(dept);
  };

  useEffect(() => {
    if (department) {
      const filteredData = Newfdata.filter((val) =>
        val.department.toLowerCase().includes(department.toLowerCase())
      );
      setFdata(filteredData);
    } else {
      setFdata(Newfdata);
    }
  }, [department]);

  const handleListFilter = (title) => {
    updateList(title);
  }

  useEffect(() => {
    if (filter === "id") {
      if (idicon === "up") {
        setFdata([...Newfdata].sort((a, b) => b.id - a.id))
      }
      else {
        setFdata([...Newfdata].sort((a, b) => a.id - b.id));
      }
    }

    else if (filter === "name") {
      if (nameicon === "up") {
        setFdata([...Newfdata].sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase())))
      }
      else {
        setFdata([...Newfdata].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())))
      }
    }

    else if (filter === "department") {
      if (departmenticon === "up") {
        setFdata([...Newfdata].sort((a, b) => b.department.toLowerCase().localeCompare(a.department.toLowerCase())))
      }
      else {
        setFdata([...Newfdata].sort((a, b) => a.department.toLowerCase().localeCompare(b.department.toLowerCase())))
      }
    }
  }, [Newfdata, filter, idicon, nameicon, departmenticon])

  return (
    <>
      <div className={themeMode ? "bg-dark text-light" : "bg-light text-dark"}>
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
                        <th scope="col"><span onClick={() => handleDepartmentFilter("react")}>React</span></th>
                        <th scope="col"><span onClick={() => handleDepartmentFilter("python")}>Python</span></th>
                        <th scope="col"><span onClick={() => handleDepartmentFilter("db")}>DB</span></th>
                        <th scope="col"><span onClick={() => handleDepartmentFilter("ui/ux")}>UI/UX</span></th>
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
                        <table className="table table-info table-bordered">
                          <thead className="table-header">
                            <tr>
                              <th scope="col">Id<i className={`ms-2 fa-solid fa-angle-${idicon}`} onClick={() => { return handleListFilter("id"), idicon === "up" ? setIdicon("down") : setIdicon("up") }}></i></th>
                              <th scope="col">Name<i className={`ms-2 fa-solid fa-angle-${nameicon}`} onClick={() => { return handleListFilter("name"), nameicon === "up" ? setNameicon("down") : setNameicon("up") }}></i></th>
                              <th scope="col">Department<i className={`ms-2 fa-solid fa-angle-${departmenticon}`} onClick={() => { return handleListFilter("department"), departmenticon === "up" ? setDepartmenticon("down") : setDepartmenticon("up") }}></i></th>
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
                                Fdata.slice(indexOfFirstItem, indexOfLastItem).map((val, index) => {
                                  return (
                                    <>
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
                                    </>
                                  )
                                })
                            }
                          </tbody>
                        </table>

                        {ShowModal && (
                          <>
                            <DetailsModal
                              Email={Email}
                              Phone={Phone}
                              Exp={Exp}
                              Salary={Salary}
                              handleClose={handleClose}
                              Modaltitle={Modaltitle}
                            />
                          </>
                        )}
                        {Addmodal && (
                          <>
                            <DetailsModal
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
                              handleClose={handleClose}
                              AddUpdatebtn={AddUpdatebtn}
                              AddNewData={AddNewData}
                              Modaltitle={Modaltitle}
                            />
                          </>
                        )}

                      </div >
                      <Pagination currentpage={currentpage} setCurrentpage={setCurrentpage} pages={pages} />
                    </div >
                  </div >
              }
            </>
        }
      </div>
    </>
  )
}

