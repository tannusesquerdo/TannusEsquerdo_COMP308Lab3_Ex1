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
  CButton,
  CBadge
} from '@coreui/react'
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_STUDENTS } from '../../graphql/queries';
import { DELETE_STUDENT } from '../../graphql/mutations';
// 
// this component is used to list all articles
function ListStudents() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_STUDENTS);
  const [dropStudentMutation] = useMutation(DELETE_STUDENT);

  useEffect(() => {
    const fetchData = async () => {
      if(data && !loading && !error) {
        try {
          const { students } = data;
          if(students.length > 0) {
            setStudents(students);
          }
        }
        catch (e) {
          console.log(e);
        }
      }
    };  
    fetchData();
  }, [data, loading, error]);

  const changeStudent = (student) => {
    navigate(`/admin/students/${student.id}/edit`, { state: { student, edit: true } });
  }

  const dropStudent = (student) => {
    console.log('in dropStudent, student= ', student);
    dropStudentMutation({
      variables: {
        id: student.id
      }
    }).then(() => {
      toast.success('Student removed successfully');
      setStudents(prevStudents => prevStudents.filter(students => students.id !== student.id));
    }).catch((error) => {
      console.log(error);
      toast.error(error.message);
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All Students</strong>
          </CCardHeader>
          <CCardBody>
            <CTable bordered>
              <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell scope="col">#ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
              </CTableHead>
              <CTableBody>
                {students.map((student) => (
                  <CTableRow key={student.id}>
                    <CTableHeaderCell>{`#${student.studentNumber}`}</CTableHeaderCell>
                    <CTableHeaderCell>{student.firstName}</CTableHeaderCell>
                    <CTableHeaderCell>{student.lastName}</CTableHeaderCell>
                    <CTableHeaderCell>
                      <CButton size='sm' color='light' onClick={() => changeStudent(student)}>Edit</CButton>
                      <CButton className='mx-3' size='sm' color='danger' onClick={() => dropStudent(student)}>Delete</CButton>
                    </CTableHeaderCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
//
export default ListStudents;
