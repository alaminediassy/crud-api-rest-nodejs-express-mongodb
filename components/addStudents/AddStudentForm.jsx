import React from 'react'
import Navbar from '../Navbar'
import { Sidebar } from '../Sidebar'
import Formcontent from './FormContent'

export const AddStudentForm = () => {
  return (
    <div>
       <Navbar/>
       <Sidebar/>
       <Formcontent/>
    </div>
  )
}
