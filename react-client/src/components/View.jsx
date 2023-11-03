import React, { useState } from 'react';

import CreateCourse from './CreateCourse';
import ListArticles from './ListArticles';

//
import axios from 'axios';
import ListCourses from './ListCourses';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, id, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [articleOperation, setCourseOperation] = useState('no-op');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/api/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <div className="App">
      {
        (() => {
          switch (articleOperation) {
            case 'list':
              return <ListCourses id={id} />
            case 'create':
              return <CreateCourse screen={screen} setScreen={setScreen} />
            
            default:
              return <div>
              <p>{screen}</p>
              <p>{data}</p>
              <button className='btn' onClick={() => setCourseOperation('create')}>Create Courses</button>
              
              <button className='btn' onClick={() => setCourseOperation('list')}>List Courses</button>
  
              <button className='btn' onClick={deleteCookie}>Log out</button>
            </div> 
          }
        })()
                   
      }

    </div>
  );
}
//
export default View;
