import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
//
// this component is used to create a new user
function CreateStudent(props) {
  let navigate = useNavigate()
  //
  const [student, setStudent] = useState({ 
    _id: '',
    studentNumber: '',
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '' 
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "api/students/new";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      studentNumber: student.studentNumber,
      firstName: student.firstName, 
      lastName: student.lastName, 
      email: student.email,
      password: student.password
    };

    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/')
      }).catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={saveUser}>
          <Form.Group>
            <Form.Label>Student Number</Form.Label>
            <Form.Control type="text" name="studentNumber" id="studentNumber" placeholder="Enter Student Number" value={student.studentNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" id="password" placeholder="Enter password" value={student.password} onChange={onChange} />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Save
          </Button>

        </Form>
    </div>
  );
}
//
export default CreateStudent;
