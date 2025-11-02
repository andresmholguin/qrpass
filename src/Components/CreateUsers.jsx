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
    };

    //Insert data into Supabase
    const { dataAdd, error } = await SupabaseClient.from("users")
      .insert([
        {
          user_name: registerUser.user_name,
          user_pass: registerUser.user_pass,
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
    <div className="flex flex-col m-auto gap-4 ">
      <div className="text-3xl font-bold flex justify-center mb-8 ">
        Crear Usuario
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="font-thin text-[1.3rem] lowercase " htmlFor="id">
              Usuario:
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
            autoComplete="username"
            autoFocus
            {...register("user_name", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <label className="font-thin text-[1.3rem]" htmlFor="id">
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
        {/* <input
          className="bg-gray-500/30 p-4 rounded-md  border border-gray-500 font-thin "
          type="email"
          placeholder="Correo Electrónico"
        />
        <input
          className="bg-gray-500/30 p-4 rounded-md  border border-gray-500 font-thin  "
          type="password"
          placeholder="Contraseña"
        />
        <p className="text-sm font-light flex justify-end cursor-pointer hover:underline ">
          ¿Olvidaste tu cuenta?
        </p> */}
        <button className="bg-Primary p-4 mt-8 rounded-md text-Secondary cursor-pointer font-semibold hover:bg-gray-900 hover:text-Primary transition-colors mb-12">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
