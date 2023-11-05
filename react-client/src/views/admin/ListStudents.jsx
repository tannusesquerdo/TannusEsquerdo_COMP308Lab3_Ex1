import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
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
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
//
// this component is used to list all articles
function ListStudents(props) {
  let navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const apiUrl = `/api/students`;

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          //check if the user has logged in
          if(result.data.screen !== 'auth')
          {
            setStudents(result.data);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
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
                  <CTableRow key={student._id}>
                    <CTableHeaderCell>{`#${student.studentNumber}`}</CTableHeaderCell>
                    <CTableHeaderCell>{student.firstName}</CTableHeaderCell>
                    <CTableHeaderCell>{student.lastName}</CTableHeaderCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
            <ListGroup>
              
            </ListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
//
export default ListStudents;
