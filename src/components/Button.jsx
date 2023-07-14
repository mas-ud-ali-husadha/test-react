const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-cyan-500 py-2 px-4 rounded-md text-xs text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
