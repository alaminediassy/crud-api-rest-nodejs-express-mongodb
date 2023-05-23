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
            <h1 className='text-center text-3xl pt-12 pb-12'>
            Felicitation vous avez ajouter avec succès un étudiant !!!
            </h1>
            <span className="text-9xl">🎉</span>   
        </div>
        <div className="flex justify-center items-center">
            <Link>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Voir la liste des étudiants</button>
            </Link>
        </div>
    </div>
  )
}
