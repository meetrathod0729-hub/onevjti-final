import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPass from './pages/ForgotPass'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Dashboard from "./pages/Dashboard";
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import EventCard from './components/Events/EventCard'
import Committees from "./pages/Committees";
import EventDetails from './pages/EventDetails'
import ProtectedRoute from './components/ProtectedRoute'
import ChangePassword from './pages/ChangePassword'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import CommitteeMembersPage from './pages/CommitteeMembersPage'
import CommitteeDetailPage from './pages/CommitteeDetailPage'
import Achievements from './pages/Achievements'
import Gallery from './pages/Gallery'
import EditEvent from './pages/EditEvent'
import CreateEvent from './pages/CreateEvent'
import CreateCommittee from './pages/CreateCommittee'
import EditCommittee from './pages/EditCommittee'
import CreateAchievement from './pages/CreateAchievement'
import EditAchievement from './pages/EditAchievement'
import CreateGallery from './pages/CreateGallery'
import EventRegister from './pages/EventRegister'
import CreateNotification from "./pages/CreateNotification";
import EditNotification from "./pages/EditNotification";
const App= ()=>{

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      {/* <Link to="/committees">Committees</Link> */}
      <main className="flex-grow">

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/users/dashboard' element={<Dashboard />}/>
        <Route path='/users/register' element={<Register/>}/>
        <Route path='/users/login' element={<Login/>}/>
        <Route path='/users/notifications' element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/notifications/create" element={<CreateNotification />} />
          <Route path="/notifications/edit/:id" element={<EditNotification />} />
        <Route path='/users/change-password' element={
          <ProtectedRoute>
          <ChangePassword/>
          </ProtectedRoute>
        }/>
        <Route path="/users/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/achievements/create" element={<CreateAchievement />} />
        <Route path="/achievements/edit/:id" element={<EditAchievement />} />
        <Route path='/users/forgotpass' element={<ForgotPass/>}/>
        <Route path="/users/committees" element={<Committees />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events/edit/:id" element={<EditEvent />} />
        <Route path="/events/:eventId/register" element={<EventRegister />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/committees/create" element={<CreateCommittee />} />
        <Route path="/committees/edit/:id" element={<EditCommittee />} />
        <Route path="/users/committee/members" element={ <CommitteeMembersPage />} />
        <Route path="/committees/:id" element={<CommitteeDetailPage />} />
        <Route path="/gallery" element={<Gallery />}/>
        <Route path="/gallery/upload" element={<CreateGallery />} />
      </Routes>
      </main>
      <Footer />

    </div>
  
  ) 


}

  


export default App
