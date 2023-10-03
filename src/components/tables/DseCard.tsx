import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetDseCardQuery, useUpdateLocalDseMutation, useUpdateLocalTechMutation } from '../../rtk/api/foreignAPI';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useGetUsersQuery } from '../../rtk/api/userAPI';
import { IEmployee } from '../../rtk/models/IEmployee';
import { useAppSelector } from '../../rtk/store';
import { checkDep, checkFio, checkRole } from '../../rtk/features/authSlice';

const DseCard: React.FC = () => {
    let { id } = useParams();
    const role = useAppSelector(checkRole)
    const fio = useAppSelector(checkFio)
    const dep = useAppSelector(checkDep)
    const [toggle, setToggle] = useState(true)
    const [user, setUser] = useState(fio)
    const [{ depData, toggleDep }, setToggleDep] = useState({ depData: 0, toggleDep: true })
    const { data: userArray , isLoading:isLoadingUser} = useGetUsersQuery('')
    const [updateLocalDse] = useUpdateLocalDseMutation()
    const [updateLocalTech] = useUpdateLocalTechMutation()

    const { data: dse, isLoading:isLoadingDse } = useGetDseCardQuery({ id: id }, {pollingInterval: 5000})
    const [planMechDepDataInput, setPlanMechDepDataInput] = useState('');
    const [quantityMechDepInput, setQuantityMechDepInput] = useState(0);
    const [mechDepСompletionPercentageInput, setMechDepCompletionPercentageInput] = useState(0);
    const [planProdDepDataInput, setPlanProdDepDataInput] = useState('');
    const [completionPercentageInput, setCompletionPercentageInput] = useState(0)
    const [techDateInput, setTechDateInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    
    let counter = 0
    let planMechData: string | null
    let planProdData: string | null
    const handleUpdate = async (dseId: any) => {
        if (planMechDepDataInput === "") {
            planMechData = null
        }
        else {
            planMechData = planMechDepDataInput
        }
        if (planProdDepDataInput === "") {
            planProdData = null
        }
        else {
            planProdData = planProdDepDataInput
        }
        let data = {
            id: dseId,
            dseId: dseId,
            planMechDepData: planMechData,
            quantityMechDep: quantityMechDepInput,
            mechDepСompletionPercentage: mechDepСompletionPercentageInput,
            planProdDepData: planProdData
        }
        await updateLocalDse(data)
        setToggle(true)

    }
    let techDate: string | null
    const handleUpdateTech = async (depRouteId: any, dseId: any) => {
        if (techDateInput === "") {
            techDate = null
        }
        else {
            techDate = techDateInput
        }

        let data = {
            id: depRouteId,
            dseId: dseId,
            depRouteId: depRouteId,
            techDate: techDate,
            TechCompletionPercentage: completionPercentageInput,
            name: user,
            description: descriptionInput
        }
        await updateLocalTech(data)
        setToggleDep({ depData: 0, toggleDep: true })

    }

    if (isLoadingDse || isLoadingUser)
    {
        return (
            <div>Загрузка...</div>
        )
    }

    return (
        <div>
            <h2>{dse && "Карточка ДСЕ: " + dse._1c.dseCode + " " + dse._1c.name}</h2>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th rowSpan={2}>№</th>
                        <th rowSpan={2}>Деталь</th>
                        <th rowSpan={2}>Тип<br />заготовки</th>
                        <th rowSpan={2}>План<br />запуска</th>
                        <th rowSpan={2}>Требуется<br />к дате</th>
                        <th rowSpan={2}>Выдано</th>

                        <th colSpan={4}>Запуск в механическом цехе</th>
                        <th colSpan={2}>Сдано механическим цехом</th>
                        <th rowSpan={2}>Материал</th>
                        <th rowSpan={2}>Действие</th>
                    </tr>
                    <tr>
                        <th style={{ width: 150 }}>Дата</th>
                        <th>Количество</th>
                        <th>Фактически</th>
                        <th style={{ width: 80 }}>%</th>
                        <th style={{ width: 150 }}>Дата</th>
                        <th>Фактически</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        {toggle ?
                            <>
                                <td>{1}</td>
                                <td>{dse && dse._1c.dseCode}</td>
                                <td>{dse && dse.rusagr.zagType}</td>
                                <td>{dse && dse._1c.planZapuska}</td>
                                <td>{dse && new Date(dse._1c.planTrebDate).toLocaleDateString("ru")}</td>
                                <td>{dse && dse._1c.vydano}</td>
                                <td>{dse && dse.local && dse.local.planMechDepData && new Date(dse.local.planMechDepData).toLocaleDateString("ru")}</td>
                                <td>{dse && dse.local && dse.local.quantityMechDep}</td>
                                <td>{dse && dse._1c.quantityMechDep && dse._1c.quantityMechDep + " / " + new Date(dse._1c.factMechDepDate).toLocaleDateString("ru")}</td>
                                <td>{dse && dse.local && dse.local.mechDepСompletionPercentage}</td>
                                <td>{dse && dse.local && dse.local.planProdDepData && new Date(dse.local.planProdDepData).toLocaleDateString("ru")}</td>
                                <td>{dse && dse._1c.quantityProdDep && dse._1c.quantityProdDep + " / " + new Date(dse._1c.factProdDepDate).toLocaleDateString("ru")}</td>
                                <td>{dse && dse.rusagr.material}</td>
                                <td>
                                    {(role === 'Developer' || (role === 'Engineer' && dep === '5') ) && <EditIcon color="primary" onClick={() => {
                                        setToggle(false);
                                        dse && dse.local && dse.local.planMechDepData && setPlanMechDepDataInput(dse.local.planMechDepData.toString().substring(0, 10))
                                        dse && dse.local && setQuantityMechDepInput(dse.local.quantityMechDep)
                                        dse && dse.local && setMechDepCompletionPercentageInput(dse.local.mechDepСompletionPercentage)
                                        dse && dse.local && dse.local.planProdDepData && setPlanProdDepDataInput(dse.local.planProdDepData.toString().substring(0, 10))
                                    }} />}
                                </td>
                            </>
                            :
                            <>
                                <td>{1}</td>
                                <td>{dse && dse._1c.dseCode}</td>
                                <td>{dse && dse.rusagr.zagType}</td>
                                <td>{dse && dse._1c.planZapuska}</td>
                                <td>{dse && new Date(dse._1c.planTrebDate).toLocaleDateString("ru")}</td>
                                <td>{dse && dse._1c.vydano}</td>
                                <td><input type="date" value={planMechDepDataInput.toString().substring(0, 10)} onChange={(e) => setPlanMechDepDataInput(e.target.value.toString().substring(0, 10))}></input></td>
                                <td><input size={4} type="number" id='numberUpd' defaultValue={quantityMechDepInput} onChange={(e) => setQuantityMechDepInput(parseInt(e.target.value))}></input></td>
                                <td>{dse && dse._1c.quantityMechDep && dse._1c.quantityMechDep + " / " + new Date(dse._1c.factMechDepDate).toLocaleDateString("ru")}</td>
                                <td><input size={4} type="number" step={10} min={0} max={100} id='numberUpd' defaultValue={mechDepСompletionPercentageInput} onChange={(e) => setMechDepCompletionPercentageInput(parseInt(e.target.value))}></input></td>
                                <td><input type="date" value={planProdDepDataInput.toString().substring(0, 10)} onChange={(e) => setPlanProdDepDataInput(e.target.value.toString().substring(0, 10))}></input></td>
                                <td>{dse && dse._1c.quantityProdDep && dse._1c.quantityProdDep + " / " + new Date(dse._1c.factProdDepDate).toLocaleDateString("ru")}</td>
                                <td>{dse && dse.rusagr.material}</td>
                                <td>
                                    <SaveIcon color="success" onClick={() => {
                                        handleUpdate(dse && dse.rusagr && dse.rusagr.id);
                                    }} />
                                    <CancelIcon color='error' onClick={() => setToggle(true)} />
                                </td>
                            </>
                        }
                    </tr>
                </tbody>
            </table>
            <h2>Технология</h2>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th rowSpan={2}>№</th>
                        <th rowSpan={2}>Цех<br />изготовитель</th>
                        <th rowSpan={2}>Цех<br />потребитель</th>
                        <th colSpan={3}>Технологический процесс</th>
                        <th rowSpan={2}>Комментарий</th>
                        <th rowSpan={2}>Действие</th>
                    </tr>
                    <tr>
                        <th>ФИО</th>
                        <th>%</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {dse && dse.tech && dse.tech.map((item: any) => (
                        <tr key={item.techRusagr.id}>
                            {toggleDep || (item.techRusagr.id !== depData) ?
                                <>
                                    <td>{counter += 1}</td>
                                    <td>{item.techRusagr.depProd}</td>
                                    <td>{item.techRusagr.depCons}</td>
                                    <td>{item.techLocal && item.techLocal.name}</td>
                                    <td>{item.techLocal && item.techLocal.techCompletionPercentage}</td>
                                    <td>{item.techLocal && item.techLocal.techDate && new Date(item.techLocal.techDate).toLocaleDateString("ru")}</td>
                                    <td>{item.techLocal && item.techLocal.description}</td>
                                    <td>
                                        {(role === "Developer" || dep === '45' || dep === item.techRusagr.depProd)  && <EditIcon color="primary" onClick={() => {
                                            setToggleDep({ depData: item.techRusagr.id, toggleDep: false });
                                            setUser(fio);
                                            setCompletionPercentageInput(0);
                                            setTechDateInput('');
                                            setDescriptionInput('');
                                            item.techLocal && setUser(item.techLocal.name)
                                            item.techLocal && setCompletionPercentageInput(item.techLocal.techCompletionPercentage)
                                            item.techLocal && item.techLocal.techDate && setTechDateInput(item.techLocal.techDate.toString().substring(0, 10))
                                            item.techLocal && setDescriptionInput(item.techLocal.description)
                                        }} />}
                                    </td>
                                </>
                                :
                                <>
                                    <td>{counter += 1}</td>
                                    <td>{item.techRusagr.depProd}</td>
                                    <td>{item.techRusagr.depCons}</td>
                                    <td>
                                        <select name='depUpd' id="typeUpd" onChange={(e) => setUser((e.target.value))}>
                                        <option disabled selected>{item.techLocal && item.techLocal.name ? item.techLocal.name : user}</option>
                                        <option value={fio ? fio : ""}>{fio}</option>
                                            {userArray && userArray.map((user: IEmployee) => (
                                                user.department.number.toString() === item.techRusagr.depProd 
                                                && (user.user.accessGroup === "Technolog" || (user.user.accessGroup === "Engineer" && user.department.number === 5))
                                                && <option key={user.id} value={user.lastName + " " + user.firstName.charAt(0) + "." + user.middleName.charAt(0) + "."}>{user.lastName + " " + user.firstName.charAt(0) + "." + user.middleName.charAt(0) + "."}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td><input size={4} type="number" step={10} min={0} max={100} id='numberUpd' defaultValue={completionPercentageInput} onChange={(e) => setCompletionPercentageInput(parseInt(e.target.value))}></input></td>
                                    <td><input type="date" value={techDateInput.toString().substring(0, 10)} onChange={(e) => setTechDateInput(e.target.value.toString().substring(0, 10))}></input></td>
                                    <td><input size={10} type="text" value={descriptionInput} onChange={(e) => setDescriptionInput(e.target.value)}></input></td>
                                    <td>
                                        <SaveIcon color="success" onClick={() => {
                                            handleUpdateTech(item.techRusagr.id, item.techRusagr.dse.id);
                                        }} />
                                        <CancelIcon color='error' onClick={() => {
                                            setToggleDep({ depData: 0, toggleDep: true });
                                            setUser('');
                                            setCompletionPercentageInput(0);
                                            setTechDateInput('');
                                            setDescriptionInput('');
                                        }}/>
                                    </td>
                                </>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DseCard