import React from 'react'
import { useGetProjectAgregatsQuery, useGetSostavQuery } from '../../rtk/api/foreignAPI'
import { Link } from 'react-router-dom'



const AgregatTable= (props:any) => {
  const {data, isLoading} = useGetProjectAgregatsQuery({id:props.id})


  if (isLoading) {
    return (
      <div>
        Загрузка...
      </div>
    )
  }
  return (
    <div>
      <h2>Изделия по проекту</h2>
      <table className='styled-table'>
        <thead>
          <tr>
            <th rowSpan={2}>Обозначение</th>
            <th rowSpan={2}>Наименование</th>
            <th colSpan={3}>Количество установочной партии</th>
          </tr>
          <tr>
            <th>Всего сдать</th>
            <th>Для испытаний</th>
            <th>Для отгрузки</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((agr:any) => (
            <tr key={agr.id}>
              <td><Link about='1' to={'/tasks/agregat/' + agr.agregatId} className='nav-link text-light'>{agr.agregatName}</Link></td>
              <td>{agr.description}</td>
              <td>{agr.kolvoUstPart}</td>
              <td>{agr.kolvoIzdIsp}</td>
              <td>{agr.kolvoIzdOtg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AgregatTable