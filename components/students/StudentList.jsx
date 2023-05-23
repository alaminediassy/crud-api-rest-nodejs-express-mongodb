import Link from 'next/link'
import React from 'react'
import Navbar from '../Navbar'
import { Sidebar } from '../Sidebar'
import Content from './Content'

export const StudentList = () => {
  return (
    <div>
        <Navbar/>
        <Sidebar/>
        <Content/>
    </div>
  )
}
