import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

interface PreviewFileProps {
  selectedFiles: File[];
}

const PreviewFile: React.FC<PreviewFileProps> = ({
  selectedFiles,
}: {
  selectedFiles: File[];
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(selectedFiles);

    const readFile = async () => {
      setLoading(true);
      setError(null);

      try {
        const reader = new FileReader();
        reader.readAsBinaryString(selectedFiles[0]);
        reader.onload = (e: any) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: '',
          });
          setData(parsedData);
        };
      } catch (error) {
        setError('Error reading or parsing the file.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    console.log(data);

    if (selectedFiles.length > 0) {
      readFile();
    }
  }, [selectedFiles]);

  if (
    selectedFiles[0].type !==
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return (
      <div>
        <p className="text-red-500 text-center">{t('notAFile')}</p>
      </div>
    );
  } else
    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {data.length > 0 && (
          <Table size="small" className="border border-gray-300">
            <TableHead className="bg-gray-200 font-semibold text-lg">
              <TableRow>
                {data[0].map((header: any, index: number) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(1).map((row: any, index: number) => (
                <TableRow key={index}>
                  {row.map((cell: any, ind: number) => (
                    <TableCell key={ind}>{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    );
};

export default PreviewFile;
