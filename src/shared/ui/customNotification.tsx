import { forwardRef } from 'react'
import { CustomContentProps, SnackbarContent } from 'notistack'
import { Typography } from './typography'

interface ICustomNotifications extends CustomContentProps {}

export const CustomNotification = forwardRef<
  HTMLDivElement,
  ICustomNotifications
>(({ ...props }, ref) => {
  return (
    <SnackbarContent ref={ref} className=''>
      <Typography variant='h5'>{props.message}</Typography>
    </SnackbarContent>
  )
})
