import App from '@/Layouts/App'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Show(props) {
    const {user} = props
  return (
    <div>
        <Head title={`Chat with ${user.username}`} />
    </div>
  )
}

Show.layout = (page) => <App children={page} />
