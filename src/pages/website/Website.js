import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import React from 'react'

function Website() {
    const { id } = useParams()
    const { error, document } = useDocument('websites', id)

    if(error){
        return <div>{error}</div>
    }
    if(!document){
        return <div>Loading...</div>
    }
  
  return (
    <div>
      Document Name: {document.name}
      <br></br>
      Document Domain: {document.details}
      <br></br>
      <p>Need to allow "/websites/OK0dp7Ji51jtxamvuhjk" to redirect to "mycustomdomain.com"</p>
    </div>
  )
}

export default Website
