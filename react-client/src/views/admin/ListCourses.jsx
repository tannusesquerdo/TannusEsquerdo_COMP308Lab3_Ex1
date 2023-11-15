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
import { Link, Navigate, useNavigate } from 'react-router-dom';


const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [currentStudents, setCurrentStudents] = useState([]);
  const apiUrl = `/api/courses`;
  const navigate = useNavigate();

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

  const editCourse = (course) => {
    navigate(`/admin/courses/${course._id}/edit`, { state: { course, edit: true } });
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
                  <CTableRow key={course._id}>
                    <CTableHeaderCell>{course.courseCode}</CTableHeaderCell>
                    <CTableHeaderCell>{course.courseName}</CTableHeaderCell>
                    <CTableDataCell>{course.section}</CTableDataCell>
                    <CTableDataCell>{course.semester}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge className='mx-2' color="secondary">{course.students.length}</CBadge>
                      <CButton size='sm' color='light' onClick={() => showStudentsModal(course.students)}>View</CButton>
                      <CButton className='mx-3' size='sm' color='primary' onClick={() => editCourse(course)}>Edit</CButton>
                    </CTableDataCell>
                  </CTableRow>
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
