import React from 'react'
import { Table as MantineTable } from '@mantine/core'
export function Table ({ children, className }) {
  return <MantineTable className={`min-w-full ${className}`}>{children}</MantineTable>
}

export function TableHeader ({ children }) {
  return <MantineTable.Thead className='bg-gray-200'>{children}</MantineTable.Thead>
}

export function TableRow ({ children }) {
  return <MantineTable.Tr>{children}</MantineTable.Tr>
}

export function TableHead ({ children }) {
  return (
    <MantineTable.Th className='px-4 py-2 text-left text-gray-600 font-medium'>
      {children}
    </MantineTable.Th>
  )
}

export function TableBody ({ children }) {
  return <MantineTable.Tbody className='bg-white divide-y divide-gray-200'>{children}</MantineTable.Tbody>
}

export function TableCell ({ children }) {
  return (
    <MantineTable.Td className='px-4 py-2 text-gray-900'>
      {children}
    </MantineTable.Td>
  )
}
