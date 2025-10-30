import valleinLogo from "../assets/valleinlogo.png";

export const Users = () => {
  return (
    <div className="w-[350px] mx-auto flex flex-col">
      <picture className="relative mx-auto mb-4">
        <img src={valleinLogo} alt="Logo Valle In" />
      </picture>
      <h1 className="text-4xl text-center mb-8">Usuarios</h1>
    </div>
  );
};
