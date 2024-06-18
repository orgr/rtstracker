import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from "../components/ui/Button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/Table"

const MainViewPage = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "555-1234",
      amount: 100.0,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-5678",
      amount: 75.5,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "555-9012",
      amount: 150.25,
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      phone: "555-3456",
      amount: 80.75,
    },
    {
      id: 5,
      name: "Tom Davis",
      email: "tom@example.com",
      phone: "555-7890",
      amount: 120.0,
    },
  ])
  const handleAddRow = () => {
    const newRow = {
      id: data.length + 1,
      name: "",
      email: "",
      phone: "",
      amount: 0.0,
    }
    setData([...data, newRow])
  }
  const handleGenerateReport = () => {
    console.log("Generating report...")
  }

  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    navigate('/login')
  }

  return (
    <div className="flex flex-col h-screen mt-16">
      <header className="bg-gray-100 dark:bg-gray-800 py-4 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Data Table</h1>
          <div className="flex gap-4">
            <Button onClick={handleAddRow}>Add Row</Button>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
            <Button onClick={handleLogout}>Log out</Button>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>${row.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


export default MainViewPage;


