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
  CButton,
  CBadge
} from '@coreui/react'
import ModalStudents from './ModalStudents';


const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [currentStudents, setCurrentStudents] = useState([]);
  const apiUrl = `/api/courses`;

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

  const showStudentsModal = (students) => {
    setCurrentStudents(students);
    setShowStudents(true);
  }

  const hideModal = () => {
    setShowStudents(false);
    setCurrentStudents([]);
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All Courses</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Course</CTableHeaderCell>
                <CTableHeaderCell scope="col">Section</CTableHeaderCell>
                <CTableHeaderCell scope="col">Semester</CTableHeaderCell>
                <CTableHeaderCell scope="col">Students</CTableHeaderCell>
              </CTableRow>
              </CTableHead>
              <CTableBody>
                {courses.map((course) => (
                  <>
                  <CTableRow key={course._id}>
                    <CTableHeaderCell>{course.courseCode}</CTableHeaderCell>
                    <CTableHeaderCell>{course.courseName}</CTableHeaderCell>
                    <CTableDataCell>{course.section}</CTableDataCell>
                    <CTableDataCell>{course.semester}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge className='mx-2' color="secondary">{course.students.length}</CBadge>
                      <CButton size='sm' color='light' onClick={() => showStudentsModal(course.students)}>View</CButton></CTableDataCell>
                  </CTableRow>
                  </>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <ModalStudents visible={showStudents} setVisible={hideModal} students={currentStudents} />
    </CRow>
  );
}
//
export default ListCourses;
