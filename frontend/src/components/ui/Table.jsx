import React from "react"

export function Table({ children, className }) {
	return <table className={`min-w-full ${className}`}>{children}</table>
}

export function TableHeader({ children }) {
	return <thead className="bg-gray-200">{children}</thead>
}

export function TableRow({ children }) {
	return <tr>{children}</tr>
}

export function TableHead({ children }) {
	return (
		<th className="px-4 py-2 text-left text-gray-600 font-medium">
			{children}
		</th>
	)
}

export function TableBody({ children }) {
	return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
}

export function TableCell({ children }) {
	return (
		<td className="px-4 py-2 text-gray-900">
			{children}
		</td>
	)
}
