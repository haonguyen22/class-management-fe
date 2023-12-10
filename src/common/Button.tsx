interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
