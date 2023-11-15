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
  CButton
} from '@coreui/react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import EnrollCourse from './EnrollCourse';
import { useMutation, useQuery } from '@apollo/client';
import { GET_STUDENT_COURSES } from '../graphql/queries';
import { DROP_COURSE } from '../graphql/mutations';
//
// this component is used to list all articles
const ListCourses = () => {
  const userId = useSelector(state => state.auth.id)
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { data, loading, error } = useQuery(GET_STUDENT_COURSES, {
    variables: {
      id: userId
    },
    skip: !userId
  });

  const [dropCourseMutation] = useMutation(DROP_COURSE, {
    variables: {
      studentId: userId,
      courseId: ''
    },
    refetchQueries: {
      query: GET_STUDENT_COURSES,
      variables: {
        id: userId
      }
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      if(data && !loading && !error) {
        try {
          const { studentCourses } = data;
          if(studentCourses.length > 0) {
            setCourses(studentCourses);
          }
        }
        catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
  }, [data, loading, error]);
  

  const updateCourses = (course) => {
    setCourses(prevCourses => [...prevCourses, course]);
  }

  const dropCourse = (courseID) => {
    dropCourseMutation({
      variables: {
        courseId: courseID
      }
    }).then(() => {
      toast.success('Course dropped successfully');
      setCourses(prevCourses => prevCourses.filter(courses => courses.id !== courseID));
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
                  <CTableRow key={course.id}>
                    <CTableHeaderCell>{course.courseCode}</CTableHeaderCell>
                    <CTableHeaderCell>{course.courseName}</CTableHeaderCell>
                    <CTableDataCell>{course.section}</CTableDataCell>
                    <CTableDataCell>{course.semester}</CTableDataCell>
                    <CTableDataCell>
                      <CButton size='sm' color="danger" onClick={() => dropCourse(course.id)}>Drop Course</CButton>
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
