import React, {useEffect, useState} from 'react'
import Container from '@material-ui/core/Container';
import {useParams} from 'react-router-dom'
import {connect} from 'react-redux'
import {RetriveData} from '../../../store/actions/CRUD'

import  '../../css.css'
function Singlepost(props) {
   
    const { id } = useParams();
    

useEffect(() =>{
    
    props.onRetriveData(id)

},[])
    
    const post = props.post
    
    let postData = <h1>Wait to load data</h1>

    if (post){
        postData=(
            <div  className="singlePost">
            <Container maxWidth="s">
            {post.title && (
            <div>
            <div style={{ display: "flex"}}>
            <h3>Author: </h3> <h3> Kazi Motiour</h3></div> <br/>
            {post.image && 
            <img className="img" src={post.image}alt="Italian Trulli"></img>  }  
            <h3>Title: </h3>{post.title}
            <h3>Content: </h3>{post.content}
            </div>
            )
            }
            {!post.title && (
                <h1>This id contains no Article</h1>
            
           )}
           </Container> 
            
        </div>

        )
    }


    return (
        <div >
        {postData}
        </div>
       
    )
}
const mapStateToProps = state =>({
    post : state.crud.singelPost

})

const mapStateToDispatch = dispatch =>({
    onRetriveData : (id) => dispatch(RetriveData(id))

})



export default connect(mapStateToProps, mapStateToDispatch)(Singlepost)
