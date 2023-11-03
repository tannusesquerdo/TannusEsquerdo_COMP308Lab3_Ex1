import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
// this component is used to create a new article
function CreateCourse(props) {
  let navigate = useNavigate();
  const [course, setCourse] = useState({ 
    _id: '', 
    courseCode: '', 
    courseName: '', 
    section: '',
    semester: '',
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "api/api/courses"

  const saveCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      email: props.screen,
      courseCode: course.courseCode, 
      courseName: course.courseName, 
      section: course.section,
      semester: course.semester,
    };
    //
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        // navigate('/showarticle/' + result.data._id)
    }).catch((error) => setShowLoading(false));
  };
  //
  const onChange = (e) => {
    e.persist();   
    setCourse({...course, [e.target.name]: e.target.value});
  }
    
  return (
    <div>
      <h2>Create a Course</h2>
      {showLoading && 
        <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Form onSubmit={saveCourse}>
        <Form.Group>
          <Form.Label>Course Code</Form.Label>
          <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter Course Code" value={course.courseCode} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Course Name</Form.Label>
          <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter Course Name" value={course.courseName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Course Section</Form.Label>
          <Form.Control type="text" name="section" id="section" placeholder="Enter Course Section" value={course.section} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Course Semester</Form.Label>
          <Form.Control type="text" name="semester" id="semester" placeholder="Enter Course Semester" value={course.semester} onChange={onChange} />
        </Form.Group>
                      
        <Button variant="primary" type="submit">
          Save Course
        </Button>
      </Form>
    </div>
  );
}
// 
export default CreateCourse;
