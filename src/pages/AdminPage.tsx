import React from 'react'
import { Link } from 'react-router-dom'

const AdminPage: React.FC = () => {
  return (
    <div>
      <h2>Техническая поддержка</h2>
      <Link style={{marginLeft:"30px"}} to='/admin/user' className='nav-link text-light'>Пользователи</Link><br/>
      <h2>Локальные данные</h2>
      <Link style={{marginLeft:"30px"}} to='/admin/department' className='nav-link text-light'>Подразделения</Link>
    </div>
  )
}

export default AdminPage