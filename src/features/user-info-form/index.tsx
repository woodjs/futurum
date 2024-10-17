'use client'
import { DynamicForm } from '../../shared/ui/dynamic-form'
import Editor from '../../shared/ui/editor'
import Section from '../../screens/main/section'

const UserInfoForm = () => {
  return (
    <Section>
      <DynamicForm
        fields={{
          login: {
            type: 'text',
            label: 'Login',
            placeholder: 'Enter your login',
          },
          email: {
            type: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
          },
          name: {
            type: 'text',
            label: 'Name',
            placeholder: 'Enter your names',
          },
          lastName: {
            type: 'text',
            label: 'Last Name',
            placeholder: 'Enter your last name(or first letter)',
          },
          country: {
            type: 'text',
            label: 'Country',
            placeholder: 'Enter your country',
          },
        }}
        renderFooter={() => null}
      />
      <Editor content='' />
      <DynamicForm
        fields={{
          phone: {
            type: 'text',
            label: 'Phone',
            placeholder: 'Enter your phone number',
          },
          whatsapp: {
            type: 'text',
            label: 'Whatsapp',
            placeholder: 'Enter your Whatsapp',
          },
          telegram: {
            type: 'text',
            label: 'Telegram',
            placeholder: 'Enter your Telegram',
          },
        }}
        renderFooter={() => null}
      />
    </Section>
  )
}

export default UserInfoForm
