import React,{useState,useEffect} from 'react'
import Posts from './posts/Posts'
import {connect} from 'react-redux'
import {FetchData} from '../../store/actions/CRUD'

function Post(props) {
    
    useEffect(() =>{
        props.fetchDataa()
    },[])

    let post = <h2>Wait to load the data</h2>
    if(props.post){
        post =( props.post.map(data =><Posts post={data}/> ) )
    }

    return (
        <div>
            <h1 style={{textAlign:"center"}}>Latest Posts</h1><br/>
           {post}    
        </div>
    )
}


const mapStateToProps = state =>({
    post:state.crud.post,
    token:state.auth.refresh_token
})


const mapStateToDispatch = dispatch =>({
    fetchDataa : () => dispatch(FetchData()),
})


export default connect(mapStateToProps, mapStateToDispatch)(Post)
