import React,{useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import {CreateData} from '../../store/actions/CRUD'
import {connect} from 'react-redux'


function CreatePost(props) {
    
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const [newImage, setNewImage] = useState({
      image:null
     
    })

    const [newPost, setNewPost] = useState({
        title:'',
        excerpt:'',
        content:'',


    })

    const handleChange = (e) =>{
        setNewPost(pervData =>({
            ...pervData,
            [e.target.name]:e.target.value,
        }))

        
     

    }
    const HandleCancle = () =>{
        props.onClose()
        history.push('/admin')

    }

    
    const HandelCreaatePost = (e) =>{
      const config = { headers: {'Content-Type':'multipart/form-data'}}
      let formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('Category', 1);
      formData.append('author', 1);
      formData.append('excerpt', newPost.excerpt);
      formData.append('content', newPost.content);
      if(newImage.image !== null){
      formData.append('image', newImage.image)
      }
      props.onCreate(formData, config)
      setNewImage({
        image:null
      })
      console.log(newImage);
      props.onClose()
      setNewPost({
        title:'',
        excerpt:'',
        content:'',

      })
      history.push('/admin')



    }  

    
    return (
    <div>

    <Dialog open={props.onCreateForm} onClose={props.onClose} aria-labelledby="form-dialog-title">
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
           
            value={newPost.content}
            onChange={e =>handleChange(e)}
            fullWidth
          />
          <input
							accept="image/*"
							id="post-image"
							name="image"
              type="file"
              onChange={e => setNewImage({image:e.target.files[0]})}
						/>
           
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



        </div>
    )
}
const mapStateToProps = state =>({
    post : state.crud.post
})

const mapStateToDispatch = dispatch => ({
    onCreate: (data, config) => dispatch(CreateData(data, config))
})


export default connect(mapStateToProps, mapStateToDispatch)(CreatePost)
