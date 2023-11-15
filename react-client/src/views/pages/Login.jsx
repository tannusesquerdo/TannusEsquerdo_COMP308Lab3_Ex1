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
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN } from '../../graphql/mutations';
import { IS_LOGGED_IN } from '../../graphql/queries';

//
// this is the login component
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector(state => state.auth)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError } = useQuery(IS_LOGGED_IN, {
    fetchPolicy: 'network-only'
  });

  const [loginMutation] = useMutation(LOGIN, {
    variables: { email, password },
  });

  const authenticateUser = async () => {
    try {
      const res = await loginMutation();
      const { login: { data, message, status } } = res.data;
      if (status === "error") {
        toast.error(message);
        return false;
      }
      setAuthState(status, data, dispatch);
    } catch (e) {
      console.log(e);
    }
  }

  const setAuthState = (status, data, dispatch) => {
    const authState = status === 'success'
      ? {
          isAuthenticated: true,
          id: data.id,
          user: data.student,
          role: 'student'
        }
      : {
          isAuthenticated: false,
          user: null,
          id: null,
          role: null
        };
  
    dispatch({ type: 'set', auth: authState });
  };
  
  useEffect(() => {
    if (isLoggedInData) {
      const { isLoggedIn: { data, status } } = isLoggedInData;
      setAuthState(status, data, dispatch);
    }
  }, [isLoggedInData, dispatch]);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    // Check if the user is already logged in
    const readCookie = async () => {
      if (!isLoggedInData && !isLoggedInLoading && !isLoggedInError) {
        try {
          const { isLoggedIn: { data, status } } = isLoggedInData;
          setAuthState(status, data, dispatch);
        } catch (e) {
          dispatch({ type: 'set', auth: { isAuthenticated: false, user: null, id: null }});
        }
      }
    };
  
    readCookie();
  }, [isLoggedInData, isLoggedInLoading, isLoggedInError, dispatch]); 

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
