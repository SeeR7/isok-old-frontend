import React from 'react'
import { useGetAgregatsQuery } from '../../rtk/api/foreignAPI'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const AgregatSelect: React.FC = () => {
    const {data} = useGetAgregatsQuery('')
    const navigate = useNavigate();
    
  return (
    <div>
      <h2>Агрегаты</h2>
      {data && data.map((proj: any) => (
        <Button style={{display:"block", color:"black", marginLeft:"30px"}} onClick={() => { navigate("/tasks/agregat/" + proj.id) }} key={proj.id} value={proj.id}>{proj.dseCode + " " + proj.name}</Button>
      ))}
    </div>
  )
}

export default AgregatSelect