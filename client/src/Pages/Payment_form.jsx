import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Payment_form() {

    const { id } = useParams()
    const [img, setImg] = useState()

    const handleImg = (e) => {
        setImg(e.target.files[0])
    }

    const paid = () => {
        if (confirm("คุณต้องการบันทึกข้อมูลหรือไม่")) {
            const formdata = new FormData
            formdata.append("image", img)
            axios.put(`http://localhost:3000/payment/${id}`, formdata).then((res) => {
                if (res.status == 'true') {
                    alert("บันทึกข้อมูลเสร็จสิ้น")
                    window.location = '/login_user'
                } else {
                    return false
                }
            })
        } else {
            return false
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/check_payment/${id}`).then((res) => {
            console.log(res)
        })
    }, [])

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="home-tab">
                            <div className="d-sm-flex align-items-center justify-content-between border-bottom">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active ps-0" id="home-tab" data-bs-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true" style={{ fontWeight: "bolder", fontSize: "16px" }}>ข้อมูลการชำระเงิน Payment</a>
                                    </li>

                                </ul>
                                <div>

                                </div>
                            </div>
                            <div className="tab-content tab-content-basic">
                                <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className='card'>
                                                <div className="card-body">
                                                    <h4 className="card-title text-center">การชำระเงิน</h4>
                                                    <p className="card-description text-center">
                                                        การชำระเงิน
                                                    </p>
                                                    <h3>สถานะ: <span><a className='btn-warning' style={{ textDecoration: "none", padding: "5px", borderRadius: "5px" }}> asd </a></span></h3>
                                                    <hr />
                                                    <h3>ข้อมูลผู้สมัครสอบ: </h3>
                                                    <div className="row justify-content-center">
                                                        <div className="col-4">
                                                            One of two columns
                                                        </div>
                                                        <div className="col-4">
                                                            One of two columns
                                                        </div>
                                                    </div>

                                                    <hr />

                                                    <form className="forms-sample">
                                                        <h3>ชำระเงิน: </h3>
                                                        <div className="row justify-content-center">
                                                            <div className="col-4">
                                                                <h4 className='mt-4'>เลขที่บัญชี: </h4>
                                                            </div>
                                                            <div className="col-4">
                                                                <h4 className='mt-4'>แนบหลักฐานการชำระเงิน: </h4>
                                                                <input type="file" onChange={handleImg} className="form-control py-2" id="customFile" />
                                                            </div>

                                                        </div>


                                                        <button type="button" onClick={paid} className="btn btn-primary px-5">ชำระเงิน</button>
                                                    </form>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* content-wrapper ends */}
            {/* partial:partials/_footer.html */}
            <footer className="footer">
                <div className="d-sm-flex justify-content-center justify-content-sm-between">
                    <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash.</span>
                    <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Copyright © 2021. All rights reserved.</span>
                </div>
            </footer>
            {/* partial */}
        </div>
    )
}

export default Payment_form