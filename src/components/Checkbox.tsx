type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

const Checkbox = (props: CheckboxProps) => {
  return <input className="h-4 w-4" type="checkbox" {...props} />;
};

export default Checkbox;
