import React from 'react'
import Nav from './Nav'

const PageTemplate = ({element}: {element:React.ReactElement}) => {
  return (
    <div className='flex flex-col gap-y-10 laptop:flex laptop:flex-row gap-x-5'>
        <Nav/>
        {element}
    </div>
  )
}

export default PageTemplate