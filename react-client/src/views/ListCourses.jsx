import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton
} from '@coreui/react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import EnrollCourse from './EnrollCourse';
//
// this component is used to list all articles
const ListCourses = () => {
  const userId = useSelector(state => state.id)
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const apiUrl = `/api/students/${userId}/courses`;

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          //check if the user has logged in
          if(result.data.screen !== 'auth')
          {
            setCourses(result.data);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
      };  
    fetchData();
  }, []);

  const updateCourses = (course) => {
    setCourses(prevCourses => [...prevCourses, course]);
  }

  const dropCourse = (courseID) => {
    axios.delete(`/api/courses/${courseID}/students/${userId}`)
      .then((result) => {
        setCourses(prevCourses => prevCourses.filter(courses => courses._id !== courseID));
        toast.success('Course dropped successfully');
      }).catch((error) => {
        console.log(error);
        toast.error(error.message);
      })
  }

  return (
    <>
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>My Courses</strong>
          </CCardHeader>
          <CCardBody>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
              <CButton color="success" className="me-md-2" onClick={() => setShowModal(!showModal)}>Add Course</CButton>
            </div>
            <CTable>
              <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Course</CTableHeaderCell>
                <CTableHeaderCell scope="col">Section</CTableHeaderCell>
                <CTableHeaderCell scope="col">Semester</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
              </CTableRow>
              </CTableHead>
              <CTableBody>
                {courses.map((course) => (
                  <CTableRow key={course._id}>
                    <CTableHeaderCell>{course.courseCode}</CTableHeaderCell>
                    <CTableHeaderCell>{course.courseName}</CTableHeaderCell>
                    <CTableDataCell>{course.section}</CTableDataCell>
                    <CTableDataCell>{course.semester}</CTableDataCell>
                    <CTableDataCell>
                      <CButton size='sm' color="danger" onClick={() => dropCourse(course._id)}>Drop Course</CButton>
                    </CTableDataCell>
                </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <EnrollCourse visible={showModal} setVisible={setShowModal} updateCourses={updateCourses} />
    </>
  );
}
//
export default ListCourses;
