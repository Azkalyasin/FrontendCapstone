export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  type = 'button',
  className = '',
  disabled = false,
  onClick,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'border-black bg-black text-white hover:bg-gray-800 focus:ring-gray-500',
    secondary: 'border-gray-600 bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-black bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'border-red-700 bg-red-700 text-white hover:bg-red-800 focus:ring-red-500',
    ghost: 'border-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
  };
  
  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-5 py-[7px] text-xs',
  };
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
