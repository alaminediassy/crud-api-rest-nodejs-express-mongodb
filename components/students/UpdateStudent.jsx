import React from 'react'
import Navbar from '../Navbar'
import { Sidebar } from '../Sidebar'
import UpdateStudentContent from './UpdateStudentContent'
import NavbarDashboard from '../NavbarDashboard'

export default function UpdateStudent() {
  return (
    <div>
      <NavbarDashboard/>
      <Sidebar/>
      <UpdateStudentContent/>
    </div>
  )
}
