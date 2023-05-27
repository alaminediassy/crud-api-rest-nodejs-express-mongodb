import React from 'react'
import { Sidebar } from '../Sidebar'
import DashboardContent from './DashboardContent'
import NavbarDashboard from '../NavbarDashboard'

export default function DashboardUI() {
  return (
    <div>
      <NavbarDashboard/>
      <Sidebar/>
      <DashboardContent/>
    </div>
  )
}

