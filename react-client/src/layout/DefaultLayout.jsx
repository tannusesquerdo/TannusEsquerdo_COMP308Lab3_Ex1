import React, { useEffect } from 'react'
import { AppContent, AppFooter, AppSidebar, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from "@apollo/client";
import { IS_LOGGED_IN } from '../graphql/queries';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.auth)

  const { data: isLoggedInData, loading: isLoggedInLoading, error: isLoggedInError } = useQuery(IS_LOGGED_IN, { fetchPolicy: 'network-only' });

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
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
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
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
