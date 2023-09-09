import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'

//Components
import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'

import { NavLink, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'


function Edit_user_info() {

    //Access to params's user
    const { id } = useParams()
    const navigate = useNavigate()
    const [single_user, setSingle_user] = useState([])
    const [display_user, setDisplay_user] = useState([])
    const [birthday, setBirthday] = useState(new Date());

    //State for Update informations
    const [up_idcard, setUp_idcard] = useState("")

    //For get_provinces and amphures
    const [province_id, setProvince_id] = useState("")
    const [amphure_id, setAmphure_id] = useState("")
    const [district_id, setDistrict_id] = useState("")
    const [show_provinces, setShow_provinces] = useState([])
    const [show_amphures, setShow_amphures] = useState([])
    const [show_district, setShow_district] = useState([])


    //Logout and Clear a localStorage
    const handleLogout = () => {
        localStorage.clear()
        window.location = '/'
    }



    //Get permission from localStorage
    const permission = localStorage.getItem('permission')


    //Update Function
    const Updata_user_info = (reg_id) => {
        axios.put("http://localhost:3000/update_user_info/", { reg_id: reg_id, id_card: up_idcard })
            .then((res) => {
                setSingle_user(single_user.map((val) => {
                    return val.reg_id == reg_id
                        ? {
                            reg_id: val.reg_id,
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
                // window.location = "/user_info"
            })
            console.log(res)
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

    useEffect(() => {
        const get_provinces = async () => {
            const resprovinces = await fetch("http://localhost:3000/get_provinces")
            const respro = await resprovinces.json();
            setShow_provinces(await respro)
        }
        get_provinces()
    }, [])

    useEffect(() => {
        const get_amphures = async () => {
            const resAmphures = await fetch(`http://localhost:3000/get_amphures/${province_id}`)
            const resAmp = await resAmphures.json();
            setShow_amphures(await resAmp)
        }
        get_amphures()

    }, [province_id])

    useEffect(() => {
        const get_district = async () => {
            const resDistrict = await fetch(`http://localhost:3000/get_districts/${amphure_id}`)
            const resDis = await resDistrict.json();
            setShow_district(await resDis)
        }

        get_district()
    }, [amphure_id])

    console.log(single_user)

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
                                    <h2 className="card-title" style={{ color: "blue", display: 'flex', justifyContent: 'center' }}>จัดการข้อมูลส่วนบุคคล</h2>

                                    <form className="forms-sample">
                                        {single_user.map((val) => {
                                            return (
                                                <>
                                                    <div key={val.id}>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">เลขบัตรประจำตัวประชาชน</label>
                                                            <input className="form-control-plaintext" type="text" placeholder="x-xxxx-xxxxx-xx-x" aria-label="readonly input example" readOnly></input>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">หลักสูตร</label>
                                                            <select className="form-select" aria-label="Default select example">
                                                                <option select value={val.course}>{val.course}</option>
                                                                <option value='สาขาพนักงานการใช้คอมพิวเตอร์(ประมวลผลคำ)'>สาขาพนักงานการใช้คอมพิวเตอร์(ประมวลผลคำ)</option>
                                                                <option value='สาขาพนักงานการใช้คอมพิวเตอร์(ตารางทำการ)'>สาขาพนักงานการใช้คอมพิวเตอร์(ตารางทำการ)</option>
                                                            </select>
                                                        </div>


                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">ประเภทผู้สมัครสอบ (ทดสอบ)</label>
                                                            <select className="form-select" aria-label="Default select example">
                                                                <option select value={val.candidate}>{val.candidate}</option>
                                                                <option value="ผู้รับการฝึกจาก กพร.">ผู้รับการฝึกจาก กพร.</option>
                                                                <option value="จากสถานศึกษา">จากสถานศึกษา</option>
                                                                <option value="จากภาครัฐ">จากภาครัฐ</option>
                                                                <option value="จากภาคเอกชน">จากภาคเอกชน</option>
                                                                <option value="บุคคลทั่วไป">บุคคลทั่วไป</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">คำนำหน้า</label>
                                                            <select className="form-select" aria-label="Default select example" onChange={(e) => setPrefix(e.target.value)}>
                                                                <option select value={val.prefix}>{val.prefix}</option>
                                                                <option value="นาย">นาย</option>
                                                                <option value="นาง">นาง</option>
                                                                <option value="นางสาว">นางสาว</option>
                                                            </select>
                                                        </div>


                                                        <div className='row'>
                                                            <div className="col form-group">
                                                                <label htmlFor="exampleInputUsername1">ชื่อ</label>
                                                                <input type="text" className="form-control" id="exampleInputUsername1" value={val.name} />
                                                            </div>

                                                            <div className="col form-group">
                                                                <label htmlFor="exampleInputUsername1">นามสกุล</label>
                                                                <input type="text" className="form-control" id="exampleInputUsername1" value={val.lastname} />
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">เพศ</label>
                                                            <select class="form-select" aria-label="Default select example">
                                                                <option selected value={val.gender}>{val.gender}</option>
                                                                <option value="ชาย">ชาย</option>
                                                                <option value="หญิง">หญิง</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">สัญชาติ</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername2" value={val.nationality} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">วัน เดือน ปี เกิด</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername2" value={val.Thaibirthday} readOnly />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">โทรศัพท์</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername2" value={val.tel} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">E-mail</label>
                                                            <input type="text" className="form-control" id="exampleInputUsername2" value={val.email} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="floatingTextarea2">ที่อยู่ตามทะเบียนบ้าน/ที่อยู่ตามบัตรประชาชน</label>
                                                            <textarea className="form-control" placeholder="" id="floatingTextarea2" style={{ height: '100px' }} defaultValue={""}
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="floatingTextarea2">จังหวัด</label>
                                                            <select class="form-select" aria-label="Default select example">
                                                                {show_provinces.map((items) => {
                                                                    return(
                                                                        <option key={items.id} value={items.id}>{items.id}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>

                                                    </div>
                                                    <button type="submit" className="btn btn-primary me-2" onClick={() => Updata_user_info(val.reg_id)}>อัปเดตข้อมูล</button>
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