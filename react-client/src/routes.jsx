import React from 'react';

const CreateStudent = React.lazy(() => import('./views/admin/CreateStudent'));
const ListCourses = React.lazy(() => import('./views/ListCourses'));
const CreateCourse = React.lazy(() => import('./views/admin/CreateCourse'));
const ListStudents = React.lazy(() => import('./views/admin/ListStudents'));
const AllCourses = React.lazy(() => import('./views/admin/ListCourses'));
const CreateStudentPub = React.lazy(() => import('./views/CreateStudent'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/register', name: 'Signup', element: CreateStudentPub },
  { path: '/courses', name: 'Courses', element: ListCourses },
  { path: '/courses/my', name: 'My Courses', exact: true, element: ListCourses },
  { path: '/admin/students/', name: 'All Students', element: ListStudents },
  { path: '/admin/students/create', name: 'Add Students', element: CreateStudent },
  { path: '/admin/courses', name: 'All Courses', element: AllCourses },
  { path: '/admin/courses/add', name: 'Create Course', element: CreateCourse },
  { path: '/admin/courses/:courseId/edit', name: 'Edit Course', element: CreateCourse },
];

export default routes;
