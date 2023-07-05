import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import { Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

function Form_register() {
  const [id_card, setId_card] = useState("")
  const [name_lastnameTH, setName_lastnameTH] = useState("")
  const [name_lastnameEN, setName_lastnameEN] = useState("")
  const [gender, setGender] = useState("")
  const [permission, setPermission] = useState("")
  const [receipt, setReceipt] = useState("")
  const [dp_province, setDp_province] = useState("")
  const [dp_amphure, setDp_amphure] = useState("")
  const [dp_district, setdp_district] = useState("")
  const [course, setCourse] = useState("")
  const [candidate, setCandidate] = useState("")
  const [prefix, setPrefix] = useState("")
  const [nationality, setNationality] = useState("")
  const [birthday, setBirthday] = useState(new Date());
  const [tel, setTel] = useState("")
  const [address, setAddress] = useState("")
  const [educational, setEducational] = useState("")
  const [branch, setBranch] = useState("")
  const [email, setEmail] = useState("")

  //DatePicker
  // const [startDate, setStartDate] = useState(new Date());
  // const years = range(1990, getYear(new Date()) + 1, 1);
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  //Usenavigate
  const navigate = useNavigate()
  const [debug_data, setDebug_data] = useState(false)
  const [style_modal, setStyle_modal] = useState("modal")
  const [provinces, setProvinces] = useState([])
  const [amphure, setAmphure] = useState([])
  const [district, setDistrict] = useState([])

  //For get_provinces and amphures
  const [province_id, setProvince_id] = useState("")
  const [amphure_id, setAmphure_id] = useState("")
  const [district_id, setDistrict_id] = useState("")
  const [show_provinces, setShow_provinces] = useState([])
  const [show_amphures, setShow_amphures] = useState([])
  const [show_district, setShow_district] = useState([])


  const check_debug = () => {

    // if (!id_card || !name || !lastname || !province || !gender || !religion) {
    //   setDebug_data(true)
    //   setStyle_modal("")
    //   return false
    // } else {
    //   setStyle_modal("modal")
    //   setDebug_data(false)

    // }
  }

  const add_member = () => {
    axios.post("http://localhost:3000/add_member", {
      reg_id: "",
      id_card: id_card,
      name_lastnameTH: name_lastnameTH,
      name_lastnameEN: name_lastnameEN,
      province: province_id,
      amphure: amphure_id,
      district: district_id,
      gender: gender,
      status: "as",
      permission: "รอชำระเงิน",
      receipt: "sa",
      course: course,
      candidate: candidate,
      prefix: prefix,
      nationality: nationality,
      birthday: birthday,
      tel: tel,
      email: email,
      address: address,
      educational: educational,
      branch: branch,
    })
  }


  const handle_province = (e) => {
    setProvince_id(e.target.value)
  }

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

  console.log(birthday)

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">

          <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title" style={{ textAlign: "center" }}>สมัครเข้ารับการอบรมฝีมือแรงงานและทดสอบมาตรฐานฝีมือแรงงาน</h4>
                <p className="card-description" style={{ textAlign: "center" }}>
                  สำหรับการลงทะเบียนสมาชิก
                </p>
                <form className="forms-sample">

                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>หลักสูตรอบรม <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setCourse(e.target.value)}>
                        <option select>กรุณาเลือกหลักสูตร (ฝึกอบรม)</option>
                        <option value="สาขาพนักงานการใช้คอมพิวเตอร์(ประมวลผลคำ)">สาขาพนักงานการใช้คอมพิวเตอร์ (ประมวลผลคำ)</option>
                        <option value="สาขาพนักงานการใช้คอมพิวเตอร์(ตารางทำการ)">สาขาพนักงานการใช้คอมพิวเตอร์ (ตารางทำการ)</option>
                      </select>
                      {debug_data
                        ? <p className="text-danger mt-2">กรุณาป้อนเลขบัตรประจำตัวประชาชน *</p>
                        : null}
                    </div>
                  </div>



                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>ประเภทผู้สมัครสอบ (ทดสอบ) <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">

                      <select className="form-select" aria-label="Default select example" onChange={(e) => setCandidate(e.target.value)}>
                        <option select>กรุณาเลือกประเภทผู้สมัครสอบ</option>
                        <option value="ผู้รับการฝึกจาก กพร.">ผู้รับการฝึกจาก กพร.</option>
                        <option value="จากสถานศึกษา">จากสถานศึกษา</option>
                        <option value="จากภาครัฐ">จากภาครัฐ</option>
                        <option value="จากภาคเอกชน">จากภาคเอกชน</option>
                        <option value="บุคคลทั่วไป">บุคคลทั่วไป</option>
                      </select>
                      {debug_data
                        ? <p className="text-danger mt-2">กรุณาป้อนเลขบัตรประจำตัวประชาชน *</p>
                        : null}
                    </div>
                  </div>

                  <hr />

                  <h5 className="card-title">1. ข้อมูลส่วนบุคคล</h5>
                  {/* Prefix */}
                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>คำนำหน้าชื่อ <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setPrefix(e.target.value)}>
                        <option select>กรุณาเลือกคำนำหน้า</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                      </select>
                    </div>
                  </div>


                  {/* name and lastname TH*/}
                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>ชื่อ-สกุล ภาษาไทย(TH) <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="exampleInputUsername2" placeholder="ชื่อ-สกุล ภาษาไทย"
                        onChange={(e) => setName_lastnameTH(e.target.value)} />
                    </div>
                  </div>

                  {/* gender */}
                  <div className="form-group row">
                    <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>เพศ <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                        <option select>กรุณาเลือกเพศ</option>
                        <option value="ชาย">ชาย</option>
                        <option value="หญิง">หญิง</option>
                      </select>
                      {debug_data
                        ? <p className="text-danger mt-2">กรุณาเลือกเพศ *</p>
                        : null}
                    </div>

                  </div>


                  {/* name and lastname */}
                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>ชื่อ-สกุล ภาษาอังกฤษ(EN)<span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="exampleInputUsername2" placeholder="ชื่อ-สกุล ภาษาอังกฤษ"
                        onChange={(e) => setName_lastnameEN(e.target.value)} />
                    </div>
                  </div>


                  {/* id_card */}
                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>เลขบัตรประจำตัวประชาชน <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="exampleInputUsername2" placeholder="เลขบัตรประจำตัวประชาชน"
                        onChange={(e) => setId_card(e.target.value)} />
                      {debug_data
                        ? <p className="text-danger mt-2">กรุณาป้อนเลขบัตรประจำตัวประชาชน *</p>
                        : null}
                    </div>
                  </div>



                  {/* id_card */}
                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>สัญชาติ <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="exampleInputUsername2" placeholder="สัญชาติ"
                        onChange={(e) => setNationality(e.target.value)} />
                      {debug_data
                        ? <p className="text-danger mt-2">สัญชาติ *</p>
                        : null}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>วัน เดือน ปี (เกิด คศ. เท่านั้น) <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <p>เดือน / วัน / ปีเกิด (สามารถพิมพ์ได้)</p>
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={birthday}
                        onChange={(date) => setBirthday(date)}
                        isClearable
                        placeholderText="กรุณาใส่ วัน เดือน ปีเกิด"
                        className='form-control'
                      />
                    </div>
                  </div>


                  {/* Tel */}
                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>โทรศัพท์ <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="exampleInputUsername2" placeholder="โทรศัพท์"
                        onChange={(e) => setTel(e.target.value)} />

                    </div>
                  </div>


                  {/* Email */}
                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>อีเมลล์ (ถ้ามี)</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="exampleInputUsername2" placeholder="อีเมลล์ (ถ้ามี)"
                        onChange={(e) => setEmail(e.target.value)} />

                    </div>
                  </div>


                  {/* Address */}
                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>ที่อยู่ตามทะเบียนบ้าน/ที่อยู่ตามบัตรประชาชน <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }} defaultValue={""}  onChange={(e) => setAddress(e.target.value)} />
                        <label htmlFor="floatingTextarea2">ที่อยู่ตามทะเบียนบ้าน/ที่อยู่ตามบัตรประชาชน</label>
                      </div>
                    </div>
                  </div>








                  <div className="form-group row">
                    <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>จังหวัด <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <select className="form-select" aria-label="Default select example" onChange={(e) => handle_province(e)} >
                        <option select>จังหวัด</option>
                        {show_provinces.map((val) => {
                          return (
                            <option key={val.id} value={val.id}>{val.name_th}</option>
                          )
                        })}
                      </select>
                      {debug_data
                        ? <p className="text-danger mt-2">จังหวัด *</p>
                        : null}

                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>อำเภอ <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setAmphure_id(e.target.value)}>
                        <option select>อำเภอ</option>
                        {show_amphures.map((val) => {
                          return (
                            <option key={val.id} value={val.id}>{val.name_th}</option>
                          )
                        })}
                      </select>
                      {debug_data
                        ? <p className="text-danger mt-2">อำเภอ *</p>
                        : null}

                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>แขวง/ตำบล <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setDistrict_id(e.target.value)}>
                        <option select>แขวง/ตำบล</option>
                        {show_district.map((val) => {
                          return (
                            <option key={val.id} value={val.id}>{val.name_th}</option>
                          )
                        })}
                      </select>
                      {debug_data
                        ? <p className="text-danger mt-2">แขวง/ตำบล *</p>
                        : null}

                    </div>
                  </div>


                  <div className="form-group row">
                    <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>วุฒิการศึกษาสูงสุด <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <select className="form-select" aria-label="Default select example" onChange={(e) => setEducational(e.target.value)}>
                        <option select>กรุณาเลือกวุฒิการศึกษาสูงสุด</option>
                        <option value="ประถมศึกษา">ประถมศึกษา</option>
                        <option value="มัธยมต้น">มัธยมต้น</option>
                        <option value="มัธยมปลาย">มัธยมปลาย</option>
                        <option value="อนุปริญญา"> อนุปริญญา</option>
                        <option value="ปวช.">ปวช.</option>
                        <option value="ปวส./ปวท.">ปวส./ปวท.</option>
                        <option value="ปริญญาตรีขึ้นไป">ปริญญาตรีขึ้นไป</option>
                        <option value="ไม่จบการศึกษา">ไม่จบการศึกษา</option>
                      </select>
                      {debug_data
                        ? <p className="text-danger mt-2">กรุณาเลือกศาสนา *</p>
                        : null}
                    </div>
                  </div>


                  {/* สาขา */}
                  <div className="form-group row">
                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label" style={{ fontWeight: "bolder" }}>สาขา <span style={{ color: "red" }}>*</span></label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" id="exampleInputUsername2" placeholder="สาขา"
                      onChange={(e) => setBranch(e.target.value)}
                      />

                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>

                    <button className="btn btn-warning py-3" type="button" data-bs-toggle={style_modal} data-bs-target="#exampleModal" onClick={check_debug}>ยืนยันข้อมูล</button>
                    {debug_data
                      ? null
                      : (
                        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">แจ้งเตือน</h5>
                                <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" />
                              </div>
                              <div className="modal-body">ต้องการยืนยันการสมัครมาชิกใช่หรือไม่</div>
                              <div className="modal-footer"><button className="btn btn-secondary" type="button" data-bs-dismiss="modal">ยกเลิก</button><button className="btn btn-primary" type="button" data-bs-dismiss="modal" onClick={add_member}>ตกลง</button></div>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    <button className="btn btn-light px-4 py-3">Cancel</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Form_register