import React from 'react'

const Table = ({ ...props }) => {
    const columns = ["Обозначение", "Наименование", "Количество установочной партии", "Статус"]
    let rows:any = []
    for (let i = 0; i<100; i++) {
        rows[i] = 1;
    }
    // нужны фильры и сортировка по колонкам
    // нужно зафиксировать хедер
    return (
        <div>
            <table className='styled-table'>
                <thead>
                    <tr>
                        {columns.map((el) => <th>{el}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((el:any) => <tr><td>{el}</td></tr>)}
                </tbody>

            </table>
        </div>
    )
}

export default Table