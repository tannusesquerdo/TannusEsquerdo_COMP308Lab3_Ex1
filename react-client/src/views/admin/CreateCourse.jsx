import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const location = useLocation();
  const { course: data, edit } = location?.state || {};
  const { courseId } = useParams();
  const [course, setCourse] = useState({ 
    _id: data?._id || '', 
    courseCode: data?.courseCode || '',  
    courseName: data?.courseName || '',  
    section: data?.section || '',
    semester: data?.semester || '',
  });
  const apiUrl = edit ? `/api/courses/${courseId}` : "/api/courses";

  const saveCourse = (e) => {
    e.preventDefault();
    const data = {
      courseCode: course.courseCode, 
      courseName: course.courseName, 
      section: course.section,
      semester: course.semester,
    };
    
    if (!edit) {
      axios.post(apiUrl, data)
        .then((result) => {
          toast.success('Course created successfully');
          navigate('/admin/courses')
      })
    } else {
      axios.put(apiUrl, data)
        .then((result) => {
          toast.success('Course edited successfully');
          navigate('/admin/courses')
      })
    }
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
            <strong>{`${edit ? 'Edit' : 'Create'} a Course`}</strong>
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
                {`${edit ? 'Update' : 'Save'} Course`}
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
