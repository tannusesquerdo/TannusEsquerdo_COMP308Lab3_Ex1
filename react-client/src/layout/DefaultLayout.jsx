import React, { useEffect } from 'react'
import { AppContent, AppFooter, AppSidebar, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const DefaultLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state => state.auth)

  const readCookie = async () => {
    try {
      const res = await axios.get('/api/read_cookie');
      if (res.data.screen === 'auth') {
        dispatch({ type: 'set', auth: { isAuthenticated: false, user: null, id: null }});
      } else {
        dispatch({ 
          type: 'set',
          auth: {
            isAuthenticated: true,
            user: res.data.student,
            id: res.data.id
          }
        })
      }
    } catch (e) {
      navigate('/login')
    }
  };

  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    readCookie();
  },[])

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
