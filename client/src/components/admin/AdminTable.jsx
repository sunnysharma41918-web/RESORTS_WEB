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
    <div className="space-y-4 select-none font-manrope">
      {/* Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF1F02] pointer-events-none" />
          <FormInput
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-10 pr-9 py-2.5 text-xs rounded-none bg-[#0E0E0E] border-[#333333] focus:border-[#FF1F02]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-[#888888]">
          Showing <span className="text-[#FF1F02] font-bold">{filteredData.length}</span> of{' '}
          <span className="text-white font-bold">{data.length}</span> items
        </div>
      </div>

      {/* Table Frame */}
      <div className="overflow-x-auto border border-[#333333] bg-[#0E0E0E] shadow-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#333333] bg-[#161616] text-[#A0A0A0] font-mono text-[11px] uppercase tracking-wider">
              {columns.map((col) => (
                <th key={col.key || col.header} className="p-4 font-semibold">
                  {col.header}
                </th>
              ))}
              {actions && <th className="p-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222222] text-white">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="p-10 text-center text-[#777777] font-mono">
                  No records found matching "{search}".
                </td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr key={row.id || idx} className="hover:bg-white/[0.03] transition-colors">
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
