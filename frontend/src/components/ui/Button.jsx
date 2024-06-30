import React, { forwardRef } from 'react'
import { Button as MantineButton } from '@mantine/core'

const Button = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <MantineButton ref={ref} className={`btn ${className}`} {...props}>
      {children}
    </MantineButton>
  )
})

export default Button
