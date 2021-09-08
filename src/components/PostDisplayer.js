import React from "react"
import './Post.css'

const PostDisplayer = (props) => {

    // console.log(props)

    return (
        <div className='final-post'>

            {props.finalRender.map(data => {
                return (
                    <>
                        <div className='post-name'>
                            {data.renderUrl ? (<div className='post-head'>
                                <h4>Code Mancers</h4>
                                <p>{new Date().toLocaleTimeString()}</p>
                            </div>) : null}
                            <div className='post-msg'>
                                <p>{data.renderTxt} </p>
                                {data.renderUrl ? (<img src={data.renderUrl} alt="Post Will be display here" />) : null}
                            </div>
                        </div>

                    </>
                )
            })}
        </div>
    )
}
export default PostDisplayer
