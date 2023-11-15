/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { 
  CButton, 
  CModal, 
  CModalHeader, 
  CModalTitle, 
  CModalBody, 
  CModalFooter,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
 } from '@coreui/react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_COURSES } from '../graphql/queries';
import { ENROLL_COURSE } from '../graphql/mutations';

const EnrollCourse = ({ visible, setVisible, updateCourses }) => {
  const userId = useSelector(state => state.auth.id);
  const [courses, setCourses] = useState([])
  const { data, loading, error } = useQuery(GET_COURSES);
  
  const [enrollCourse] = useMutation(ENROLL_COURSE, {
    refetchQueries: [
      {
        query: GET_COURSES,
      },
    ],
  })

  useEffect(() => {
    const fetchData = async () => {
      if(data && !loading && !error) {
        try {
          const { courses } = data;
          if(courses.length > 0) {
            const filteredCourses = courses.filter(course => !course.students.map(student => student.id).includes(userId));
            setCourses(filteredCourses);
          }
        }
        catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
  }, [data, loading, error, userId])

  const addCourse = (courseId) => {
    enrollCourse({
      variables: {
        courseId,
        studentId: userId
      }
    }).then((result) => {
      toast.success('Course added successfully');
      setVisible(false);
      updateCourses(result.data.enrollCourse);
    }).catch((error) => {
      console.log(error);
      toast.error(error.message);
    })
  }

  return (
    <>
      <CModal
        visible={visible}
        scrollable
        backdrop="static"
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Enroll Course</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CTable align="middle" bordered>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">Course Name</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {courses.map((course) => (
                <CTableRow key={course.id}>
                  <CTableHeaderCell>{`${course.courseCode} - ${course.courseName}`}</CTableHeaderCell>
                  <CTableHeaderCell>
                    <CButton color="secondary" onClick={() => addCourse(course.id)}>Enroll</CButton>
                  </CTableHeaderCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default EnrollCourse
