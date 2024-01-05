export function downloadFileXlsx({
  data,
  fileName,
}: {
  data: Blob;
  fileName: string;
}) {
  const blob = data;
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = `${fileName}.xlsx`;
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
