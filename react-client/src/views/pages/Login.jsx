import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

//
// this is the login component
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.isAuthenticated)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "/api/signin";

  const authenticateUser = async () => {
    try {
      const loginData = { auth: { email, password } }
      const res = await axios.post(apiUrl, loginData);
      if (res.data.status === "error") {
        toast.error(res.data.message);
        return false;
      }
      if (res.data.screen !== 'auth') {
        dispatch({ 
          type: 'set', 
          isAuthenticated: true,
          user: res.data.student
        })
      }
    } catch (e) {
      console.log(e);
    }
  
  };
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      const res = await axios.get('/api/read_cookie');
      if (res.data.screen !== 'auth') {
        dispatch({ 
          type: 'set', 
          isAuthenticated: true,
          id: res.data.id
        })
      } else {
        dispatch({ 
          type: 'set', 
          isAuthenticated: false,
          user: null,
          id: null,
        })
      }
    } catch (e) {
      dispatch({ type: 'set', isAuthenticated: false, user: null, id: null })
    }
  };

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate])
  
  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={authenticateUser}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="email" name='email' autoComplete="email" onChange={(text) => setEmail(text.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name='password'
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={text => setPassword(text.target.value)} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={authenticateUser}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
//
export default Login;
