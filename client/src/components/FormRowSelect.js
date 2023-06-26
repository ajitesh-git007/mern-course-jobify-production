import React from 'react'
import { useDebugValue } from 'react'

export default function FormRowSelect({labelText, name, value, handleChange, list}) {
  return (
    <>
    
    
    
    <div className="form-row">
        <label htmlfor = 'jobType' className='form-label'> {(labelText) ? labelText: name} </label>
        <select name={name} value={value} onChange={handleChange} className='form-select'>

          { list.map((itemValue, index)=>{
            return <option key={index} value={itemValue}> { itemValue} </option>
          })}
        </select>
        </div>
    
    
    </>
  )
}
