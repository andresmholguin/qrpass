import { LineChart } from "./LineChart";
import { useEffect, useState } from "react";
import SupabaseClient from "../SupabaseClient";

export const Reports = () => {
  const [register, setRegister] = useState([]);

  // const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo"];
  // const ventas = [50, 300, 450, 200, 500];
  const readApi = async () => {
    let { data: Assistants, error } = await SupabaseClient.from("Assistants")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.log("Error fetching data:", error);
    } else {
      console.log("Data fetched successfully:", Assistants);
      setRegister(Assistants);
    }
  };

  useEffect(() => {
    readApi();
  }, []);

  const groupedByDate = register.reduce((acc, curr) => {
    const date = curr.created_at.split("T")[0]; // solo la fecha
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Extraer labels y valores ordenados por fecha
  const labels = Object.keys(groupedByDate).sort();
  const values = labels.map((date) => groupedByDate[date]);
  const extendedLabels = ["", ...labels, ""]; // etiquetas vacías opcionales (solo para espacio)
  const extendedValues = [0, ...values, 0];

  return (
    <div className="w-[340px] lg:w-[1000px] mx-auto flex flex-col mb-40 px-2 mt-8">
      <h1 className="text-4xl text-center my-4">
        Total Registros: {register.length}
      </h1>
      <LineChart
        labels={extendedLabels}
        values={extendedValues}
        title="Registros ValleIn"
      />
    </div>
  );
};
