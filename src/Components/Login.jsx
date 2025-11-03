import { useForm } from "react-hook-form";
import SupabaseClient from "../SupabaseClient";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (useUserStore.getState().user) {
      navigate("/reports", { replace: true });
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (dataUser) => {
    //Leer data into Supabase
    let { data, error } = await SupabaseClient.from("users")
      .select("*")
      .eq("user_name", dataUser.user_name)
      .eq("user_pass", dataUser.password);

    if (error) {
      console.error("Error al consultar:", error);
      alert("Error al consultar la base de datos.");
      return;
    } else {
      if (!data || data.length === 0) {
        alert("Usuario o contraseña incorrectos.");
        return;
      }

      const user = data[0];
      useUserStore.getState().createUser(user);
      // localStorage.setItem("user", JSON.stringify(data[0]));
      // alert("Acceso exitoso.");

      reset();

      navigate("/reports", { replace: true });
    }
  };

  return (
    <div className="flex flex-col m-auto gap-4 w-full lg:w-1/4 lg:mx-auto">
      <div className="text-3xl font-bold flex justify-center mb-8">Login</div>
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
        <button className="bg-Primary p-4 mt-8 rounded-md text-Secondary w-full cursor-pointer font-semibold hover:bg-gray-900 hover:text-Primary transition-colors mb-12">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
