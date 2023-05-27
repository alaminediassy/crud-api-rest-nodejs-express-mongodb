import React from 'react'
import Navbar from './Navbar'
import { Sidebar } from './Sidebar'
import confetti from 'canvas-confetti';
import Link from 'next/link';


export default function SuccessSaved({ triggerConfetti }) {
  return (
    <div>
        <Navbar/>
        <Sidebar/>
        <div className="text-center">
            <h1 className='text-center font-bold text-slate-900 text-5xl pt-8 pb-12'>
            Felicitation !!!
            </h1>
            <p className='pb-6'>Un nouveau étudiants vient dêtre ajouté dans votre base de données</p>
            <span className="text-8xl">🎉</span>   
        </div>
        <div className="flex justify-center p-6 items-center">
            <Link href="/Students">
                <button type="button" className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Voir la liste des étudiants</button>
            </Link>
        </div>
    </div>
  )
}
