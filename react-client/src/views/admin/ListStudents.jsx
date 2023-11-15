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
  CTableRow
} from '@coreui/react'
import { useQuery } from '@apollo/client';
import { GET_STUDENTS } from '../../graphql/queries';
//
// this component is used to list all articles
function ListStudents() {
  const [students, setStudents] = useState([]);
  const { data, loading, error } = useQuery(GET_STUDENTS);

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
  }, []);

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
              </CTableRow>
              </CTableHead>
              <CTableBody>
                {students.map((student) => (
                  <CTableRow key={student.id}>
                    <CTableHeaderCell>{`#${student.studentNumber}`}</CTableHeaderCell>
                    <CTableHeaderCell>{student.firstName}</CTableHeaderCell>
                    <CTableHeaderCell>{student.lastName}</CTableHeaderCell>
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
