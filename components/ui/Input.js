export function Input({ 
  label, 
  type = 'text', 
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = '',
  required = false,
  ...props 
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-0.5 block text-[10px] font-medium leading-3 text-gray-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-xs text-gray-600">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full border px-3 py-1 text-xs
            border-black bg-white focus:outline-none focus:ring-1 focus:ring-black
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-600' : ''}
            disabled:bg-gray-100 disabled:cursor-not-allowed
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
