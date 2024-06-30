import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { fetcher, notifyError } from '../utils/utils'
import Button from '../components/ui/Button'
import NewRecordForm from '../components/NewRecordForm'
import { modals } from '@mantine/modals'
import { Badge, Menu, Group } from '@mantine/core'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/Table'
import useSWR from 'swr'
import axios from 'axios'

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

  const [userName, setUserName] = useState('')

  useEffect(() => {
    axios.get('api/user/current').then((response) => { setUserName(response.data.name) })
  }, [])

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

  function FileIcon (props) {
    return (
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' />
        <path d='M14 2v4a2 2 0 0 0 2 2h4' />
      </svg>
    )
  }

  function LogOutIcon (props) {
    return (
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
        <polyline points='16 17 21 12 16 7' />
        <line x1='21' x2='9' y1='12' y2='12' />
      </svg>
    )
  }

  function MenuIcon (props) {
    return (
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <line x1='4' x2='20' y1='12' y2='12' />
        <line x1='4' x2='20' y1='6' y2='6' />
        <line x1='4' x2='20' y1='18' y2='18' />
      </svg>
    )
  }

  function PlusIcon (props) {
    return (
      <svg
        {...props}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M5 12h14' />
        <path d='M12 5v14' />
      </svg>
    )
  }

  return (
    <div className='flex flex-col h-full mt-16'>
      <header className='bg-gray-100 dark:bg-gray-800 py-4 px-6 md:px-8'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Hi {userName}</h1>
          <div className='flex gap-4'>
            <Button onClick={handleAddRow} visibleFrom='md' className='inline-flex'>
              New Record
            </Button>
            <Button onClick={handleAddRow} hiddenFrom='md' className='md:hidden inline-flex'>
              <PlusIcon className='w-5 h-5' />
              <span className='sr-only'>New Record</span>
            </Button>
            <Menu>
              <Menu.Target>
                <Button variant='ghost' size='icon' className='inline-flex'>
                  <MenuIcon className='w-5 h-5' />
                  <span className='sr-only'>Menu</span>
                </Button>
              </Menu.Target>
              <Menu.Dropdown align='end' className='w-48'>
                <Menu.Item onClick={handleGenerateReport}>
                  <Group gap='xs'>
                    <FileIcon className='w-4 h-4' />
                    Generate Report
                  </Group>
                </Menu.Item>

                <Menu.Item onClick={handleLogout}>
                  <Group gap='xs'>
                    <LogOutIcon className='w-4 h-4' />
                    Logout
                  </Group>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
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
