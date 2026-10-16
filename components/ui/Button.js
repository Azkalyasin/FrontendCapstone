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
    primary: 'border-primary-700 bg-primary-700 text-white hover:border-primary-800 hover:bg-primary-800 focus:ring-primary-500',
    secondary: 'border-slate-600 bg-slate-600 text-white hover:border-slate-700 hover:bg-slate-700 focus:ring-slate-500',
    outline: 'border-slate-300 bg-white text-slate-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 focus:ring-primary-500',
    danger: 'border-rose-700 bg-rose-700 text-white hover:border-rose-800 hover:bg-rose-800 focus:ring-rose-500',
    ghost: 'border-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
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
