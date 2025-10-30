import valleinLogo from "../assets/valleinlogo.png";
export const CheckIn = () => {
  return (
    <div className="w-[350px] mx-auto flex flex-col">
      <picture className=" relative mx-auto mb-4">
        <img src={valleinLogo} alt="" />
      </picture>
      <h1 className="text-4xl text-center mb-8">Registro de Asistente</h1>
      <p className="font-light">Completa los datos para el registro:</p>
      <form className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col gap-1">
          <label className="font-thin text-[1.3rem]" htmlFor="ni">
            Documento identidad:
          </label>
          <input
            className="bg-gray-100 text-Secondary p-2 rounded-md "
            type="number"
            id="ni"
            inputMode="numeric"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-thin text-[1.3rem]" htmlFor="nombre">
            Nombre completo:
          </label>
          <input
            className="bg-gray-100 text-Secondary p-2 rounded-md uppercase "
            type="text"
            id="nombre"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-thin text-[1.3rem]" htmlFor="phone">
            Celular:
          </label>
          <div className="flex gap-2">
            <input
              className="bg-gray-100 text-Secondary w-15 p-2 rounded-md text-center "
              type="numbre"
              id="prephone"
              inputMode="numeric"
              pattern="^\+[0-9]*"
              maxLength="3"
              placeholder="+57"
            />
            <input
              className="bg-gray-100 text-Secondary p-2 w-full rounded-md "
              type="numbre"
              id="phone"
              inputMode="tel"
              pattern="[0-9]*"
              maxLength="10"
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
