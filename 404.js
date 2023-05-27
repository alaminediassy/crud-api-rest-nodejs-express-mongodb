import Link from 'next/link'
import React from 'react'

export default function Custom404() {
  return (
    <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-600">Erreur 404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">Cette page n’existe pas !</h1>
          <p className="mt-6 text-base leading-7 dark:text-gray-300 text-gray-600">Désolé, nous n’avons pas pu trouver la page que vous recherchez.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Retour à l’accueil
            </Link>
          </div>
        </div>
      </main>
  )
}
