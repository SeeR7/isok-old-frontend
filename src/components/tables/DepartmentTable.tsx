import React, { useState } from 'react'
import { useDeleteDepartmentMutation, useGetDepartmentsQuery, useUpdateDepartmentMutation } from '../../rtk/api/departmentAPI'
import { IDepartment } from '../../rtk/features/departmentSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import FormDialog from '../forms/FormDialog';

const DepartmentTable: React.FC = () => {
  const [{ dep, toggle }, setToggle] = useState({ dep: 0, toggle: true })
  const { data: sortedDep } = useGetDepartmentsQuery('')
  
  const [deleteDepartment] = useDeleteDepartmentMutation()
  const [updateDepartment] = useUpdateDepartmentMutation()

  const [inputName, setInputName] = useState('');
  const [inputNumber, setInputNumber] = useState(0);
  const [inputType, setInputType] = useState('');

  const sortNameA = (a: IDepartment, b: IDepartment) => a.name > b.name ? 1 : -1 //1
  const sortNameD = (a: IDepartment, b: IDepartment) => b.name > a.name ? 1 : -1 //2

  const sortNumA = (a: IDepartment, b: IDepartment) => a.number - b.number //3
  const sortNumD = (a: IDepartment, b: IDepartment) => b.number - a.number //4

  const sortTypeA = (a: IDepartment, b: IDepartment) => a.type > b.type ? 1 : -1 //5
  const sortTypeD = (a: IDepartment, b: IDepartment) => b.type > a.type ? 1 : -1 //6



  const [sort, setSort] = useState(() => sortNumA)
  const [toggleSort, setToggleSort] = useState(3)

  const handleSort = (a: number) => {
    switch (a) {
      case 1:
        if (toggleSort === 1) {
          setToggleSort(2)
          setSort(() => sortNameD)
        }
        else {
          setToggleSort(1)
          setSort(() => sortNameA)
        }
        break;
      case 2:
        if (toggleSort === 3) {
          setToggleSort(4)
          setSort(() => sortNumD)
        }
        else {
          setToggleSort(3)
          setSort(() => sortNumA)
        }
        break;
      case 3:
        if (toggleSort === 5) {
          setToggleSort(6)
          setSort(() => sortTypeD)
        }
        else {
          setToggleSort(5)
          setSort(() => sortTypeA)
        }
        break;
    }
  }

  let counter = 0

  const handleDelete = async (id: any) => {
    await deleteDepartment({ id: id })
  }

  const handleUpdate = async (id: any) => {
    let data = {
      id: id,
      name: inputName,
      number: inputNumber,
      type: inputType,
    }
    await updateDepartment(data)
    setToggle({ dep: 0, toggle: true })
  }





  return (
    <div>
      <h2>Подразделения</h2>
      <FormDialog/>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>№</th>
            <th onClick={() => handleSort(1)}>Название</th>
            <th onClick={() => handleSort(2)}>Номер</th>
            <th onClick={() => handleSort(3)}>Тип<br />подразделения</th>
            <th colSpan={2}>Действие</th>
          </tr>
        </thead>
        <tbody>
          {sortedDep && [...sortedDep].sort(sort).map((department: IDepartment) =>
            <tr key={department.id}>
              {toggle || (department.id !== dep)
                ?
                <>
                  <td>{counter += 1}</td>
                  <td>{department.name}</td><td>{department.number}</td>
                  <td>{department.type}</td>
                  <td><EditIcon color="primary" onClick={() => {
                    setToggle({ dep: department.id, toggle: false });
                    setInputName(department.name);
                    setInputNumber(department.number);
                    setInputType(department.type);
                  }} /></td>
                  <td><DeleteIcon color='secondary' onClick={() => handleDelete(department.id)} /></td>
                </>
                : <>
                  <td>{counter += 1}</td>
                  <td><input type="text" id='nameUpd' value={inputName} onChange={(e) => setInputName(e.target.value)}></input></td>
                  <td><input size={2} type="number" id='numberUpd' defaultValue={inputNumber} onChange={(e) => setInputNumber(parseInt(e.target.value))}></input></td>
                  <td>
                    <select name='depUpd' id="typeUpd" onChange={(e) => setInputType(e.target.value)}>
                      <option disabled selected>{department.type}</option>
                      {<option value={"Отдел"}>Отдел</option>}
                      <option value={"Цех"}>Цех</option>
                      <option value={"Склад"}>Склад</option>
                    </select>
                  </td>
                  <td><SaveIcon  color='success' type="submit" onClick={(e) => handleUpdate(department.id)} /></td>
                  <td><CancelIcon color='error' onClick={() => setToggle({ dep: 0, toggle: true })} /></td></>}

              
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DepartmentTable