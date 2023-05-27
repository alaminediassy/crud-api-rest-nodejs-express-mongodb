import React from 'react'
import { Sidebar } from '../Sidebar'
import Formcontent from './FormContent'
import NavbarDashboard from '../NavbarDashboard'

export const AddStudentForm = () => {
  return (
    <div>
       <NavbarDashboard/>
       <Sidebar/>
       <Formcontent/>
    </div>
  )
}
