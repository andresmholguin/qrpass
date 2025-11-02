import React from "react";
import ExcelJS from "exceljs";

export default function ExportExcelButton({ data }) {
  const exportToExcel = async () => {
    if (!data || data.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Registros");

    // 🟦 Agregar encabezados (basados en las claves del primer objeto)
    worksheet.columns = Object.keys(data[0]).map((key) => ({
      header: key.toUpperCase(),
      key,
      width: 20,
    }));

    // 🟩 Agregar filas
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    // 🟨 Estilo de encabezado
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "4472C4" },
    };

    // 🟧 Crear el archivo en memoria
    const buffer = await workbook.xlsx.writeBuffer();

    // 🟪 Crear blob y descargar
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Exportar a Excel
    </button>
  );
}
