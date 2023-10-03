import React from 'react'
import { Link } from 'react-router-dom'


const TasksPage: React.FC = () => {
  return (
    <div>
      <h2>Состояние технологических процессов</h2>
      <Link style={{marginLeft:"30px", display:"block"}} to='/tasks/project' className='nav-link text-light'>Проекты</Link>
      <Link style={{marginLeft:"30px", display:"block"}} to='/tasks/agregat' className='nav-link text-light'>Детализация по проектам</Link>
      <Link style={{marginLeft:"30px", display:"block"}} to='/tasks/agregat/dse' className='nav-link text-light'>Карточка ДСЕ</Link>
    </div>
  )
}

export default TasksPage