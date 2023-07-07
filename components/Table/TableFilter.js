import React from 'react'

const TableFilter = ({filter, setFilter}) => {
    return (
      <div className='m-2'>
          <input placeholder='Search...' value={filter||""} onChange={(e)=>{setFilter(e.target.value)}} className="float-end"/>
      </div>
    )
  }

export default TableFilter