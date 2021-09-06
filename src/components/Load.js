import React from 'react'
import './Post.css'
import CircularProgress from '@material-ui/core/CircularProgress'

const Load = () => {
    return (
        <div className="loader">
            <CircularProgress color="inherit" size={16} />
        </div>
    )
}

export default Load
