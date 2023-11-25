import App from '@/Layouts/App'
import React from 'react'

export default function Home() {
  return (
    <div className='px-6 py-4'>
    Start chat
    </div>
  )
}

Home.layout = (page) => <App children={page}  title="Chattan App" />
