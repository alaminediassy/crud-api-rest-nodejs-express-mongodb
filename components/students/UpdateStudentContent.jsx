import React, { useEffect, useState } from "react";
import axios from "axios";
import SuccessSaved from "../SuccessSaved";
import { useRouter } from "next/router";

export default function UpdateStudentContent() {
  const router = useRouter();
  const { id } = router.query;
  const [isSaved, setIsSaved] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    level: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    level: "",
  });

  useEffect(() => {
    if (id) {
      getSingleStudent(id);
    }
  }, [id]);

  const getSingleStudent = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/${id}`);
      const { name, email, phone, address, level } = response.data;
      setFormValues({ name, email, phone, address, level });
    } catch (error) {
      console.log("Axios error:", error);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;
    if (!formValues.name) {
      errors.name = "Le prénom et le nom sont requis";
      isValid = false;
    } else if (formValues.name.length < 8) {
      errors.name =
        "Le prénom et le nom doivent contenir au moins 8 caractères !";
      isValid = false;
    }
    if (!formValues.email) {
      errors.email = "L'adresse email est requise";
      isValid = false;
    }
    if (!formValues.phone) {
      errors.phone = "Le numéro de téléphone est requis";
      isValid = false;
    }
    if (!formValues.address) {
      errors.address = "L'adresse est requise";
      isValid = false;
    }
    if (!formValues.level) {
      errors.level = "Le niveau d'étude est requis";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.put(
          `http://localhost:3000/update-student/${id}`,
          formValues
        );
        router.push("/Students");
        setIsSaved(true);
      } catch (error) {
        console.log("Axios error:", error);
        if (error.response && error.response.data) {
          const { errors } = error.response.data;
          setFormErrors(errors);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-red-700 mt-14">
        {isSaved ? (
          <SuccessSaved />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bg-blue-200 rounded-lg mb-10 px-4 py-2">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Veuillez modifier les informations
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Utilisez une adresse permanente où vous pouvez recevoir du
                courrier.
              </p>
            </div>
            {formErrors.message && (
              <p className="mt-2 text-sm text-red-500">{formErrors.message}</p>
            )}
            <div className="space-y-12">
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
                        value={formValues.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Mamadou DIASSY"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {formErrors.name && (
                        <p className="mt-2 text-sm text-red-500">
                          {formErrors.name}
                        </p>
                      )}
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
                        value={formValues.email}
                        onChange={handleInputChange}
                        required
                        placeholder="exemple@gmail.com"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {formErrors.email && (
                        <p className="mt-2 text-sm text-red-500">
                          {formErrors.email}
                        </p>
                      )}
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
                        value={formValues.phone}
                        onChange={handleInputChange}
                        placeholder="77 253 00 00"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {formErrors.phone && (
                        <p className="mt-2 text-sm text-red-500">
                          {formErrors.phone}
                        </p>
                      )}
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
                        value={formValues.address}
                        onChange={handleInputChange}
                        required
                        placeholder="03, Cité Apecssy Nord Foire, 11500 Dakar"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {formErrors.address && (
                        <p className="mt-2 text-sm text-red-500">
                          {formErrors.address}
                        </p>
                      )}
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
                        value={formValues.level}
                        onChange={handleInputChange}
                        required
                        placeholder="Master 2"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {formErrors.level && (
                        <p className="mt-2 text-sm text-red-500">
                          {formErrors.level}
                        </p>
                      )}
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
                Modifier
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
