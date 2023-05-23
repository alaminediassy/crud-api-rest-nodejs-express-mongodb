import React, { useState } from "react";
import axios from "axios";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import SuccessSaved from "../SuccessSaved";
import confetti from "canvas-confetti";
require("canvas-confetti");

export default function Formcontent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    level: "",
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Afficher une alerte pour demander confirmation avant l'enregistrement
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir enregistrer vos informations ?"
    );
    if (!confirmed) {
      return; // Arrêter le traitement si l'utilisateur annule
    }

    try {
      const response = await axios.post("http://localhost:3000/", formData);
      console.log(response.data);
      setIsSaved(true);
      confetti();
      // Faire quelque chose avec la réponse (redirection, notification, etc.)
    } catch (error) {
      console.error(error);
      // Gérer l'erreur (afficher un message d'erreur, etc.)
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-red-700 mt-14">
        <div className="bg-blue-200 rounded-lg mb-10 px-4 py-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Veuillez saisir correctement les informations personnlles de l
            étudiant
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Utilisez une adresse permanente où vous pouvez recevoir du courrier.
          </p>
        </div>
        {isSaved ? (
          <SuccessSaved />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Profil Etudiant
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Ces informations seront stockées dans la base de donnée, alors
                  faites attention à ce que tu partages.
                </p>

                <label
                  htmlFor="username"
                  className="block mt-6 text-sm font-medium leading-6 text-gray-900"
                >
                  Spdeudo
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      uvs.sn/
                    </span>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autoComplete="username"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="alamine_diassy"
                    />
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6  sm:grid-cols-6">
                  <div className="sm:col-span-4"></div>
                  <div className="col-span-full">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      <UserCircleIcon
                        className="h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="col-span-full"></div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="first-name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Prénom et nom
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Mamadou DIASSY"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Adresse email :
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="exemple@gmail.com"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      N° Téléphone :
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="phone"
                        autoComplete="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="77 253 00 00"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Adresse exacte:
                    </label>
                    <div className="mt-2">
                      <input
                        id="address"
                        name="address"
                        type="address"
                        autoComplete="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="03, Cité Apecssy Nord Foire, 11500 Dakar"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="level"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Niveau détude
                    </label>
                    <div className="mt-2">
                      <input
                        id="level"
                        name="level"
                        type="level"
                        autoComplete="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                        placeholder="Master 2"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Annuler
              </button>
              <button
                type="submit"
                id="triggerConfetti"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Enregistrer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
