import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import MainViewPage from './pages/MainViewPage'
import DataEntryPage from './pages/DataEntryPage'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

import './index.css'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'

const App = () => {
  return (
    <MantineProvider>
      <Notifications />
      <AuthProvider>
        <ModalsProvider>
          <Router>
            <Header />
            <Routes>
              <Route exact path='/login' element={<LoginPage />} />
              <Route exact path='/' element={<PrivateRoute />}>
                <Route exact path='/' element={<MainViewPage />} />
              </Route>
              <Route exact path='/data-entry' element={<PrivateRoute />}>
                <Route exact path='/data-entry' element={<DataEntryPage />} />
              </Route>
            </Routes>
            <Footer />
          </Router>
        </ModalsProvider>
      </AuthProvider>
    </MantineProvider>
  )
}

export default App
