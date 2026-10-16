export function Textarea({ 
  label, 
  placeholder,
  value,
  onChange,
  error,
  rows = 4,
  className = '',
  required = false,
  ...props 
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-0.5 block text-[10px] font-medium leading-3 text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full resize-y border border-slate-300 bg-white px-3 py-1.5 text-xs
          focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
          ${error ? 'border-red-600' : ''}
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
