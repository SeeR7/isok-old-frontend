import React from 'react'
import { useGetDsesQuery } from '../../rtk/api/foreignAPI'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'

const DseSelect: React.FC = () => {
    const {data} = useGetDsesQuery('')
    const navigate = useNavigate();
  return (
    <div>
      <h2>ДСЕ</h2>
      {data && data.map((proj: any) => (
        <Button style={{display:"block", color:"black", marginLeft:"30px"}} onClick={() => { navigate("/tasks/agregat/dse/" + proj.id) }} key={proj.id} value={proj.id}>{proj.dseCode + " " + proj.name}</Button>
      ))}
    </div>
  )
}

export default DseSelect