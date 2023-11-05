import React, {useEffect, useState} from 'react'
import axios from 'axios'
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

const EnrollCourse = ({ visible, setVisible, updateCourses }) => {
  const userId = useSelector(state => state.id);
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      axios.get('/api/courses')
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
  }, [])

  const addCourse = (courseID) => {
    axios.post(`/api/courses/${courseID}/students/${userId}`)
      .then((result) => {
        toast.success('Course added successfully');
        setVisible(false);
        updateCourses(result.data);
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
          <CTable bordered>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell scope="col">Course Name</CTableHeaderCell>
                <CTableHeaderCell></CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {courses.map((course) => (
                <CTableRow key={course._id}>
                  <CTableHeaderCell>{`${course.courseCode} - ${course.courseName}`}</CTableHeaderCell>
                  <CTableHeaderCell>
                    <CButton color="primary" onClick={() => addCourse(course._id)}>Enroll</CButton>
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
