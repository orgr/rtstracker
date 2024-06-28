import Button from './ui/Button'
import SearchableSelectAsync from './ui/SearchableSelectAsync'
import { Checkbox, NumberInput, Group, Textarea, Select } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { modals } from '@mantine/modals'

import NewWmuForm from './NewWmuForm'
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
      wmu_id: values.wmu.id,
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

  const handleOnCreateWmu = (value) => {
    const initialValues = { name: value }
    const modalId = 'new_wmu_modal'
    modals.open({
      modalId,
      title: 'New WMU',
      children: (
        <NewWmuForm initialValues={initialValues} onSubmitExtra={() => { modals.close(modalId) }} />
      )
    })
  }

  const getWmus = async () => {
    return await axios.get('api/wmus').then((response) => response.data.map((item) => item))
  }
  const renderWmuOption = (option) => (
    option.name
  )
  const getProjects = async () => {
    return await axios.get('api/records/projects').then((response) => response.data)
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

      <SearchableSelectAsync
        withAsterisk
        mt='md'
        label='WMU'
        placeholder=''
        dataSource={getWmus}
        optionName='WMU'
        onCreateNewItem={handleOnCreateWmu}
        renderOption={renderWmuOption}
        key={form.key('wmu')}
        {...form.getInputProps('wmu')}
      />

      <SearchableSelectAsync
        withAsterisk
        mt='md'
        label='Project'
        placeholder=''
        dataSource={getProjects}
        key={form.key('project')}
        {...form.getInputProps('project')}
      />

      <Select
        withAsterisk
        mt='md'
        label='Task'
        placeholder=''
        data={['Task 1', 'Task 2', 'TODO: make a tasks table and fetch from there']}
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
