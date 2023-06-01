import './Table.css';

import React, {useState} from "react"
import { SortingState, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"

export type Flight = {
  airline: string
  flight_date: string
  checked_at: string
  departure_iata: string
  arrival_iata: string
  economy_class: number
  premium_class: number
  business_class: number
  first_class: number
}

const columnHelper = createColumnHelper<Flight>()

const columns = [
  columnHelper.accessor('airline', {
    header: 'Airline',
  }),
  columnHelper.accessor('flight_date', {
    cell: info => info.getValue(),
    header: 'Flight Date'
  }),
  columnHelper.accessor(row => row.checked_at, {
    id: 'lastChecked',
    header: 'Last Checked',
    cell: info => <i>{info.getValue()}</i>,
  }),
  columnHelper.accessor('departure_iata', {
    header: 'Departs',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('arrival_iata', {
    header: 'Arrives',
  }),
  columnHelper.accessor('economy_class', {
    header: 'Economy',
  }),
  columnHelper.accessor('premium_class', {
    header: 'Premium Economy',
  }),
  columnHelper.accessor('business_class', {
    header: 'Business',
  }),
  columnHelper.accessor('first_class', {
    header: 'First',
  }),
]

interface TableProps {
  inputData: Flight[]
}

export default function Table({inputData}: TableProps) {
  // Table component logic and UI come here
  const [ data ] = React.useState(() => [...inputData])
  // const rerender = React.useReducer(() => ({}), {})[1]
  const [ sorting, setSorting ] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="p-2">
      <div className='div-header'>
        <div className="to-left">
          <span>Show </span>
          <select value={table.getState().pagination.pageSize} onChange={e => {table.setPageSize(Number(e.target.value))}}>
            {[10, 20, 30, 40, 50].map(pageSize => (<option key={pageSize} value={pageSize}>{pageSize}</option>))}
          </select> 
          <span> Entries</span>
        </div>
      </div>
      
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <span className="flex items-center gap-1 to-left">
        Showing {table.getState().pagination.pageIndex + 1} to {table.getState().pagination.pageIndex + table.getState().pagination.pageSize} of {table.getState().pagination.pageSize}
      </span>
      <div className="flex items-center gap-2 to-right">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>
      {/* <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button> */}
    </div>
  )
}