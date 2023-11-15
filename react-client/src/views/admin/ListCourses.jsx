import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COURSES } from '../../graphql/queries';


const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [currentStudents, setCurrentStudents] = useState([]);
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_COURSES);

  useEffect(() => {
    const fetchData = async () => {
      if(data && !loading && !error) {
        try {
          const { courses } = data;
          if(courses.length > 0) {
            setCourses(courses);
          }
        }
        catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
  }, [data, loading, error]);

  const showStudentsModal = (students) => {
    setCurrentStudents(students);
    setShowStudents(true);
  }

  const hideModal = () => {
    setShowStudents(false);
    setCurrentStudents([]);
  }

  const editCourse = (course) => {
    navigate(`/admin/courses/${course.id}/edit`, { state: { course, edit: true } });
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
                  <CTableRow key={course.id}>
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
