import { useState, useEffect } from "react";
import SupabaseClient from "../SupabaseClient";
import ExportExcel from "./ExportExcel";

export const Users = () => {
  const [register, setRegister] = useState([]);

  const headTable = [
    "Documento",
    "Nombre",
    "Teléfono",
    "Fecha Registro",
    "Acciones",
  ];

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

  const editar = (e) => {
    console.log(e);
  };

  useEffect(() => {
    readApi();
  }, []);

  const fechaLocal = (fecha) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleString();
  };

  return (
    <div className="mb-8">
      <h1 className="text-4xl text-center mb-8">Registros</h1>
      {register.length === 0 && (
        <span className="loading loading-dots loading-xl"></span>
      )}
      <div className="flex justify-end pb-4">
        {/* <button
          className="bg-green-700 w-40 p-2 rounded-lg cursor-pointer hover:bg-green-500 mb-4"
          onClick={exportToExcel}
        >
          Exportar a Excel
        </button> */}
        <ExportExcel data={register} />
      </div>
      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {headTable.map((head, i) => (
                <th
                  key={i}
                  className="px-4 py-2 text-left text-sm font-semibold bg-gray-800 text-gray-50 border"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {register.map((reg) => (
              <tr
                key={reg.id_document_asistants}
                className="bg-gray-100 text-Secondary hover:bg-gray-200"
              >
                <td className="border px-4 py-2 text-sm">
                  {reg.id_document_asistants}
                </td>
                <td className="border px-4 py-2 text-sm text-center">
                  {reg.name_asistants}
                </td>
                <td className="border px-4 py-2 text-sm text-center">
                  {reg.phone_asistants}
                </td>
                <td className="border px-4 py-2 text-sm text-center">
                  {fechaLocal(reg.created_at)}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      className="cursor-pointer bg-Primary text-Secondary px-3 py-1 rounded-lg hover:bg-Secondary hover:text-Primary text-sm"
                      onClick={() => editar(reg.id_document_asistants)}
                    >
                      Editar
                    </button>
                    <button className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-200 hover:text-red-700 text-sm">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td className="border px-4 py-2 font-bold text-sm" colSpan={5}>
                Total Registros: {register.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
