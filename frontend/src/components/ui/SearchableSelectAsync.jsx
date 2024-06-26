import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { notifyError } from '../../utils/utils'
import { Combobox, InputBase, Loader, useCombobox } from '@mantine/core'

const getAsyncData = async (url) => {
  return await axios.get(url).then((response) => response.data)
}

const SearchableSelectAsync = ({ dataSource, onChange, value, defaultValue, ...props }) => {
  const [search, setSearch] = useState(defaultValue || '')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const combobox = useCombobox({
    onDropdownOpen: () => {
      if (data.length === 0 && !loading) {
        setLoading(true)
        getAsyncData(dataSource).then((response) => {
          setData(response)
          setLoading(false)
          combobox.resetSelectedOption()
        }).catch((error) => notifyError(error))
      }
    }
  })

  useEffect(() => {
    if (value !== undefined) {
      setSearch(value)
    }
  }, [value])

  const exactOptionMatch = data.some((item) => item === search)
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ))

  const handleOptionSubmit = (val) => {
    if (val === '$create') {
      onChange(search)
    } else {
      onChange(val)
      setSearch(val)
    }
    combobox.closeDropdown()
  }

  const handleInputChange = (event) => {
    const newValue = event.currentTarget.value
    setSearch(newValue)
    onChange(newValue)
    combobox.openDropdown()
    combobox.updateSelectedOptionIndex()
  }

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={handleOptionSubmit}
      {...props}
    >
      <Combobox.Target>
        <InputBase
          value={search}
          rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
          rightSectionPointerEvents='none'
          placeholder='Search value'
          onClick={() => combobox.toggleDropdown()}
          onChange={handleInputChange}
          onBlur={() => {
            combobox.closeDropdown()
            setSearch(value || '')
          }}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {loading ? <Combobox.Empty>Loading....</Combobox.Empty> : options}
          {!exactOptionMatch && search && (
            <Combobox.Option value='$create'>+ Create {search}</Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}

export default SearchableSelectAsync
