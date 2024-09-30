'use client';
import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';

export interface Transaction {
  amount: number;
  description: string;
  category?: string;
  date: string;
};

const columnHelper = createColumnHelper();

// Create an editable cell component
const EditableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const isEditing = table.options.meta?.editingRow === row.id;

  if (!isEditing) {
    return flexRender(column.columnDef.cell, { getValue });
  }

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <input
      value={value as string}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
      className="w-full p-2 border rounded"
    />
  );
};

export const TransactionsTable = ({
  transactions,
  readOnly = false
}: {
  transactions: Transaction[],
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingRow, setEditingRow] = useState<string | null>(null);

  const columns = [
    columnHelper.accessor('date', {
      cell: info => new Date(Number(info.getValue())).toLocaleDateString(),
      header: () => 'Date',
    }),
    columnHelper.accessor('amount', {
      cell: info => `$${(info.getValue() as number).toFixed(2)}`,
      header: () => 'Amount',
    }),
    columnHelper.accessor('category', {
      cell: info => (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          { info.getValue() ? info.getValue() : 'N/A' }
        </span>
      ),
      header: () => 'Category',
    }),
    columnHelper.accessor('description', {
      cell: info => info.getValue(),
      header: () => 'Description',
    }),
    ...(readOnly ? [columnHelper.accessor('action', {
      cell: ({ row }) => (
        <button
          onClick={() => setEditingRow(editingRow === row.id ? null : row.id)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editingRow === row.id ? 'Save' : 'Edit'}
        </button>
      ),
      header: () => 'Actions',
    })] : [])
  ];
    
  const table = useReactTable({
    data: transactions,
    columns: columns as ColumnDef<any, any>[],
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {},
  });

  if (transactions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No transactions found. Add some transactions to get started!</p>
        {/* You could add a button here to guide users to add transactions */}
      </div>
    );
  }


  return (
    <div className="overflow-x-auto border-8 border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}