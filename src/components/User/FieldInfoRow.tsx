import { Box, TextField } from '@mui/material';

function FieldInfoRow({
  label,
  value,
  onChange,
  icon,
  name,
  disabled = false,
  required = false,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  name?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        margin: '8px',
        marginBottom: '20px',
      }}
    >
      {icon}
      <TextField
        id="input-with-sx"
        className="w-full"
        label={label}
        required={required}
        value={value}
       disabled={disabled}
        onChange={onChange}
        variant="outlined"
        name={name}
      />
    </Box>
  );
}

export default FieldInfoRow;
