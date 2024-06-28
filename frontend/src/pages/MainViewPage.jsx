import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { fetcher, notifyError } from '../utils/utils'
import Button from '../components/ui/Button'
import NewRecordForm from '../components/NewRecordForm'
import { modals } from '@mantine/modals'
import { Badge } from '@mantine/core'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/Table'
import useSWR from 'swr'

const MainViewPage = () => {
  const { data, error, isLoading, mutate } = useSWR('api/records', fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      console.log(error)
      if (retryCount >= 10) {
        return
      }
      setTimeout(() => revalidate({ retryCount }), 5000)
    },
    onError: (error, key) => {
      notifyError(error)
    }
  })

  const closeAllModals = () => {
    modals.closeAll()
  }

  const handleAddRow = () => {
    modals.open({
      title: 'New Record',
      children: (
        <NewRecordForm onSubmitExtra={closeAllModals} />
      ),
      onClose: () => { mutate() }
    })
    return null
  }

  const handleGenerateReport = () => {
    console.log('Generating report...')
  }

  const navigate = useNavigate()
  const { logout } = useAuth()
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell>Loading...</TableCell>
        </TableRow>
      )
    }
    if (error) {
      return (
        <TableRow>
          <TableCell>Failed to load data</TableCell>
        </TableRow>
      )
    }
    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell>Nothing to show</TableCell>
        </TableRow>
      )
    }

    return data.map((row) => {
      let mileageCell = <TableCell>{row.mileage}</TableCell>

      if (row.mileage_chargable) {
        mileageCell = (
          <TableCell>
            {row.mileage} <Badge color='red'>£ chargable</Badge>

          </TableCell>
        )
      }
      return (
        <TableRow key={row.id}>
          <TableCell>{row.date}</TableCell>
          <TableCell>{row.manager}</TableCell>
          <TableCell>{row.wmu}</TableCell>
          <TableCell>{row.project}</TableCell>
          <TableCell>{row.task}</TableCell>
          <TableCell>{row.time}</TableCell>
          <TableCell>{row.time_charge}</TableCell>
          {mileageCell}
          <TableCell>{row.description}</TableCell>
        </TableRow>
      )
    }
    )
  }

  return (
    <div className='flex flex-col h-screen mt-16'>
      <header className='bg-gray-100 dark:bg-gray-800 py-4 px-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Data Table</h1>
          <div className='flex gap-4'>
            <Button onClick={handleAddRow}>New Record</Button>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
            <Button variant='subtle' onClick={handleLogout}>Log out</Button>
          </div>
        </div>
      </header>
      <div className='flex-1 overflow-auto'>
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>WMU</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Time Charge</TableHead>
              <TableHead>Mileage</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderTableBody()}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MainViewPage
