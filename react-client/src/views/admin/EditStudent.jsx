import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_STUDENT } from '../../graphql/mutations';
import { GET_STUDENT } from '../../graphql/queries';

function UpdateStudent(props) {
  const [student, setStudent] = useState([]);
  const {id} = useParams();
  const { data, loading, error } = useQuery(GET_STUDENT, {
    variables: { id },
    onCompleted: (data) => {
      const { student } = data;
      setStudent(student);
    },
  });

  if (error) { console.log('error= ',error);}
  if (data) { console.log('data= ',data);}

  const [updateStudentMutation] = useMutation(UPDATE_STUDENT);

  const updateStudent = async (event) => {
    event.preventDefault();
    console.log('in handleSubmit, user=', student);
    
    try {
      console.log('Before updateUser call');
      await updateStudentMutation({
        variables: { id, ...student },
      });
      console.log('After updateUser call', student);
      navigate('/userlist');
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };


  // handles onChange event
  const onChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Update Student</strong>
          </CCardHeader>
          <CCardBody>
      
            <CForm onSubmit={updateStudent}>
              <div className="mb-3">
                <CFormLabel htmlFor='studentNumber'>Student Number</CFormLabel>
                <CFormInput type="text" name="studentNumber" id="studentNumber" value={student.studentNumber} disabled />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='firstName'> First Name</CFormLabel>
                <CFormInput type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='lastName'> Last Name</CFormLabel>
                <CFormInput type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='email'> Email</CFormLabel>
                <CFormInput type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
              </div>

              <Button variant="primary" type="submit">
                Update Student
              </Button>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
//

export default UpdateStudent;
