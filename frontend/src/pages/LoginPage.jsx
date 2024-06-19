import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card'
import Label from '../components/ui/Label'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/') // Redirect to main page after successful login
    } catch (error) {
      setError('Failed to log in')
    }
  }

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-950'>
      <form onSubmit={handleLogin}>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>Welcome back</CardTitle>
            <CardDescription>Enter your email and password to access your account.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' value={email} placeholder='m@example.com' onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full'>Sign in</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default LoginPage
