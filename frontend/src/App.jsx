
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import AdvertModal from './components/modals/AdvertModal';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';

function App() {
  return (
    <>
      <AdvertModal />
      <LoginModal />
      <RegisterModal />
      <div id="mainApp">
        <Header />
        <ToastContainer />
        <div id="rootOutlet" className='min-h-[calc(100vh-60px)] flex'>
          <div className='outlet-container w-full'><Outlet /></div>
          <SideBar />
        </div>
      </div>
    </>
  );
}

export default App;
