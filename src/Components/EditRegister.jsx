import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import SupabaseClient from "../SupabaseClient";

export const EditRegister = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: { countryCode: "+57" } });

  // 🔹 Cargar los datos del asistente por ID
  useEffect(() => {
    const fetchAssistant = async () => {
      const { data, error } = await SupabaseClient.from("Assistants")
        .select("*")
        .eq("id_document_asistants", id)
        .single();

      if (error) {
        console.error("Error al cargar asistente:", error);
        alert("No se pudo cargar el asistente.");
      } else if (data) {
        reset({
          id: data.id_document_asistants,
          nombre: data.name_asistants,
          countryCode: data.phone_asistants.slice(0, 3), // +57
          phone: data.phone_asistants.slice(3),
        });
      }
    };

    if (id) fetchAssistant();
  }, [id, reset]);

  // 🔹 Actualizar los datos
  const onSubmit = async (data) => {
    const updateData = {
      name_asistants: data.nombre.toUpperCase(),
      phone_asistants: `${data.countryCode}${data.phone}`,
    };

    const { error } = await SupabaseClient.from("Assistants")
      .update(updateData)
      .eq("id_document_asistants", data.id);

    if (error) {
      alert("❌ No se pudo actualizar el registro.");
      console.error(error);
    }
    // } else {
    //   alert("✅ Registro actualizado correctamente.");
    // }

    navigate("/registers", { replace: true });
  };

  return (
    <div>
      <h1 className="text-4xl text-center mt-4">Editar Asistente</h1>
      <form
        className="flex flex-col gap-4 my-8 lg:w-2/4 lg:mx-auto px-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="font-sm text-[1.3rem]">
          Actualiza los datos del asistente:
        </p>

        {/* Documento */}
        <div className="flex flex-col gap-1">
          <label className="font-thin text-[1.3rem]" htmlFor="id">
            Documento identidad:
          </label>
          <input
            className="bg-gray-100 text-Secondary p-2 rounded-md "
            type="text"
            inputMode="numeric"
            disabled
            {...register("id")}
          />
        </div>

        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <label className="font-thin text-[1.3rem]" htmlFor="nombre">
            Nombre completo:
          </label>
          <input
            className="bg-gray-100 text-Secondary p-2 rounded-md uppercase "
            type="text"
            {...register("nombre", { required: true, minLength: 3 })}
          />
          {errors.nombre && (
            <span className="text-red-500 text-sm mt-2">¡Campo requerido!</span>
          )}
        </div>

        {/* Teléfono */}
        <div className="flex flex-col gap-1">
          <label className="font-thin text-[1.3rem]" htmlFor="phone">
            Celular:
          </label>
          <div className="flex gap-2">
            <input
              className="bg-gray-100 text-Secondary w-20 p-2 rounded-md text-center "
              type="text"
              {...register("countryCode", {
                pattern: /^\+[0-9]*$/,
              })}
            />
            <input
              className="bg-gray-100 text-Secondary p-2 w-full rounded-md "
              type="text"
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
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
