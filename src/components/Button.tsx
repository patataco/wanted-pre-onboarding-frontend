type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, type = 'button', className, ...rest }: ButtonProps) => {
  return (
    <button type={type} className={`h-8 border-blue-300 px-2 ${className} border`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
