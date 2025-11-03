import { useForm } from "react-hook-form";
import SupabaseClient from "../SupabaseClient";
import { useState } from "react";

export const CheckIn = () => {
  const [showAlert, setShowAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { countryCode: "+57" } });

  const onSubmit = async (data) => {
    const registerAdd = {
      id_document_asistants: data.id,
      name_asistants: data.nombre.toUpperCase(),
      phone_asistants: `${data.countryCode}${data.phone}`,
    };

    //Insert data into Supabase
    const { dataAdd, error } = await SupabaseClient.from("Assistants").insert([
      registerAdd,
    ]);

    if (error) {
      // console.log("Error inserting data:", error);
      alert("No se pudo registrar el asistente.", error);
    } else {
      console.log("Data inserted successfully:", dataAdd);

      // alert("Registro exitoso.", dataAdd);
      setShowAlert(true);

      reset();

      // Oculta el alert después de unos segundos (opcional)
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div>
      <h1 className="text-4xl text-center mt-4">Registro de Asistente</h1>
      <form
        className="flex flex-col gap-4 my-8 lg:w-2/4 lg:mx-auto px-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="font-sm text-[1.3rem]">
          Completa los datos para el registro:
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="font-thin text-[1.3rem]" htmlFor="id">
              Documento identidad:
            </label>
            {errors.id && (
              <span className="text-red-500 text-sm font-sm mt-2">
                ¡Campo requerido!
              </span>
            )}
          </div>
          <input
            className="bg-gray-100 text-Secondary p-2 rounded-md "
            type="text"
            inputMode="numeric"
            autoFocus
            {...register("id", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="font-thin text-[1.3rem]" htmlFor="nombre">
              Nombre completo:
            </label>
            {errors.nombre && (
              <span className="text-red-500 text-sm font-sm mt-2">
                ¡Campo requerido!
              </span>
            )}
          </div>
          <input
            className="bg-gray-100 text-Secondary p-2 rounded-md uppercase "
            type="text"
            {...register("nombre", { required: true, minLength: 3 })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="font-thin text-[1.3rem]" htmlFor="phone">
              Celular:
            </label>
            {errors.phone && (
              <span className="text-red-500 text-sm font-sm mt-2">
                ¡Campo requerido!
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <input
              className="bg-gray-100 text-Secondary w-15 p-2 rounded-md text-center "
              type="numbre"
              inputMode="numeric"
              {...register("countryCode", {
                maxLength: 3,
                pattern: /^\+[0-9]*$/,
              })}
            />
            <input
              className="bg-gray-100 text-Secondary p-2 w-full rounded-md "
              type="numbre"
              inputMode="tel"
              {...register("phone", {
                required: true,
                maxLength: 10,
                pattern: /^[0-9]*$/,
              })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-Primary text-Secondary px-4 py-2 rounded-md mt-8 hover:bg-gray-900 hover:text-Primary transition-colors cursor-pointer font-semibold text-lg"
        >
          Registrar
        </button>
      </form>
      <div className=" lg:absolute lg:right-20 lg:-mt-25 ">
        {showAlert && (
          <div
            role="alert"
            className="alert alert-success mt-3 flex items-right gap-2 lg:w-50 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>¡Registro completado!</span>
          </div>
        )}
      </div>
    </div>
  );
};
