import React from 'react'
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import { font } from "../assets/Fonts/THSarabun-normal"


//Components
import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'
import Test_pdf_file from '../Pages/Test_pdf_file'

import { NavLink, Link } from 'react-router-dom'

//About export a report
import { useReactToPrint } from "react-to-print"
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer"
import { PDFDownloadLink } from '@react-pdf/renderer'
import jsPDF from 'jspdf'
import { autoTable } from 'jspdf-autotable'


function Content_admin() {

    const componentPDF = useRef()
    const [display_user, setDisplay_user] = useState([])
    const [rt_text, setRT_text] = useState("")
    const [show_permission, setShow_permission] = useState(null)
    const [post, setPost] = useState([])
    const [fake_data, setFake_data] = useState([])
    const [hide_idcard, setHide_idcard] = useState("")
    const permission = localStorage.getItem('permission')



    //Export to pdf and set as Thai language
    const exportPDF = () => {
        const doc = new jsPDF()
        //add the font
        doc.addFileToVFS("Font.ttf", font)
        doc.addFont("Font.ttf", "Font", "normal")
        doc.setFont("Font")

        let width = doc.internal.pageSize.getWidth()

        doc.text(`ใบสรุปการทดสอบมาตรฐานฝีมือแรงงานแห่งชาติ สาขา พนักงานการใช้คอมพิวเตอร์ (ตารางทำการ) 
        วันที่ 8 มีนาคม 2566 ณ ห้องปฏิบัติการคอมพิวเตอร์ 2101`, width / 2, 10, { align: 'center' })

        const data = display_user.map((val) => [
            val.reg_id,
            val.course,
            val.candidate,
            val.prefix,
            val.name,
            val.lastname,
            val.nationality,
            val.Thaibirthday,
            val.gender,
        ])
        const contents = {
            startY: 25,
            headStyles: { fontSize: "14" },
            head: [
                [
                    "รหัสสมัครสอบ",
                    "หลักสูตร",
                    "ประเภทผู้สมัครทดสอบ",
                    "คำนำหน้า",
                    "ชื่อ",
                    "นามสกุล",
                    "สัญชาติ",
                    "วันเกิด",
                    "เพศ",
                ]
            ],
            body: data,
            styles: { font: 'Font' },
            bodyStyles: { lineWidth: 0.1 }
        }

        doc.autoTable(contents)
        doc.save("รายชื่อผู้สมัครสอบ.pdf")
    }





    //Logout and Clear a localStorage
    const handleLogout = () => {
        localStorage.clear()

        window.location = '/'
    }


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

    console.log(display_user)
    return (
        <>
            {/* Page Wrapper */}
            <div id="wrapper">

                {/* Sidebar-admin */}
                < Sidebar />

                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    
                    <Navbar_admin prop={permission} />

                    {/* Main Content */}
                    <div id="content">
                        <div className="container-fluid" >

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    {/* <h3 className="m-0 font-weight-bold text-primary">ข้อมูลผู้เข้าร่วมการสอบ</h3> */}
                                    {/* ออก Report */}
                                    <button onClick={exportPDF} className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                        <svg style={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                        </svg>
                                        ออกรายงาน
                                    </button>
                                </div>

                                <div className="card-body">
                                    <h1 style={{ textAlign: 'center', fontWeight: "bold", color: "blue" }}>ข้อมูลผู้สมัครสอบ</h1>
                                    <div className="table-responsive">
                                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-12" style={{ textAlign: 'center' }}>
                                                </div>

                                            </div>


                                            <div className="row"><div className="col-sm-12">



                                                {/* Real-time search */}
                                                <div id="dataTable_filter" className="dataTables_filter" style={{ display: 'flex', justifyContent: "end" }}>
                                                    <label>ค้นหา: เลขบัตรปชชและชื่อ
                                                        <input type="search" className="form-control form-control-sm" placeholder
                                                            aria-controls="dataTable" onChange={(e) => setRT_text(e.target.value)} />
                                                    </label>
                                                </div>



                                                <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                                    <thead>
                                                        <tr role="row" style={{ textAlign: "center" }}>
                                                            <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '100px' }}>รหัสสอบ</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>หลักสูตร</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '150px' }}>ประเภทผู้สมัครทดสอบ</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '50px' }}>คำนำหน้า</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '100px' }}>ชื่อ</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '100px' }}>นามสกุล</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '100px' }}>สัญชาติ</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Age: activate to sort column ascending" style={{ width: '100px' }}>วันเกิด</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '70.2px' }}>เพศ</th>
                                                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '130px' }}>สิทธิ์การเข้าถึง</th>
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
                                                                        <td>{items.name}</td>
                                                                        <td>{items.lastname}</td>
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

export default Content_admin