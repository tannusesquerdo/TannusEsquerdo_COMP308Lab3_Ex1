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
import { useMutation } from '@apollo/client';
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

  /*useEffect(() => {
    const fetchData = async () => {
      if(data && !loading && !error) {
        try {
          const { student } = data;
          if(student.length > 0) {
            setStudent(student);
          }
        }
        catch (e) {
          console.log(e);
        }
      }
    };  
    fetchData();
  }, [data, loading, error]);*/

const updateStudent = () => {
  let navigate = useNavigate()
  const [user, setUser] = useState({ 
    studentNumber: '', 
    firstName: '', 
    lastName: '', 
    email: '',
    password: '' 
  });
  const [updateStudentMutation] = useMutation(UPDATE_STUDENT, {
    update(cache, { data: { updateStudent } }) {
      const { students } = cache.readQuery({ query: GET_STUDENT });
      cache.writeQuery({
        query: GET_STUDENT,
        data: { students: [...students, updateStudent] },
      });
    },
  })

  const updateUser = (e) => {
    e.preventDefault();
    const data = { 
      studentNumber: student.studentNumber,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email
    };
    
    updateStudentMutation({
      variables: { ...data },
    }).then(() => {
      toast.success('Student updated successfully');
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
            <strong>Update Student</strong>
          </CCardHeader>
          <CCardBody>
      
            <CForm onSubmit={updateUser}>
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
}
export default UpdateStudent;
