import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { FormInput } from './AdminFormField';

export default function AdminTable({
  columns = [],
  data = [],
  searchKey = 'name',
  searchPlaceholder = 'Search records...',
  actions,
}) {
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((item) => {
      const val = item[searchKey];
      if (typeof val === 'string') {
        return val.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });
  }, [data, search, searchKey]);

  return (
    <div className="space-y-4 select-none font-manrope text-[#111827]">
      {/* Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <FormInput
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-10 pr-9 py-2 text-xs rounded-xl"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing <span className="text-[#134E39] font-bold">{filteredData.length}</span> of{' '}
          <span className="text-gray-800 font-bold">{data.length}</span> items
        </div>
      </div>

      {/* Table Frame */}
      <div className="overflow-x-auto border border-[#E5EAE7] bg-white rounded-2xl shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#E5EAE7] bg-[#F8FAF9] text-gray-600 text-[11px] font-bold uppercase tracking-wider">
              {columns.map((col) => (
                <th key={col.key || col.header} className="p-4">
                  {col.header}
                </th>
              ))}
              {actions && <th className="p-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[#111827]">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="p-10 text-center text-gray-400">
                  No records found matching "{search}".
                </td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-[#F8FAF9] transition-colors">
                  {columns.map((col) => (
                    <td key={col.key || col.header} className="p-4 align-middle">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="p-4 align-middle text-right space-x-2 whitespace-nowrap">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
