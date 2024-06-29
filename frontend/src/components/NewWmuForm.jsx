import Button from './ui/Button'
import { TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'

import { notifyError } from '../utils/utils'

const NewWmuForm = ({ className, children, ...props }) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: props.initialValues || {
      name: '',
      description: ''
    },

    validate: {
      name: (value) => value ? null : 'Please fill in a value'
    }
  })

  const handleSubmit = async (values) => {
    await axios.post('api/wmus', {
      name: values.name,
      description: values.description
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
      <TextInput
        withAsterisk
        mt='md'
        label='Name'
        placeholder=''
        key={form.key('name')}
        {...form.getInputProps('name')}
      />

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
export default NewWmuForm
