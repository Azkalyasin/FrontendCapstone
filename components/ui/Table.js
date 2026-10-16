export function Table({ columns, data, actions }) {
  return (
    <div className="overflow-x-auto border border-black bg-white">
      <table className="w-full table-fixed border-collapse">
        <thead className="border-b border-black bg-[#f6f7f7]">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-3 py-[9px] text-left text-[10px] font-medium text-gray-700 uppercase tracking-wide"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
            {actions && (
              <th className="px-2 py-[9px] text-left text-[10px] font-medium text-gray-700 uppercase tracking-wide" style={{ width: '9%' }}>
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-black bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-4 py-8 text-center text-sm text-gray-600"
              >
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-3 py-2 text-[10px] leading-[11px] text-gray-900">
                    {column.render ? column.render(row) : row[column.accessor]}
                  </td>
                ))}
                {actions && (
                  <td className="px-0 py-2 text-sm">
                    <div className="flex gap-1">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
