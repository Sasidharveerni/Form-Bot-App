/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkSpace from './components/workspace/WorkSpace';
import Flow from './components/flow/Flow';
import FormBot from './pages/FormBot';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Settings from './pages/Settings';

function App() {

  const email = localStorage.getItem('formBotEmail') || '';
  const token = localStorage.getItem('formBotToken') || '';

  console.log(email, token)

  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [flowId, setFlowId] = useState('');

  const [selectTheme, setSelectTheme] = useState({
    light: false,
    dark: true,
    tailBlue: false
})

  const checkUserLoginStatus = async () => {
    try {
      console.log(email)
      if (email !== '' && token !== '') {
        const response = await axios.post('https://form-bot-server-1.onrender.com/login/status', {email} , {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.status === 'Success') {
          console.log(response.data.user);
          localStorage.setItem('formBotCreatorId', response.data.user._id)
          setUserData(response.data.user);
          setIsLogin(true);
        }
      } else {
        setIsLogin(false);
        setUserData(null);
      }
    } catch (error) {
      console.log(error);
      setIsLogin(false);
    }
  };

  useEffect(() => {
    checkUserLoginStatus();
  }, []);

  

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage isLogin={isLogin} />} />
          <Route path='/login' element={<Login setUserData={setUserData}/>} />
          <Route path='/signup' element={<Register />} />
          <Route path='/workspace' element={<WorkSpace userData={userData} setIsLogin={setIsLogin}/>} />
          <Route path='/start-flow' element={<Flow userData={userData} selectTheme={selectTheme} setSelectTheme={setSelectTheme} flowId={flowId} setFlowId={setFlowId}/>} />
          <Route path='/form-bot/:flowId' element={<FormBot selectTheme={selectTheme}/>} />
          <Route path='/settings' element={<Settings userData={userData} token={token}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
