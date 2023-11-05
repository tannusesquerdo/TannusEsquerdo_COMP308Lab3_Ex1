import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel
} from '@coreui/react'
import { toast } from 'react-toastify';
// this component is used to create a new article
function CreateCourse(props) {
  let navigate = useNavigate();
  const [course, setCourse] = useState({ 
    _id: '', 
    courseCode: '', 
    courseName: '', 
    section: '',
    semester: '',
  });
  const apiUrl = "/api/courses"

  const saveCourse = (e) => {
    e.preventDefault();
    const data = {
      courseCode: course.courseCode, 
      courseName: course.courseName, 
      section: course.section,
      semester: course.semester,
    };
    //
    axios.post(apiUrl, data)
      .then((result) => {
        toast.success('Course created successfully');
        navigate('/admin/courses')
    })
  };
  //
  const onChange = (e) => {
    e.persist();   
    setCourse({...course, [e.target.name]: e.target.value});
  }
    
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create a Course</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={saveCourse}>
              <div className="mb-3">
                <CFormLabel htmlFor='courseCode'>Code</CFormLabel>
                <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter Course Code" value={course.courseCode} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='courseName'>Name</CFormLabel>
                <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter Course Name" value={course.courseName} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='section'>Section</CFormLabel>
                <Form.Control type="text" name="section" id="section" placeholder="Enter Course Section" value={course.section} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='semester'>Semester</CFormLabel>
                <Form.Control type="text" name="semester" id="semester" placeholder="Enter Course Semester" value={course.semester} onChange={onChange} />
              </div>
                            
              <Button variant="primary" type="submit">
                Save Course
              </Button>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
// 
export default CreateCourse;
