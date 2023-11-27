import React from 'react';

const CreateStudent = React.lazy(() => import('./views/admin/CreateStudent'));
const EditStudent = React.lazy(() => import('./views/admin/EditStudent'));
const ListCourses = React.lazy(() => import('./views/ListCourses'));
const CreateCourse = React.lazy(() => import('./views/admin/CreateCourse'));
const ListStudents = React.lazy(() => import('./views/admin/ListStudents'));
const AllCourses = React.lazy(() => import('./views/admin/ListCourses'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/courses', name: 'Courses', element: ListCourses },
  { path: '/courses/my', name: 'My Courses', exact: true, element: ListCourses },
  { path: '/admin/students/', name: 'All Students', element: ListStudents },
  { path: '/admin/students/create', name: 'Add Students', element: CreateStudent },
  { path: '/admin/students/:studentId/edit', name: 'Edit Student', element: EditStudent},
  { path: '/admin/courses', name: 'All Courses', element: AllCourses },
  { path: '/admin/courses/add', name: 'Create Course', element: CreateCourse },
  { path: '/admin/courses/:courseId/edit', name: 'Edit Course', element: CreateCourse },
];

export default routes;
