import { useForm } from "react-hook-form";
import SupabaseClient from "../SupabaseClient";

export const CreateUsers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const registerUser = {
      user_name: data.user_name.toLowerCase(),
      user_pass: data.password,
      user_rol: data.rol,
    };

    //Insert data into Supabase
    const { dataAdd, error } = await SupabaseClient.from("users")
      .insert([
        {
          user_name: registerUser.user_name,
          user_pass: registerUser.user_pass,
          rol: registerUser.user_rol,
        },
      ])
      .select();

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
    <div className="flex flex-col m-auto gap-4 w-full lg:w-1/4 lg:mx-auto">
      <div className="text-3xl font-bold flex justify-center mb-8">
        Crear Ususario
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="font-thin text-[1.3rem]" htmlFor="user_name">
              Usuario:
            </label>
            {errors.id && (
              <span className="text-red-500 text-sm font-sm mt-2">
                ¡Campo requerido!
              </span>
            )}
          </div>
          <input
            className="bg-gray-100 text-Secondary p-2 rounded-md lowercase"
            type="text"
            inputMode="text"
            autoFocus
            autoComplete="username"
            {...register("user_name", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="font-thin text-[1.3rem]" htmlFor="password">
              Contraseña:
            </label>
            {errors.id && (
              <span className="text-red-500 text-sm font-sm mt-2">
                ¡Campo requerido!
              </span>
            )}
          </div>
          <input
            className="bg-gray-100 text-Secondary p-2 rounded-md "
            type="password"
            inputMode="text"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />
        </div>
        <select
          id="rol"
          className="bg-gray-100 text-Secondary p-3 rounded-md w-full mt-6"
          {...register("rol", { required: true })}
          defaultValue=""
        >
          <option value="" disabled>
            Selecciona un rol
          </option>
          <option value="1859">Cliente</option>
          <option value="3245">Registro</option>
          <option value="2525">Admin</option>
        </select>
        <button className="bg-Primary p-4 mt-8 rounded-md text-Secondary w-full cursor-pointer font-semibold hover:bg-gray-900 hover:text-Primary transition-colors mb-12">
          Guardar
        </button>
      </form>
    </div>
  );
};
