import React from 'react'
import AdminPage from './AdminHome'
import { cookies } from 'next/headers'

const admin_home = async () => {
  
  const cookieStore = cookies()
  const token = await cookieStore.get('token')?.value
  return (
    <div>
      <AdminPage initialToken = {token} />
    </div>
  )
}

export default admin_home