import React from 'react'
import { Button as MantineButton } from '@mantine/core'
const Button = ({ className, children, ...props }) => {
  return (
    <MantineButton className={`btn ${className}`} {...props}>
      {children}
    </MantineButton>
  )
}

export default Button
