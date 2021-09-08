import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import Load from './Load'
import PostDisplayer from './PostDisplayer'
import './Post.css'

Modal.setAppElement('#root')

function Post() {
    const [input, setInput] = useState('')
    const [postText, setPostText] = useState('')
    const [data, setData] = useState([])
    const [searchedGif, setSearchedGif] = useState([])
    const [choosedGif, setChoosedGif] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [finalRender, setFinalRender] = useState([{
        renderTxt: '',
        renderUrl: ''
    }])
    //For Fetching Trending Api's
    useEffect(() => {
        const apiResult = async () => {
            setIsLoaded(true)
            const result = await axios.get("https://api.giphy.com/v1/gifs/trending", {
                params: {
                    api_key: "BwOuLr9Yi9woxlBO2j2nT84Wv1hoLNUB",
                    limit: 50
                }
            });
            setData(result.data.data)
            setIsLoaded(false)
        }
        apiResult()
    }, [])

    //For Fetching Searched Api's
    const handleChanger = async e => {
        setChoosedGif('')
        setInput(e.target.value)
        setIsLoaded(true)
        const result = await axios.get("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "BwOuLr9Yi9woxlBO2j2nT84Wv1hoLNUB",
                q: e.target.value,
                limit: 50
            }
        })
        setSearchedGif(result.data.data)
        setIsLoaded(false)
    }

    //For Displaying Trending Api's Data
    let ImageDisplayer = () => {
        if (isLoaded) {
            return <Load />
        }
        return (
            data.map(val => {
                return (
                    <div key={val.id} className='gifs'>
                        <img
                            src={val.images.fixed_height.url}
                            onClick={() => postHolder(val.images.fixed_height.url)}
                            alt="Trending Images...." />
                    </div>
                )
            })
        )
    }

    //For Displaying Searched Api's Data
    const searchLister = () => {
        if (isLoaded) {
            return <Load />
        }
        return searchedGif.map(data => {
            return (
                <div key={data.id} className='gifs'>
                    <img
                        src={data.images.fixed_height.url}
                        onClick={() => postHolder(data.images.fixed_height.url)}
                        alt="Searched Images" />
                </div>
            )
        })
    }

    //For Hold the Selected Gif's
    const postHolder = (props) => {
        setModalOpen(false)
        setInput('')
        setSearchedGif([])
        setChoosedGif(props)
    }

    //For Update the state of an post
    const postUpdater = (e) => {
        e.preventDefault()
        if (postText && choosedGif) {
            setFinalRender((data) => [...data, { renderTxt: postText, renderUrl: choosedGif }])
        }
        setPostText('')
        setChoosedGif('')
    }
    //For Update Post Input Area
    const postInput = e => setPostText(e.target.value)

    return (
        <>
            {/*  Header Content*/}
            <div className="header-content">
                <button onClick={() => alert("Try After sometime, Please try Gif functionality..!!")} > Compose Post </button>
                <button onClick={() => alert("Try After sometime, Please try Gif functionality..!!")} > Photo/Video Album </button>
                <button onClick={() => alert("Try After sometime, Please try Gif functionality..!!")} > Live </button>
            </div>

            <div className="msg">
                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="profile" />
                <input
                    type="text"
                    value={postText}
                    onChange={postInput}
                    placeholder="Write Something Here...."
                />
            </div>
            <div className='choosed-gif' >
                {choosedGif ? <img src={choosedGif} alt="" /> : null}
            </div>
            <div className="btn-Container" >
                <button className="md-btn" onClick={() => alert("Try After sometime, Please try Gif functionality..!!")} >Tag Friends</button>
                <button className="md-btn" onClick={() => alert("Try After sometime, Please try Gif functionality..!!")} >Check In</button>
                <button className="md-btn" onClick={() => setModalOpen(true)} >Gif</button>
                <button className="md-btn" onClick={() => alert("Try After sometime, Please try Gif functionality..!!")} >Tag Event</button>

            </div>

            {/* Modal Content */}
            <Modal isOpen={modalOpen} >
                <div className="search">
                    <label className="search-icon"  >
                        <input
                            id="search-ic"
                            type="search"
                            value={input}
                            onChange={handleChanger}
                            autoComplete="off"
                            placeholder="Search your gif here" />
                    </label>
                </div>
                {input === '' ? (<ImageDisplayer />) : (searchLister())}
            </Modal>

            {/* Footer Content */}
            <div className="post-container">
                <button onClick={() => alert("Try After sometime, Please try Post functionality..!!")}>  Only me </button>
                <button className="post" onClick={postUpdater} > Post </button>
            </div>
            {
                (finalRender.renderTxt === '' || finalRender.renderUrl === '') ? null : (
                    < PostDisplayer finalRender={finalRender} />
                )
            }
        </>
    );
}

export default Post;
