import React,{useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useHistory, useParams } from 'react-router-dom';
import {UpdateData, RetriveData} from '../../store/actions/CRUD'
import {useDispatch, useSelector} from 'react-redux'


function UpdatePost(props) {
    
    const [openUpdate, setOpenUpdate] = React.useState(true);
    const history = useHistory()
    const dispatch = useDispatch()
    const {id} = useParams()
    const post = useSelector(state => state.crud.singelPost)
    const [newPost, setNewPost] = useState({
        title:'',
        excerpt:'', 
        content:'',  
    })

    console.log(post)
    useEffect(() =>{
        
       dispatch(RetriveData(id))
    
    },[])

    useEffect(() =>{
        setNewPost({
            title: post&& post.title,
            excerpt: post && post.excerpt,
            content: post && post.content
        })
    },[post])

  
    const [newImage, setNewImage] = useState({
        oldImage:post ? post.image : null,
        image:null
        
      })

    const handleChange = (e) =>{
        setNewPost(pervData =>({
            ...pervData,
            [e.target.name]:e.target.value,
        }))
    }
    const HanldeOpenForm = () =>{
      setOpenUpdate(!openUpdate)
    }

    const HandleCancle = () =>{
        HanldeOpenForm()
        history.push('/admin')

    }

    async function goToHome (){
        await new Promise((resolve) => setTimeout(() => { 
            history.push('/retrive/'+ id)
          
        }, 1000))

    }

    const HandelCreaatePost = (e) =>{
      const config = { headers: {'Content-Type':'multipart/form-data'}}
      let formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('Category', 1);
      formData.append('author', 1);
      formData.append('excerpt', newPost.excerpt);
      formData.append('content', newPost.content);
      if(newImage.image){
        formData.append('image', newImage.image);
        }

      dispatch(UpdateData(formData, config, id))
      HanldeOpenForm()
      goToHome()



    }  
    
    return (
        <div>
            {newPost ? 
            <Dialog open={openUpdate} onCloseUpdate={HanldeOpenForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create New Post</DialogTitle>     <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name='title'
                    label="title"
                   
                    value={newPost.title}
                    onChange={e =>handleChange(e)}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="excerpt"
                    label="excerpt"
                   
                    value={newPost.excerpt}
                    onChange={e =>handleChange(e)}
                    fullWidth
                  />
                   <TextField
                    autoFocus
                    margin="dense"
                    id="content"
                    name="content"
                    label="content"
                    multiline
                    rows={2}
                    rowsMax={4}
                    value={newPost.content}
                    onChange={e =>handleChange(e)}
                    fullWidth
                  />
                  <input
                    accept="image/*"
                    id="post-image"
                    name="image"
                    type="file"
                    onChange={e => setNewImage({oldImage:e.target.files[0],image:e.target.files[0]})}
                    /> 
                    
                    <img style={{maxHeight:"80px", maxWidth:"80px"}} src={newImage.oldImage} alt="Italian Trulli"></img>
                   
                </DialogContent>
                <DialogActions>
                  <Button onClick={HandleCancle}   color="primary">
                    Cancel
                  </Button>
                  <Button onClick={HandelCreaatePost} type="submit"  color="primary">
                    Subscribe
                  </Button>
                </DialogActions>
              </Dialog>
        
            : ''}
        
     </div>
    )
}



export default UpdatePost;
