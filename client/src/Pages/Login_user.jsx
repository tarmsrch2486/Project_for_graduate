import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MD5 } from 'crypto-js'


import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import ReCAPTCHA from 'react-google-recaptcha'
// import ReCAPTCHA from 'react-google-recaptcha-v3'

function Login_user() {


    //reCaptcha
    const SITE_KEY = '6LebtgYmAAAAADOb1pK-GGCL1PpR_bV-j9x5zqFJ'
    const [captchaDone, setCaptchaDone] = useState(null)
    const onChange = () => {
        console.log('Changed')
        setCaptchaDone(true)
    }

    const [reg_id, setReg_id] = useState("")
    const [id_card, setId_card] = useState("")
    const [dp_idcard, setDp_idcard] = useState("")
    const [login_successful, setLogin_successful] = useState("")
    const [login_failed, setLogin_failed] = useState("")
    const [authentication, setAuthentication] = useState(null)
    const [params, setParams] = useState()
    const [user_data, setUser_data] = useState([])
    const [change_style, setChange_style] = useState("modal")
    const navigate = useNavigate()



    //Debug
    const [checkPayment, setCheckPayment] = useState(null)
    console.log(checkPayment)


    // const check_payment = () => {
    //     axios.post("http://localhost:3000/check_payment", {
    //         reg_id: reg_id
    //     }).then((res) => {

    //         console.log(res.data)
    //         window.location = '/payment'
    //     })
    // }

    //Task for a function----------------------------------------------------------------------------------------
    const submit_login = () => {

        axios.post("http://localhost:3000/login_user", {
            reg_id: reg_id,
            id_card: id_card
        }).then((res) => {
            //If there are not id_card, Let's show error according to message below
            if (res.data.status == "false") {
                // setChange_style("")
                console.log("false")
                // setLogin_failed(res.data.error)
                // setAuthentication(false)
            } else {
                // setChange_style("modal")
                const id_card = res.data.id_card
                const hide_id_card = id_card.substr(10)
                setDp_idcard(hide_id_card)
                setLogin_successful(res.data.message)
                setAuthentication(true)
                setUser_data(res.data.result)
            }
        })

    }

    const reload_page = () => {
        location.reload()

    }


    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="home-tab">
                            <div className="d-sm-flex align-items-center justify-content-between border-bottom">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active ps-0" id="home-tab" data-bs-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true" style={{ fontWeight: "bolder", fontSize: "16px" }}>ตรวจสอบสถานะ</a>
                                    </li>

                                </ul>
                                <div>

                                </div>
                            </div>
                            <div className="container-fluid page-body-wrapper full-page-wrapper">
                                <div className="content-wrapper d-flex auth px-0">
                                    <div className="row w-100 mx-0">
                                        <div className="col-lg-10 mx-auto">
                                            <div className="auth-form-light text-left py-5 px-4 px-sm-5 mt-4 card card-body">
                                                <div className="brand-logo"></div>
                                                <h4 style={{ fontWeight: 'bolder' }}>ตรวจสอบสถานะการสมัคร</h4>
                                                <form className="pt-3 mt-3" >
                                                    <div className="form-group">
                                                        <div>
                                                            <h4>เลขประจำตัวการสอบ</h4>
                                                            <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="เลขประจำตัวการสอบ"
                                                                onChange={(e) => setReg_id(e.target.value.toUpperCase())} />
                                                        </div>

                                                        <div className='mt-3'>
                                                            <h4>เลขบัตรประจำตัวประชาชน</h4>
                                                            <input type="password" className=" form-control form-control-lg" id="exampleInputEmail1" placeholder="เลขบัตรประจำตัวประชาชน"
                                                                onChange={(e) => setId_card(e.target.value)} />

                                                        </div>

                                                    </div>



                                                    {/* recaptcha */}
                                                    <div class="mb-5 mt-5" style={{ display: 'flex', justifyContent: "center" }}>
                                                        < ReCAPTCHA
                                                            sitekey={SITE_KEY}
                                                            onChange={onChange}
                                                        />
                                                    </div>



                                                    {captchaDone
                                                        ? (<>
                                                            {/* Submitform */}
                                                            <button onClick={submit_login} type="button" className="btn btn-warning py-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" >
                                                                ตรวจสอบสถานะ
                                                            </button>

                                                        </>
                                                        )
                                                        : null}



                                                    {/* Warning */}
                                                    {authentication
                                                        ? <>
                                                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h2 style={{ fontWeight: 'bold' }} className="modal-title" id="exampleModalLabel">ข้อมูลผู้สมัครสอบ</h2>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>เลขบัตรประจำตัวประชาชน:</h4>
                                                                                <span className='fs-6'>x-xxxx-xxxxx-{dp_idcard}</span>
                                                                            </div>
                                                                            {user_data.map((val) => {
                                                                                return (
                                                                                    <>
                                                                                        <div key={val.id}>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>หลักสูตร(ฝึกอบรม):</h4>
                                                                                                <span className='fs-6'>{val.course}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>ชื่อ - นามสกุล(TH):</h4>
                                                                                                <span className='fs-6'>{val.name_lastnameTH}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>ชื่อ - นามสกุล(EN):</h4>
                                                                                                <span className='fs-6'>{val.name_lastnameEN}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>ที่อยู่ตามทะเบียนบ้าน/ที่อยู่ตามบัตรประชาชน:</h4>
                                                                                                <span className='fs-6'>{val.address}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>จังหวัด:</h4>
                                                                                                <span className='fs-6'>{val.province_name}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>อำเภอ:</h4>
                                                                                                <span className='fs-6'>{val.amphure_name}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>ตำบล:</h4>
                                                                                                <span className='fs-6'>{val.district_name}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>สัญชาติ:</h4>
                                                                                                <span className='fs-6'>{val.nationality}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>วัน เดือน ปี เกิด:</h4>
                                                                                                <span className='fs-6'>{val.Thaibirthday}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>เบอร์โทรศัพท์:</h4>
                                                                                                <span className='fs-6'>{val.tel}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>อีเมลล์:</h4>
                                                                                                <span className='fs-6'>{val.email}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>เพศ:</h4>
                                                                                                <span className='fs-6'>{val.gender}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>วุฒิการศึกษาสูงสุด:</h4>
                                                                                                <span className='fs-6'>{val.educational}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>สาขา:</h4>
                                                                                                <span className='fs-6'>{val.branch}</span>
                                                                                            </div>
                                                                                            <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>สิทธิ์การเข้าถึง:</h4>
                                                                                                <span className='fs-6'>{val.permission}</span>
                                                                                            </div>


                                                                                            {/* Checkdebug payment */}
                                                                                            {val.receipt == ""
                                                                                                ? (
                                                                                                    <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                        <h4 style={{ fontWeight: 'bold', marginRight: "10px", color: "red" }}>การยืนยันชำระเงิน:</h4>
                                                                                                        <div className='d-flex flex-column mb-3'>
                                                                                                            <span className='fs-6' style={{ marginBottom: "10px", color: "red" }}>กรุณาชำระเงิน</span>
                                                                                                            <img style={{ marginBottom: "10px", color: "red" }} src="https://cdn-icons-png.flaticon.com/512/105/105614.png" class="img-fluid" alt="" width={60} height={40} />
                                                                                                            <Link to={{ pathname: `/payment/${val.reg_id}` }}>
                                                                                                                <button type="button" className="btn btn-warning py-2 px-4"> ชำระเงิน</button>
                                                                                                            </Link>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                                : <div className="mb-2" style={{ display: 'flex' }}>
                                                                                                    <h4 style={{ fontWeight: 'bold', marginRight: "10px" }}>การยืนยันชำระเงิน:</h4>
                                                                                                    <span className='fs-6'>ชำระเงินเรียบร้อยแล้ว</span>
                                                                                                </div>
                                                                                            }
                                                                                        </div>
                                                                                    </>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-danger py-2 px-4" data-bs-dismiss="modal" onClick={reload_page}>ปิด</button>
                                                                            <button type="button" className="btn btn-warning py-2 px-4">ยืนยัน</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                        : //if it occurred Let's show the component below
                                                        <>
                                                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title" id="exampleModalLabel">แจ้งเตือน</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <div className="d-sm-flex align-items-center mt-2 justify-content-center"  ><h4 className=" fw-bold" style={{ color: "red" }} >{login_failed}</h4></div>
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-warning py-2 px-5" data-bs-dismiss="modal" onClick={reload_page}>ปิด</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </>


                                                    }
                                                </form>


                                            </div>
                                            <div>
                                            </div>




                                        </div>
                                    </div>
                                </div>
                                {/* content-wrapper ends */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login_user