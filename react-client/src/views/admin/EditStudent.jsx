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
  const params = useParams();
  const id = params.studentId;
  //console.log('in Update Student params= ',params);
  console.log('in Update Student id= ', id);
  const { data, loading, error } = useQuery(GET_STUDENT, {
    variables: { id },
    onCompleted: (data) => {
      const { student } = data;
      console.log('student= ',student);
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
      await updateStudentMutation({
        variables: { id, ...student },
      });
      console.log('After updateUser call', student);
      navigate('/admin/students');
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
                <CFormLabel htmlFor='phone'> Phone</CFormLabel>
                <CFormInput type="text" name="phone" id="phone" rows="3" placeholder="Enter phone" value={student.phone} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='program'> Program</CFormLabel>
                <CFormInput type="text" name="program" id="program" rows="3" placeholder="Enter program" value={student.program} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='email'> Email</CFormLabel>
                <CFormInput type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='favoriteTopic'> Favorite Topic</CFormLabel>
                <CFormInput type="text" name="favoriteTopic" id="favoriteTopic" rows="3" placeholder="Enter favorite topic" value={student.favoriteTopic} onChange={onChange} />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor='strongestTechnicalSkill'> Strongest Technical Skill</CFormLabel>
                <CFormInput type="text" name="strongestTechnicalSkill" id="strongestTechnicalSkill" rows="3" placeholder="Enter strongest tech skill" value={student.strongestTechnicalSkill} onChange={onChange} />
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
