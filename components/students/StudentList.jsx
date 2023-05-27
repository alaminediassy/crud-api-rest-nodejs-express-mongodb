import Link from 'next/link'
import React from 'react'
import { Sidebar } from '../Sidebar'
import Content from './Content'
import NavbarDashboard from '../NavbarDashboard'

export const StudentList = () => {
  return (
    <div>
        <NavbarDashboard/>
        <Sidebar/>
        <Content/>
    </div>
  )
}
