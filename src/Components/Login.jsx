export const Login = () => {
  return (
    <div className="flex flex-col gap-4 w-[400px] mx-auto ">
      <div className="text-3xl font-bold flex justify-center mb-8 ">
        QR Pass
      </div>
      <input
        className="bg-gray-500/30 p-4 rounded-md  border border-gray-500 font-thin "
        type="email"
        placeholder="Correo Electrónico"
      />
      <input
        className="bg-gray-500/30 p-4 rounded-md  border border-gray-500 font-thin  "
        type="password"
        placeholder="Contraseña"
      />
      <p className="text-sm font-light flex justify-end ">
        ¿Olvidaste tu cuenta?
      </p>
      <button className="bg-Primary p-4 mt-8 rounded-md text-Secondary ">
        Iniciar Sesión
      </button>
    </div>
  );
};
