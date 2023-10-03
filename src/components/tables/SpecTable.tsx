import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGetSostavQuery } from '../../rtk/api/foreignAPI';



const SpecTable:React.FC = () => {
  interface IChild {
    dseCode: Text
    zagType: Text,
    depCons: Text,
    depProd: Text,
    material: Text
  }
  interface IItem {
    spec: {
      childId: number,
      child: IChild,
      parentId: number | null,
    },
    dse: {

    }
  }

  //const sortDse = (a:IItem,b:IItem) => a.child.dseCode > b.child.dseCode ? 1 : -1

  let { id } = useParams();
  const { data: sostav , isLoading} = useGetSostavQuery({ id: id }, {pollingInterval: 5000})
  let sostavTree: any[] = []

  const buildTree = (items: IItem[], parentId: number | null, level: number) => {
    items.forEach((item: any) => {
      if (item.spec.parentId === parentId) {

        sostavTree.push({ ...item, level })
        level += 1;
        buildTree(sostav, item.spec.childId, level)
        level -= 1;
      }

    });
  }
  let agregatDse = ""
  let agregatName = ""

  if (sostav && id) {
    sostav.forEach((item: any) => {
      if (item.spec.childId.toString() === id) {
        agregatDse = item.spec.child.dseCode
        agregatName = item.spec.child.name
      }

    });
    buildTree(sostav, null, 0)
console.log(sostavTree)
 
  }
  let counter = 0;

  if (isLoading) {
    return (
      <div>
        Загрузка...
      </div>
    )
  }
  return (
    <div>
      <h2>{agregatDse + " " + agregatName}</h2>
      <table className='styled-table'>
        <thead>
          <tr>
            <th>№</th>
            <th>Деталь</th>
            <th>Наименование</th>
            <th>План<br/>запуска</th>
            <th>Цех<br />потребитель</th>
            <th>Цех<br />изготовитель</th>
            <th>Требуется<br/>к дате</th>
            <th>Получено</th>
            <th>Планируется</th>
            <th>Фактически</th>
            <th>Готовность</th>
            <th>Материал</th>
          </tr>
        </thead>
        <tbody>
          {sostav && sostavTree.map((dse: any) => (

            <tr key={dse.spec.id}>
              <td>{counter += 1}</td>
              <td style={{ textAlign: "initial" }}><Link to={'/tasks/agregat/dse/' + dse.spec.childId} className='nav-link text-light'><div style={{ fontWeight: (dse.spec.child.zagType === 'У' || dse.spec.child.zagType === 'А' ? "bold" : "normal"), marginLeft: (dse.level * 15).toString() + "px" }}>{dse.spec.child.dseCode}</div></Link></td>
              <td>{dse.spec.child.name}</td>
              <td>{dse.dse && dse.dse.planZapuska}</td>
              <td>{dse.spec.child.depCons}</td>
              <td>{dse.spec.child.depProd}</td>
              <td>{new Date(dse.dse.planTrebDate).toLocaleDateString('ru')}</td>
              <td>{dse.dse && dse.dse.quantityMechDep && dse.dse.quantityMechDep +  " /\n" + new Date(dse.dse.factMechDepDate).toLocaleDateString('ru')}</td>
              <td>{dse.local && dse.local.planProdDepData && dse.local.quantityMechDep + " /\n" + new Date(dse.local.planProdDepData).toLocaleDateString("ru")}</td>
              <td>{dse.loadl && dse.local.quantityProdDep}</td>
              <td>{dse.tp && dse.tp.techLocal.length + " / " + dse.tp.tech.length}</td>
              <td>{dse.spec.child.material}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SpecTable