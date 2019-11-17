import React from 'react'

const WithContext = ({pageContext}) => {
    return (
        <div>
            {pageContext.name}
        </div>
    )
}


export default WithContext

