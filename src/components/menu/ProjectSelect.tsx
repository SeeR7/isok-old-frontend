import React from 'react'
import { useGetProjectsQuery } from '../../rtk/api/foreignAPI'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const ProjectSelect: React.FC = () => {

  const { data } = useGetProjectsQuery('')
  const navigate = useNavigate();


  return (
    <div>
      <h2>Проекты</h2>
      {data && data.map((proj: any) => (
        <Button style={{display:"block", color:"black", marginLeft:"30px"}} onClick={() => { navigate("/tasks/project/" + proj.id) }} key={proj.id} value={proj.id}>{proj.projectType + " №" + proj.projectNumber}</Button>
      ))}
    </div>
  )
}

export default ProjectSelect