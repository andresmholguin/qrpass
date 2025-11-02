import { LineChart } from "./LineChart";

export const Reports = () => {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"];
  const ventas = [50, 300, 450, 200, 500];

  return (
    <div className="w-[340px] lg:w-[1000px] mx-auto flex flex-col mb-40 px-2 mt-8">
      <h1 className="text-4xl text-center my-4">Total Registros:</h1>
      <LineChart labels={meses} values={ventas} title="Registros ValleIn" />
    </div>
  );
};
