import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import * as XLSX from "xlsx";

export default function Content() {
  const [students, setStudents] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [refreshUpdate, setRefreshUpdate] = useState(false);
  const [totalStudents, setTotalStudents] = useState(0);

  // Récupéartion de tous les étudiants
  useEffect(() => {
    axios
      .get("http://localhost:3000/all-students")
      .then((response) => {
        setStudents(response.data);
        setTotalStudents(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshUpdate]);

  // Suppression d'un étudiant
  const handleDelete = (id, name) => {
    let choice = confirm("Êtes vous sûr de vouloir supprimé " + name + " ?");
    console.log(choice);
    if (choice) {
      axios
        .delete(`http://localhost:3000/delete-student/${id}`)
        .then((response) => {
          console.log("L'étudiant a été supprimé avec succès !");
          setStudents(students.filter((student) => student.id !== id));
          setTotalStudents(totalStudents - 1);
          setRefreshUpdate((prev) => !prev);
        })
        .catch((error) => {
          console.log("Axios error:", error);
          console.log("Axios error response:", error.response);
        });
    } else {
      console.log("Action annulée !");
    }
  };

  // Tri les étudiants pas nom
  function sortStudentsByName(students) {
    return [...students].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  }

  // Fonctionalité d'exportation du tableau en format excel
  const exportToExcel = () => {
    // Création de la structure des données pour le fichier Excel
    const data = students.map((student) => ({
      Nom: student.name,
      Email: student.email,
      Téléphone: student.phone,
      Adresse: student.address,
      Niveau: student.level,
    }));

    // Création du classeur Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Étudiants");

    // Génération du fichier Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Téléchargement du fichier Excel
    const excelData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    const excelUrl = URL.createObjectURL(excelData);
    const link = document.createElement("a");
    link.href = excelUrl;
    link.download = "liste_etudiants.xlsx";
    link.click();
  };

  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-red-700 mt-14">
          <h1 className="text-xl uppercase font-regular pb-6 text-gray-800 sm:text-2xl dark:text-white">
            Tous les étudiants :
          </h1>
          <div className="flex justify-between items-center pb-4 relative">
            <form className="flex items-center">
              <label for="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-80">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
            <div className="flex items-center gap-2 px-3 py-1">
              <p className="text-lg text-gray-800 font-semibold">
                {totalStudents}{" "}
              </p>
              <span className="text-sm text-blue-600">: Etudiants</span>
            </div>
            <div className="flex gap-4">
              <Link href="/AddStudent">
                <button
                  type="button"
                  className="text-gray-900 bg-blue-100 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-5 h-5 mr-2 -ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Add user
                </button>
              </Link>
              <button
                onClick={exportToExcel}
                className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                <svg
                  className="w-5 h-5 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Exporter
              </button>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-900 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nom
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-8 py-3">
                    Téléphone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Adresse
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Niveau
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortStudentsByName(students)
                  ?.filter((data) =>
                    data.name
                      .toLowerCase()
                      .includes(searchValue.toLocaleLowerCase())
                  )
                  ?.map((student) => (
                    <tr
                      key={student?._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {student?.name}
                      </th>
                      <td className="px-6 py-4">{student?.email}</td>
                      <td className="px-6 py-4">{student?.phone}</td>
                      <td className="px-6 py-4">{student?.address}</td>
                      <td className="px-6 py-4">{student?.level}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2">
                          <Link href="/Update">
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-blue-600"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(student?._id, student?.name)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 text-red-600"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
