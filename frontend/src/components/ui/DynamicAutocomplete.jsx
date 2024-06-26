import React from 'react'
import { Autocomplete } from '@mantine/core'
import useSWR from 'swr'
import { notifyError, fetcher } from '../../utils/utils'

const DynamicAutocomplete = ({ dataSource, ...props }) => {
  const { data, error, isLoading } = useSWR(dataSource, fetcher, {
    onError: (error) => notifyError(error),
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (retryCount >= 2) {
        return
      }
      setTimeout(() => revalidate({ retryCount }), 5000)
    }
  })
  if (error || isLoading) {
    return (
      <Autocomplete
        data={null}
        {...props}
      />
    )
  }
  return (
    <Autocomplete
      data={data}
      {...props}
    />
  )
}

export default DynamicAutocomplete
