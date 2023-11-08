import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPuzzle
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Student',
  },
  {
    component: CNavGroup,
    name: 'Courses',
    to: '/courses',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'My Courses',
        to: '/courses/my',
      }
    ],
  },
  {
    component: CNavTitle,
    name: 'Admin',
  },
  {
    component: CNavGroup,
    name: 'Students',
    to: '/admin/students',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Students',
        to: '/admin/students',
      },
      {
        component: CNavItem,
        name: 'Add Student',
        to: '/admin/students/create',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Courses',
    to: '/admin/courses/',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Courses',
        to: '/admin/courses/',
      },
      {
        component: CNavItem,
        name: 'Add Course',
        to: '/admin/courses/add',
      }
    ],
  },
]

export default _nav
