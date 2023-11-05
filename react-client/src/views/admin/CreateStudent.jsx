import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput
} from '@coreui/react'
import { toast } from 'react-toastify';

const CreateStudent = () => {
  let navigate = useNavigate()
  //
  const [user, setUser] = useState({ 
    studentNumber: '', 
    firstName: '', 
    lastName: '', 
    email: '',
    password: '' 
  });
  const apiUrl = '/api/students/create';

  const saveUser = (e) => {
    e.preventDefault();
    const data = { 
      studentNumber: user.studentNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };
      //use promises
      axios.post(apiUrl, data)
        .then((result) => {
          toast.success('Student created successfully');
          navigate('/admin/students')
        })
        .catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setUser({...user, [e.target.name]: e.target.value});
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Create Student</strong>
          </CCardHeader>
          <CCardBody>
      
            <CForm onSubmit={saveUser}>
              <div className="mb-3">
                <CFormLabel htmlFor='studentNumber'>Student Number</CFormLabel>
                <CFormInput type="text" name="studentNumber" id="studentNumber" placeholder="Enter Student Number" value={user.studentNumber} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='firstName'> First Name</CFormLabel>
                <CFormInput type="text" name="firstName" id="firstName" placeholder="Enter first name" value={user.firstName} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='lastName'> Last Name</CFormLabel>
                <CFormInput type="text" name="lastName" id="lastName" placeholder="Enter last name" value={user.lastName} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='email'>Email</CFormLabel>
                <CFormInput type="text" name="email" id="email" rows="3" placeholder="Enter email" value={user.email} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='password'>Password</CFormLabel>
                <CFormInput type="password" name="password" id="password" placeholder="Enter password" value={user.password} onChange={onChange} />
              </div>

              <Button variant="primary" type="submit">
                Save Student
              </Button>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
//
export default CreateStudent;
