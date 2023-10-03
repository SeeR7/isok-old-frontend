import React from 'react'
import { useGetProjectQuery } from '../../rtk/api/foreignAPI'

const AboutTable = (props: any) => {
  const { data } = useGetProjectQuery({ id: props.id })

  return (

    <div>
      <h2>{data && data.projectType + " №" + data.projectNumber}</h2>
      <table className='styled-table'>
            <thead>
              <tr>
              <th>Срок сдачи</th>
              <th>Потребитель</th>
              <th>Назначение</th>
              <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>{new Date(data && data.srokDate).toLocaleDateString('ru')}</td>
              <td>{data && data.consumer}</td>
              <td>{data && data.destination}</td>
              <td>Действующий</td>
              </tr>
            </tbody>

      </table>
    </div>
  )
}

export default AboutTable