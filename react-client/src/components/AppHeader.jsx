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

import { AppBreadcrumb } from './index'
import {logoCentennial} from '../assets/brand/centennialcollege_logo.js'
import { useMutation } from '@apollo/client'
import { LOG_OUT } from '../graphql/mutations.js'

const AppHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [logout] = useMutation(LOG_OUT);

  const handleLogout = async () => {
    logout().then(() => {
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
    }).catch((error) => {
      console.log(error)
    })

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
