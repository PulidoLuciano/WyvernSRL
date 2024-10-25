import React, { Children } from 'react'
import { TRowProps } from '../../interfaces/TableInterfaces'

const TRow = ({ children }: TRowProps) => {
  return (
    <tr>
      {children}
    </tr>
  )
}

export default TRow