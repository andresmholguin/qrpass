export const CheckIn = () => {
  return (
    <div>
      <h1 className="text-3xl mb-8">Registro de Asistente</h1>
      <p className="font-light">Completa los datos:</p>
      <form className="flex flex-col gap-4 mt-4">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" />
      </form>
    </div>
  );
};
