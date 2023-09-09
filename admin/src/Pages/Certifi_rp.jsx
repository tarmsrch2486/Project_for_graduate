import axios from 'axios'
import { useState, useEffect } from 'react'

//Components
import Sidebar from '../components/Sidebar'
import Navbar_admin from '../components/Navbar_admin'
import Footer_admin from '../components/Footer_admin'

import BounceLoader from 'react-spinners/BounceLoader'
import { NavLink, Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import { font } from '../assets/Fonts/THSarabun-normal'
import { fontBold } from '../assets/Fonts/THSarabun Bold-bold'
function Certifi_rp() {

    const [display_user, setDisplay_user] = useState([])
    const [rt_text, setRT_text] = useState("")
    const [show_permission, setShow_permission] = useState(null)
    const [change_m, setChange_m] = useState("")
    const [data_status, setData_status] = useState()

    //Logout and Clear a localStorage
    const handleLogout = () => {
        localStorage.clear()
        window.location = '/'
    }


    const Export_pdf = () => {
        const doc = new jsPDF()

        doc.addFileToVFS("Font.ttf", font)
        doc.addFont("Font.ttf", "Font", "normal")
        doc.setFont("Font")

        doc.addFileToVFS("MyFont.ttf", fontBold)
        doc.addFont("MyFont.ttf", "MyFont", "normal")
        doc.setFont("MyFont")

        let width = doc.internal.pageSize.getWidth()
        doc.text(`ข้อมูลเกียรติบัตรผู้ที่ผ่านการสอบ วันที่ 8 มีนาคม 2566 ณ ห้องปฏิบัติการคอมพิวเตอร์ 2101`, width / 2, 15, { align: 'center' })

        const data = display_user.map((val) => [
            val.reg_id,
            val.prefix,
            val.name,
            val.lastname,
            val.kn_score,
            val.profi_score,
            val.sum_score,
            val.pass_fail,
        ])

        const contents = {
            startY: 25,
            headStyles: { fillColor: [255, 255, 255], lineWidth: 0.1, font: 'MyFont', fontSize: 12},
            theme: 'grid',
            head: [
                [
                    "รหัสสมัครสอบ",
                    "คำนำหน้า",
                    "ชื่อ",
                    "นามสกุล",
                    "คะแนนภาคความรู้ 30 คะแนน",
                    "คะแนนภาคความสามารถ 70 คะแนน",
                    "รวมคะแนน",
                    "เกณฑ์กรมพัฒนาฯ 70%",
                ]
            ],
            body: data,
            styles: { font: 'Font', halign: 'center', textColor: [0, 0, 0] },
            bodyStyles: { lineWidth: 0.1, }
        }

        doc.autoTable(contents)
        doc.save("ข้อมูลเกียรติบัตรผู้ที่ผ่านการสอบ.pdf")
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
        const get_users = async () => {
            const get_data_as = await axios.get(`http://localhost:3000/certifi_rp/${change_m}`)
            setDisplay_user(await get_data_as.data)
        }
        get_users()

    }, [change_m, data_status])



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
                                    <button onClick={Export_pdf} className="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm p-2 fs-6">
                                        <svg style={{ marginRight: "10px" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                                            <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                                            <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                        </svg>
                                        ออกรายงาน
                                    </button>
                                    <h3 className="m-0 font-weight-bold text-primary"></h3>
                                </div>
                                <div className="card-body">
                                    <h1 style={{ textAlign: 'center', fontWeight: "bold", color: "blue" }}>รายงานข้อมูลเกียรติบัตรผู้ที่ผ่านการสอบ ประจำเดือนที่ {change_m}</h1>

                                    <div className="table-responsive">
                                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_length" id="dataTable_length">
                                                        <label>ข้อมูลประจำเดือน
                                                            <select onChange={(e) => setChange_m(e.target.value)} name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm">
                                                                <option value="1">มกราคม</option>
                                                                <option value="2">กุมภาพันธ์</option>
                                                                <option value="3">มีนาคม</option>
                                                                <option value="4">เมษายน</option>
                                                                <option value="5">พฤษภาคม</option>
                                                                <option value="6">มิถุนายน</option>
                                                                <option value="7">กรกฎาคม</option>
                                                                <option value="8">สิงหาคม</option>
                                                                <option value="9">กันยายน</option>
                                                                <option value="10">ตุลาคม</option>
                                                                <option value="11">พฤศจิกายน</option>
                                                                <option value="12">ธันวาคม</option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6">
                                                    {/* Real-time search */}
                                                    <div id="dataTable_filter" className="dataTables_filter" style={{ display: 'flex', justifyContent: "end" }}>
                                                        <label>ค้นหา: รหัสสอบและชื่อ
                                                            <input type="search" className="form-control form-control-sm" placeholder
                                                                aria-controls="dataTable" onChange={(e) => setRT_text(e.target.value)} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* There's no data */}
                                            {display_user.length < 1 &&
                                                <div style={{ display: "flex", justifyContent: 'center', alignContent: 'center' }}>
                                                    <BounceLoader color="#36d7b7" />
                                                </div>
                                            }

                                            {/* show data if data showed */}
                                            {display_user.length > 0 &&
                                                <div className="row"><div className="col-sm-12">
                                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                                                        <thead>
                                                            <tr role="row" style={{ textAlign: "center" }}>
                                                                <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '73.2px' }}>ลำดับ</th>
                                                                <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '300px' }}>หลักสูตร</th>
                                                                <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '300px' }}>ชื่อ</th>
                                                                <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: '300px' }}>นามสกุล</th>
                                                                <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '600px' }}>คะแนนภาคความรู้</th>
                                                                <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '600px' }}>คะแนนภาคความสามารถ</th>
                                                                <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '600px' }}>คะแนนทดสอบรวม</th>
                                                                <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Start date: activate to sort column ascending" style={{ width: '600px' }}>ผลการทดสอบ</th>
                                                                <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '130px' }}>วันที่สมัคร</th>
                                                                <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Salary: activate to sort column ascending" style={{ width: '600px' }}>เกณฑ์กรมพัฒนาฯ 70%</th>
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
                                                                            <td>{items.name}</td>
                                                                            <td>{items.lastname}</td>
                                                                            <td>{items.kn_score}</td>
                                                                            <td>{items.profi_score}</td>
                                                                            <td>{items.sum_score}</td>
                                                                            <td>{items.pass_fail}</td>
                                                                            <td>{items.Thaibirthday}</td>
                                                                            <td style={{ color: 'green', textDecoration: 'underline' }}> รับวุฒิบัตร
                                                                            </td>

                                                                        </tr>
                                                                    </>
                                                                )
                                                            })}


                                                        </tbody>
                                                    </table>
                                                </div>
                                                </div>
                                            }

                                            <div className="row mt-5">
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

export default Certifi_rp