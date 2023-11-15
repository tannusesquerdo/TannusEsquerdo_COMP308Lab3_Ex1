import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilAccountLogout, cilMenu } from '@coreui/icons'
import axios from 'axios'

import { AppBreadcrumb } from './index'
import {logoCentennial} from '../assets/brand/centennialcollege_logo.js'

const AppHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const apiUrl = '/api/signout'

  const handleLogout = async () => {
    const result = await axios.post(apiUrl)
    if (result.status === 200) {
      dispatch({ 
        type: 'set',
        auth: {
          isAuthenticated: false,
          user: null,
          id: null,
          role: null
        }
      })
      navigate('/login', {replace: true})
    }

  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none py-2 px-2 mb-2 justify-content-center" to="/">
          <CIcon icon={logoCentennial} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavLink href="#">COMP 308 - Lab #3</CNavLink>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem >
            <CNavLink href="#" onClick={handleLogout}>
              <CIcon icon={cilAccountLogout} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
