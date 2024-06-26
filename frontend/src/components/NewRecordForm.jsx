import Button from './ui/Button'
import SearchableSelectAsync from './ui/SearchableSelectAsync'
import { Autocomplete, Checkbox, NumberInput, Group, Textarea, Select } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

import { notifyError } from '../utils/utils'

const NewRecordForm = ({ className, children, ...props }) => {
  const form = useForm({
    mode: 'uncontrolled',

    initialValues: {
      date: null,
      wmu: '',
      project: '',
      task: '',
      time: null,
      time_charge: null,
      mileage: null,
      mileage_chargable: false,
      description: ''
    },

    validate: {
      date: (value) => value ? null : 'Please fill in a value',
      wmu: (value) => value ? null : 'Please fill in a value',
      project: (value) => value ? null : 'Please fill in a value',
      task: (value) => value ? null : 'Please fill in a value',
      time: (value) => value ? null : 'Please fill in a value',
      time_charge: (value) => value ? null : 'Please fill in a value',
      mileage: (value) => value ? null : 'Please fill in a value'
    }
  })

  const { currentUser } = useAuth()

  const handleSubmit = async (values) => {
    await axios.post('api/records', {
      user_pid: currentUser,
      // TODO: remove hardcoded value
      wmu_id: 1,
      // clean the time from the datetime value
      date: values.date.toJSON().split('T')[0],
      project: values.project,
      task: values.task,
      time_charge: values.time_charge,
      description: values.description,
      time: values.time,
      mileage: values.mileage,
      mileage_chargable: values.mileage_chargable
    }).catch((error) => {
      console.log(error)
      notifyError(error)
    })
    if (props.onSubmitExtra) {
      props.onSubmitExtra()
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <DatePickerInput
        withAsterisk
        mt='md'
        label='Date'
        placeholder='Pick date'
        key={form.key('date')}
        {...form.getInputProps('date')}
      />

      <Autocomplete
        withAsterisk
        mt='md'
        label='WMU'
        placeholder=''
        data={['React', 'Angular', 'Vue', 'Svelte']}
        key={form.key('wmu')}
        {...form.getInputProps('wmu')}
      />

      <SearchableSelectAsync
        withAsterisk
        mt='md'
        label='Project'
        placeholder=''
        dataSource='api/records/projects'
        key={form.key('project')}
        {...form.getInputProps('project')}
      />

      <SearchableSelectAsync
        withAsterisk
        mt='md'
        label='Task'
        placeholder=''
        dataSource='api/records/tasks'
        key={form.key('task')}
        {...form.getInputProps('task')}
      />

      <NumberInput
        withAsterisk
        mt='md'
        label='Time'
        placeholder='-'
        allowNegative={false}
        key={form.key('time')}
        {...form.getInputProps('time')}
      />

      <Select
        withAsterisk
        mt='md'
        label='Time Charge'
        data={['Option 1', 'Option 2', 'Option 3']}
        placeholder='-'
        key={form.key('time_charge')}
        {...form.getInputProps('time_charge')}
      />

      <Group>
        <NumberInput
          withAsterisk
          mt='md'
          label='Mileage'
          placeholder='-'
          allowNegative={false}
          key={form.key('mileage')}
          {...form.getInputProps('mileage')}
        />

        <Checkbox
          mt='md'
          label='Mileage Chargable'
          placeholder='your@email.com'
          key={form.key('mileage_chargable')}
          {...form.getInputProps('mileage_chargable')}
        />
      </Group>

      <Textarea
        mt='md'
        label='Description'
        key={form.key('description')}
        {...form.getInputProps('description')}
      />
      <Button type='submit' mt='md'>Submit</Button>
    </form>
  )
}
export default NewRecordForm
