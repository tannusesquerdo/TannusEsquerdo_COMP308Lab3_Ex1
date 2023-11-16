import React, { useState } from 'react';
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
import { useMutation } from '@apollo/client';
import { ADD_STUDENT } from '../../graphql/mutations';
import { GET_STUDENTS } from '../../graphql/queries';

const CreateStudent = () => {
  let navigate = useNavigate()
  const [user, setUser] = useState({ 
    studentNumber: '', 
    firstName: '', 
    lastName: '', 
    email: '',
    password: '' 
  });
  const [addStudentMutation] = useMutation(ADD_STUDENT, {
    update(cache, { data: { addStudent } }) {
      const { students } = cache.readQuery({ query: GET_STUDENTS });
      cache.writeQuery({
        query: GET_STUDENTS,
        data: { students: [...students, addStudent] },
      });
    },
  })

  const saveUser = (e) => {
    e.preventDefault();
    const data = { 
      studentNumber: user.studentNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };
    
    addStudentMutation({
      variables: { ...data },
    }).then(() => {
      toast.success('Student created successfully');
      navigate('/admin/students')
    })
    .catch(() => console.log('Error'));
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
