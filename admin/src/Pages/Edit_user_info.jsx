import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'



//Components
import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'

import { NavLink, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Edit_user_info() {

    //Access to params's user
    const { id } = useParams()
    const navigate = useNavigate()
    const [single_user, setSingle_user] = useState([])
    const [display_user, setDisplay_user] = useState([])



    //State for Update informations
    const [up_idcard, setUp_idcard] = useState("")



    //Logout and Clear a localStorage
    const handleLogout = () => {
        localStorage.clear()
        window.location = '/'
    }



    //Get permission from localStorage
    const permission = localStorage.getItem('permission')




    //Update Function
    const Updata_user_info = (id) => {
        axios.put("http://localhost:3000/update_user_info/", { id: id, id_card: up_idcard })
            .then((res) => {
                setSingle_user(single_user.map((val) => {
                    return val.id == id
                        ? {
                            id: val.id,
                            id_card: up_idcard,
                            name: val.name,
                            lastname: val.lastname,
                            province: val.province,
                            gender: val.gender,
                            religion: val.religion,
                            status: val.status,
                            permission: val.permission,
                            receipt: val.receipt
                        }
                        : val
                }))
                window.location = "/user_info"
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/edit_user_info/${id}`).then((res) => {
            setSingle_user(res.data)
        })
        if (!permission) {
            console.log("Please login again")
            alert("กรุณาทำการเข้าสู่ระบบ")
            window.location = '/'
        }
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
                        <Navbar_admin />
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="card-title" style={{ color: "black", display: 'flex', justifyContent: 'center' }}>อัปเดตข้อมูล</h3>

                                    <form className="forms-sample">
                                        {single_user.map((val) => {
                                            return (
                                                <>
                                                    <div key={val.id}>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">เลขบัตรประจำตัวประชาชน</label>
                                                            <input className="form-control" type="text" placeholder={val.id_card} aria-label="input example"
                                                                onChange={(e) => setUp_idcard(e.target.value)}></input>
                                                        </div>


                                                        <div className='row'>
                                                            <div className="col form-group">
                                                                <label htmlFor="exampleInputUsername1">ชื่อ</label>
                                                                <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.name} />
                                                            </div>

                                                            <div className="col form-group">
                                                                <label htmlFor="exampleInputUsername1">นามสกุล</label>
                                                                <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.lastname} />
                                                            </div>
                                                        </div>


                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">จังหวัด</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.province} />
                                                        </div>


                                                        <select class="form-select" aria-label="Default select example">
                                                            <option selected>{val.gender}</option>
                                                            <option value="ชาย">ชาย</option>
                                                            <option value="หญิง">หญิง</option>
                                                        </select>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">ศาสนา</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.religion} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">สถานะภาพ</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.status} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">สิทธิการเข้าถึง</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.permission} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">การชำระเงิน</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername1" placeholder={val.receipt} />
                                                        </div>

                                                    </div>
                                                    <button type="submit" className="btn btn-primary me-2" onClick={() => Updata_user_info(val.id)}>อัปเดตข้อมูล</button>
                                                    <button className="btn btn-light">Cancel</button>
                                                </>
                                            )
                                        })}



                                    </form>
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
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Edit_user_info