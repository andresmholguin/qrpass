export const CheckIn = () => {
  return (
    <div className="w-[350px] mx-auto flex flex-col">
      <h1 className="text-3xl mb-8">Registro de Asistente</h1>
      <p className="font-light">Completa los datos para el registro:</p>
      <form className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col">
          <label className="font-thin" htmlFor="nombre">
            Nombre completo:
          </label>
          <input
            className="bg-gray-300 text-Secondary p-2 rounded-md "
            type="text"
            id="nombre"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-thin" htmlFor="ni">
            Documento identidad:
          </label>
          <input
            className="bg-gray-300 text-Secondary p-2 rounded-md "
            type="text"
            id="ni"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-thin" htmlFor="ni">
            Celular:
          </label>
          <div className="flex gap-2">
            <input
              className="bg-gray-300 text-Secondary w-15 p-2 rounded-md text-center "
              type="numbre"
              id="ni"
            />
            <input
              className="bg-gray-300 text-Secondary p-2 w-full rounded-md "
              type="numbre"
              id="ni"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-Primary text-Secondary px-4 py-2 rounded-md mt-8 hover:bg-gray-900 hover:text-Primary transition-colors cursor-pointer font-semibold "
        >
          Registrar
        </button>
      </form>
    </div>
  );
};
