import React from "react"
import './Post.css'

const PostDisplayer = (props) => {
    return (
        <div className='final-post'>
            <h1>{props.renderTxt}</h1>
            <img src={props.renderUrl} alt='' />
        </div>
    )
}
export default PostDisplayer