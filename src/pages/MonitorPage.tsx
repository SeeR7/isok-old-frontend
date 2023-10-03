import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from '../img/Gear.png'
import Table from '../components/tables/Table';

const MonitorPage: React.FC = () => {
  return (
    <div style={{display:'flex', margin:0, alignItems:'center'}}>
      <Table/>
      <Card sx={{ maxWidth: 600 , margin: 'auto'}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Информационная система оперативного контроля состояния технологических процессов
        </Typography>
        <CardMedia
        sx={{ height: 300 }}
        image={Image}
        title="green iguana"
      />
        <Typography variant="body2" color="text.secondary">
        <br/>Программа разработана студентом группы ПРО-422 Вершковым Сергеем Сергеевичем.
        </Typography>
        <Typography color="text.secondary" sx={{margin: 'auto'}}>
        <br/>Уфа, 2023
        </Typography>
      </CardContent>
    </Card>
    </div>
  )
}

export default MonitorPage
