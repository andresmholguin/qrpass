import valleinLogo from "../assets/valleinlogo.png";
import { useForm } from "react-hook-form";
import SupabaseClient from "../SupabaseClient";

export const CheckIn = () => {
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

    console.log(JSON.stringify(registerAdd));

    const { dataAdd, error } = await SupabaseClient.from("Assistants").insert([
      registerAdd,
    ]);

    if (error) {
      // console.log("Error inserting data:", error);
      alert("No se pudo registrar el asistente.", error);
    } else {
      // console.log("Data inserted successfully:", dataAdd);
      alert("Registro exitoso.", dataAdd);
      reset();
    }
  };

  return (
    <div className="w-[350px] mx-auto flex flex-col">
      <picture className=" relative mx-auto mb-4">
        <img src={valleinLogo} alt="" />
      </picture>
      <h1 className="text-4xl text-center mb-8">Registro de Asistente</h1>
      <p className="font-light">Completa los datos para el registro:</p>
      <form
        className="flex flex-col gap-4 mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            type="number"
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
    </div>
  );
};
