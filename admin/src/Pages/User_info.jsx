import React from 'react'
import { useState, useEffect, useRef } from "react"
import axios from 'axios'


//Components
import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'

import { NavLink, Link } from 'react-router-dom'

//React-to-print
import { useReactToPrint } from "react-to-print"
import jsPDF from "jspdf"
import "jspdf-autotable";


function User_info() {

  const componentPDF = useRef()
  const [display_user, setDisplay_user] = useState([])
  const [rt_text, setRT_text] = useState("")
  const [show_permission, setShow_permission] = useState(null)


  //Logout and Clear a localStorage
  const handleLogout = () => {
    localStorage.clear()
    window.location = '/'
  }


  const delete_user = (id) => {
    axios.delete(`http://localhost:3000/delete_member/${id}`).then(() => {

      if (confirm("ต้องการจะลบข้อมูลใช่หรือไม่") == true) {
        setDisplay_user(
          display_user.filter((val) => {
            return val.id != id
          })
        )
      } else {
        return false
      }

    })
  }


  const For_user_dont_pay = () => {
    window.location = '/waiting_for_payment'
  }


  const permission = localStorage.getItem('permission')
  useEffect(() => {

    //Check permission
    if (!permission) {
      console.log("Please login again")
      alert("กรุณาทำการเข้าสู่ระบบ")
      window.location = '/'
    }

    //Display user
    axios.get("http://localhost:3000/display_all_user").then((res) => {
      setDisplay_user(res.data)

    })


  }, [])

  return (
    <>
      {/* Page Wrapper */}
      <div id="wrapper">


        {/* Sidebar-admin */}
        < Sidebar />

        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">



          {/* Main Content */}
          <div id="content">
            <Navbar_admin prop={permission} />


            <div className="container-fluid" >
              {/* Page Heading */}
              {/* <h1 className="h3 mb-2 text-gray-800">ข้อมูลผู้สมัคร</h1>
              <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below. For more information about DataTables, please visit the <a target="_blank" href="https://datatables.net">official DataTables documentation</a>.</p> */}
              {/* DataTales Example */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h3 className="m-0 font-weight-bold text-primary"></h3>
                </div>
                <div className="card-body">
                  <h1 style={{ textAlign: 'center', fontWeight: "bold", color: "blue" }}>ข้อมูลผู้เข้าร่วมการสอบ</h1>
                  <div className="table-responsive">
                    <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div className="dataTables_length" id="dataTable_length">
                            <label>แสดงข้อมูล
                              <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm">
                                <option value={10}>10</option>
                                <option value={25}>25</option><option value={50}>50</option>
                                <option value={100}>100</option>
                              </select>
                            </label>
                            <button onClick={For_user_dont_pay} class="btn btn-warning btn-icon-split ml-3">
                              <span class="text">แสดงข้อมูลสำหรับผู้ที่ยังไม่ได้ชำระเงิน</span>
                            </button>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">



                          {/* Real-time search */}
                          <div id="dataTable_filter" className="dataTables_filter" style={{ display: 'flex', justifyContent: "end" }}>
                            <label>ค้นหา: เลขบัตรปชชและชื่อ
                              <input type="search" className="form-control form-control-sm" placeholder
                                aria-controls="dataTable" onChange={(e) => setRT_text(e.target.value)} />
                            </label>
                          </div>



                        </div>
                      </div>
                      <div className="row"><div className="col-sm-12">
                        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                          <thead>
                            <tr role="row" style={{ textAlign: "center" }}>
                              <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '100px' }}>รหัสสอบ</th>
                              <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '200px' }}>หลักสูตร</th>
                              <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>ประเภทผู้สมัครทดสอบ</th>
                              <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>คำนำหน้า</th>
                              <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>ชื่อ</th>
                              <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>นามสกุล</th>
                              <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '100px' }}>สัญชาติ</th>
                              <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Age: activate to sort column ascending" style={{ width: '100px' }}>วันเกิด</th>
                              <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '150x' }}>เพศ</th>
                              <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '100px' }}>สิทธิ์การเข้าถึง</th>
                              <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '150px' }}>แก้ไข-ลบข้อมูล</th>
                            </tr>
                          </thead>

                          <tbody style={{ textAlign: "center" }}>

                            {/* Search filter */}
                            {display_user.filter((items) => {
                              if (rt_text === "") {
                                return items
                              } else if (items.reg_id.toLowerCase().includes(rt_text.toLocaleLowerCase())) {
                                return items
                              } else if (items.name.toLowerCase().includes(rt_text.toLocaleLowerCase())) {
                                return items
                              }
                            }).map((items) => {
                              return (
                                <>
                                  <tr key={items.reg_id} role="row" className="odd">
                                    <td className="sorting_1">{items.reg_id}</td>
                                    <td>{items.course}</td>
                                    <td>{items.candidate}</td>
                                    <td>{items.prefix}</td>
                                    <td>{items.name} </td>
                                    <td>{items.lastname} </td>
                                    <td>{items.nationality}</td>
                                    <td>{items.Thaibirthday}</td>
                                    <td>{items.gender}</td>
                                    <td>{items.permission === "รอชำระเงิน"
                                      ? (
                                        <>
                                          <a href="#" class="btn btn-warning btn-icon-split">
                                            <span class="text">รอชำระเงิน</span>
                                          </a>
                                        </>
                                      )
                                      : (
                                        <>
                                          <a href="#" class="btn btn-success btn-icon-split">
                                            <span class="text">ผู้สมัคร</span>
                                          </a>
                                        </>
                                      )}</td>


                                    <td style={{ display: 'flex', justifyContent: "space-between" }}>
                                      <Link to={{ pathname: `/edit_user_info/${items.reg_id}` }}>
                                        <button className="btn btn-primary btn-icon-split">
                                          <span className="text">แก้ไข</span>
                                        </button>
                                      </Link>

                                      <button className="ml-3 btn btn-danger btn-icon-split" onClick={() => delete_user(items.id)}>
                                        <span className="text">ลบ</span>
                                      </button>
                                    </td>
                                  </tr>
                                </>
                              )
                            })}


                          </tbody>
                        </table>
                      </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-5">
                          {/* <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div> */}
                        </div>
                        <div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                          <ul className="pagination">
                            <li className="paginate_button page-item previous disabled" id="dataTable_previous">
                              <a href="#" aria-controls="dataTable" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li>
                            <li className="paginate_button page-item active"><a href="#" aria-controls="dataTable" data-dt-idx={1} tabIndex={0} className="page-link">1</a></li>
                            <li className="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx={2} tabIndex={0} className="page-link">2</a></li>
                            <li className="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx={3} tabIndex={0} className="page-link">3</a></li>
                            <li className="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx={4} tabIndex={0} className="page-link">4</a></li>
                            <li className="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx={5} tabIndex={0} className="page-link">5</a></li>
                            <li className="paginate_button page-item "><a href="#" aria-controls="dataTable" data-dt-idx={6} tabIndex={0} className="page-link">6</a></li>
                            <li className="paginate_button page-item next" id="dataTable_next"><a href="#" aria-controls="dataTable" data-dt-idx={7} tabIndex={0} className="page-link">Next</a></li>
                          </ul>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          {/* End of Main Content */}



          < Footer_admin />
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}





      {/* Logout Modal*/}
      <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {/* <h5 className="modal-title" id="exampleModalLabel">ต้องการที่จะออกหรือไม่</h5> */}
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <h4 className="modal-body" style={{ textAlign: 'center' }}>ต้องการที่จะออกหรือไม่</h4>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">ยกเลิก</button>
              <button className="btn btn-primary" onClick={handleLogout}>ออกจากระบบ</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default User_info