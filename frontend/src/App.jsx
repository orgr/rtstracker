import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import MainViewPage from './pages/MainViewPage'
import DataEntryPage from './pages/DataEntryPage'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import './index.css'

const App = () => {
  return (
    <Router>
      <Header />
      <AuthProvider>
        <Routes>
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<MainViewPage />} />
          </Route>
          <Route exact path='/data-entry' element={<PrivateRoute />}>
            <Route exact path='/data-entry' element={<DataEntryPage />} />
          </Route>
        </Routes>
      </AuthProvider>
      <Footer />
    </Router>
  )
}

export default App
