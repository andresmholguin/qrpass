import ExcelJS from "exceljs";

export const ExportExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Datos");

  // Agregar encabezados
  worksheet.columns = Object.keys(data[0]).map((key) => ({
    header: key.toUpperCase(),
    key,
    width: 20,
  }));
  console.log("encabezados agregados");

  // Agregar filas
  data.forEach((row) => worksheet.addRow(row));
  console.log("agregando filas");

  // Generar archivo y descargar
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  console.log("archivo generado");

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "datos.xlsx";
  link.click();
};
