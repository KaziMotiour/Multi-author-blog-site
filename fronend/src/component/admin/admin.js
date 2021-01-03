import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CreatePost from './CreatePost'
import UpdatePost from './UpdatePost'
import DeletePost from './DeletePost'
import Link from '@material-ui/core/Link';
import {NavLink, Route} from 'react-router-dom'

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux'
import {DeleteData, FetchData, UpdateData} from '../../store/actions/CRUD'




const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

 function AdminTable(props) {

  const classes = useStyles();
  const [openUpdate, setOpenUpdate]  = useState(false)
  const [data, setData] = useState({
    post:null
  })
  
  const [openCreate, setOpenCreate] = React.useState(false);
  
  useEffect(() => {
    props.featchdatas()
    
  }, [])

    const handleCreateOpen = () => {
      setOpenCreate(!openCreate);
    };

    const handleUpdateOpen = () => {
      setOpenUpdate(!openUpdate);
    };


 
  
 

  return (
    <Container maxWidth="md" component="main">
    <h1>Admin Panal</h1><br/>

    
    <Button  variant="outlined" color="primary" onClick={handleCreateOpen}>
       Create a New Post
    </Button><br/><br/>
    <TableContainer component={Paper}>
        
      <Table stickyHeader className={classes.table} aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>ID </TableCell>
            <TableCell align="left">Catagory</TableCell>
            <TableCell align="left">title</TableCell>
            <TableCell align="right">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.post &&
          props.post.map((row) => (
           
            <TableRow>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell >{row.Category}</TableCell>
              <TableCell align="left">
                <Link component={NavLink}
                        color="textprimary"
                        to={"/retrive/"+row.id}
                        underline="none">
                {row.title.trim(0,5)}
                </Link>
                </TableCell>
              <TableCell align="right">
               <Link component={NavLink}
                        color="textprimary"
                        to={"/admin/update/"+row.id}
                        underline="none"> 
                <CreateIcon  style={{cursor:'pointer', marginRight:"10px"}} />
                 </Link> 
                 <Link component={NavLink}
                        color="textprimary"
                        to={"/admin/delete/"+row.id}
                        underline="none"> 
                 <DeleteIcon style={{cursor:'pointer'}} />
                 </Link>
            
                </TableCell>
            </TableRow>
            
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>



    {/* <Button variant="outlined" color="primary" onClick={createpost}>
        create
    </Button> */}



    
<CreatePost onCreateForm={openCreate} onClose={handleCreateOpen}/>
<Route exect path="/admin/update/:id" component={UpdatePost} />
<Route exect path="/admin/delete/:id" component={DeletePost} />
{/* {openUpdate ? <UpdatePost id ="35" onOpen={openUpdate} onClose={handleUpdateOpen}/> : "" } */}

 

    </Container>
  );
}

const mapStateToProps = state =>({
     post : state.crud.post

})


const mapStateToDispatch = dispatch =>({
    featchdatas : () => dispatch(FetchData())
})



export default connect(mapStateToProps, mapStateToDispatch)(AdminTable)