import React,{useState, useEffect} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useHistory, useParams } from 'react-router-dom';
import {DeleteData, RetriveData} from '../../store/actions/CRUD'
import {useDispatch, useSelector} from 'react-redux'


function DeletePost(props) {
    
    const [openDelete, setOpenDelete] = React.useState(true);
    const history = useHistory()
    const dispatch = useDispatch()
    const {id} = useParams()
    const post = useSelector(state => state.crud.singelPost)
    const [newPost, setNewPost] = useState({
        title:'',
      
    })

    console.log(post)
    useEffect(() =>{
        
       dispatch(RetriveData(id))
    
    },[])

    useEffect(() =>{
        setNewPost({
            title: post&& post.title,
          
        })
    },[post])

  
    const HanldeOpenForm = () =>{
        setOpenDelete(!openDelete)
    }

    const HandleCancle = () =>{
        HanldeOpenForm()
        history.push('/admin')

    }
    const HandelCreaatePost = (e) =>{
      
      dispatch(DeleteData(id))
      HanldeOpenForm()
      history.push('/admin')



    }  
    
    return (
        <div>
            {newPost ? 
            <Dialog open={openDelete} onCloseUpdate={HanldeOpenForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete an article</DialogTitle> 
                <DialogContent>
                
                  <h3>Do you want to delete this post</h3>
                  <h4>Title:<span>{newPost.title}</span></h4>
                   
                   
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



export default DeletePost;
