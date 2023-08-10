type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...rest }: InputProps) => {
  return <input className={`h-9 w-[320px] ${className}`} {...rest} />;
};

export default Input;
