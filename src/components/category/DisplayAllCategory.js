import React ,{useState , useEffect} from 'react';
import {getData, postData ,ServerURL } from '../FetchNodeSevices';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Radio from '@material-ui/core/Radio';
import { Typography } from '@material-ui/core';
import { postDataAndImage } from '../FetchNodeSevices';
import {checkRequire,checkMobile,checkEmail,checkPassword} from '../checks';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';





const useStyles = makeStyles((theme)=>({

    rootx : {
        display:'flex',
        alignItems : 'center',
        justifyContent:'center',
        marginTop:4
    },

    tablediv : {
        width : 1200 ,
        // height:'auto'
    },

    root: {
      display: 'flex' ,
      alignItems : 'center',
      justifyContent:'center',
      

    },
    button: {
        margin: theme.spacing(1),
        width:250
      },

    mypaper :{
        backgroundColor:'#55efc4',
        width : 450,
         margin: 10,
        padding:20,
        
    },

    headingStyle : {
        backgroundColor:'#00b894',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        margin:3,
        padding:20

    },

    input: {
        display: 'none',
      },

      container: {
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
      },

      gridstyle : {
          display:'flex', flexDirection:'row'
      }


  }));


export default function MaterialTableDemo() {
    const classes = useStyles();

    const [state, setState] = React.useState({
      columns: [
        { title: 'Id', field: 'categoryid' },
        { title: 'Category', field: 'categoryname' },
        { title: 'Description', field: 'description' },
        { title: 'Icon' , field :'icon' ,
        render: rowData=><div><Avatar  src={`${ServerURL}/images/${rowData.icon}`} /></div>
        },
        { title:  'Ad', field : 'ad',
        render: rowData=><div><Avatar src={`${ServerURL}/images/${rowData.ad}`}  /></div>
        },
        { title:  'AdStatus', field : 'adstatus' }
      ],
     
    });

    const [getList,setList]=useState([])
    const [getOpen,setOpen]=useState(false)
    const [getRowData,setRowData]=useState([])
    const [getAdStatus,setAdStatus]=useState('')
    const [getIcon,setIcon] = useState({icon : '' , fileicon:''});
    const [getAd,setAd] = useState({ad:'' , fileAd:''});
    const [getCategoryName,setCategoryName]=useState('')
    const [getCategoryId,setCategoryId]=useState('')
    const [getDescription,setDescription]=useState('')
    const [getMsg, setMsg]=useState('');
    const [getErrorCn, setErrorCn]=useState('');
    const [getErrorDes, setErrorDes]=useState('');
    const [getErrorIcon, setErrorIcon]=useState('');
    const [getErrorAd, setErrorAd]=useState('');
    const [getErrorAdStatus, setErrorAdStatus]=useState('');

   
  

    const fetchData= async()=>{

        let list = await getData('category/displayall')
        setList(list)

    }

     useEffect(function(){

        fetchData()

    },[])

    const handleClickOpen = (rowData) => {
      setOpen(true);
      setCategoryName(rowData.categoryname)
      setDescription(rowData.description)
      setIcon({icon:'',fileicon:`${ServerURL}/images/${rowData.icon}`})
      setAd({ad:'',fileAd:`${ServerURL}/images/${rowData.ad}`})
      setAdStatus(rowData.adstatus)
      setCategoryId(rowData.categoryid)
    };
    
    const handleClose = () => {
      setOpen(false);
      fetchData()
    };
    
    
    const handleDelete=async(oldData)=>{
     let body={categoryid:oldData.categoryid}
     await postData('category/deleteRecord',body)   
    
    }


    const handleIcon=(event)=>{
      setIcon({icon:event.target.files[0] , fileicon:URL.createObjectURL(event.target.files[0])})
  }

  const handleAd=(event)=>{
      setAd({ad:event.target.files[0] , fileAd:URL.createObjectURL(event.target.files[0])})
  }



  const handleAdStatus=(event)=>{
      setAdStatus(event.target.value)
  }

  const handleSubmit=async()=>{

      var err = false ;

      if(!checkRequire(getCategoryName))
      {
          err = true
          setErrorCn('/images/cross.jpg')
      }

      if(checkRequire(getCategoryName))
      {
        setErrorCn('/images/tick.jpg')
      }

      if(!checkRequire(getDescription))
      {
          err=true
           setErrorDes('/images/cross.jpg')
      }

      if(checkRequire(getDescription))
      {
          setErrorDes('/images/tick.jpg')
      }
     
      
      


      if(!checkRequire(getAdStatus))
      {
          err=true
          setErrorAdStatus('/images/cross.jpg')
      }

      if(checkRequire(getAdStatus))
      {
          setErrorAdStatus('/images/tick.jpg')
      }
     

  if(!err)
    {       
      
      const formData = new FormData();
      formData.append('categoryid',getCategoryId)
      formData.append('categoryname',getCategoryName)
      formData.append('description',getDescription)
      formData.append('icon',getIcon.icon)
      formData.append('ad',getAd.ad)
      formData.append('adstatus',getAdStatus)
      var  config = {headers:{'content-type':'multipart/form-data'}}
      const result = await postDataAndImage('category/editrecord',formData,config) 
      
      if(result)
      {
          setMsg('Record submitted')
      }
      else{
          setMsg('Failed to submit record')
      }
    }

  else{
        alert('Error in input') 
      }   
}

// const clearData=()=>{
//   setAdStatus('')
//   setIcon('')
//   setAd('')
//   setCategoryName('')
//   setDescription('')
//   setMsg('')
//   setErrorCn('')
//   setErrorDes('')
//   setErrorIcon('')
//   setErrorAd('')
//   setErrorAdStatus('')
// }

    
    const editDialog=()=>{
    return(
    <Dialog
            open={getOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Category Registor [ Edit Category]"}</DialogTitle>
            <DialogContent>
            <div className={classes.root}>
        <Paper className={classes.mypaper} elevation={5}>
            <Paper  className={classes.headingStyle}><Typography><b>Edit</b></Typography></Paper>
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.gridstyle}>
                     <img src={getErrorCn} width='10' height='10' />
                     <TextField label='Category Name'  value={getCategoryName} onChange={(event)=>setCategoryName(event.target.value)} fullWidth/>
                </Grid>

                <Grid item xs={12} className={classes.gridstyle}>
                    <img src={getErrorDes} width='10' height='10' />
                    <TextField label='Description'  value={getDescription} onChange={(event)=>setDescription(event.target.value)} value={getDescription} fullWidth/>
                </Grid>
               
                <Grid item xs={6} className={classes.gridstyle}>   
                {/* gridstyle class is for positioning of checks marks */}
                <img src={getErrorIcon} width='10' height='10' />
                <input
                   accept="image/*"
                   onChange={(event)=>handleIcon(event)}
 
                   className={classes.input}
                   id="contained-button-fileicon"
                   multiple
                   type="file"
                />
                <label htmlFor="contained-button-fileicon">
                    <Button variant="contained" color="primary" 
                       component="span" className={classes.button}>
                            Upload Category Icon
                    </Button>
                 </label>
                </Grid>

                <Grid item xs={6} className={classes.container}>
                <Avatar alt="ram"  src={getIcon.fileicon} style={{width:80,height:80}} />
                </Grid>
              
                <Grid item xs={6} className={classes.gridstyle}>
                <img src={getErrorAd} width='10' height='10' />
                <input
                   accept="image/*"
                   onChange={(event)=>handleAd(event)}
                   className={classes.input}
                   id="contained-button-filead"
                   multiple
                   type="file"
                />
                <label htmlFor="contained-button-filead">
                    <Button variant="contained" color="primary" component="span" className={classes.button}>
                            Upload Category Ad
                    </Button>
                 </label>
                </Grid>

                <Grid item xs={6} className={classes.container}>
                <Avatar alt="ram" src={getAd.fileAd} style={{width:80 , height:80}}  />
                </Grid>

                <Grid item xs={12} className={classes.gridstyle}>
                <img src={getErrorAdStatus} width='10' height='10' />
                  <div>  Ad Status : </div>
                <Radio
                        checked = {getAdStatus === 'Yes'}
                        onChange={(event)=>handleAdStatus(event)}
                        value="Yes"
                        name="radio-button-demo"
                />Yes

                <Radio
                         checked = {getAdStatus === 'No'}
                         onChange={(event)=>handleAdStatus(event)}
                         value="No"
                         name="radio-button-demo"
                        
                        />No
                </Grid>

                <Grid item xs={12} className={classes.container}>
                     <Button                       
                        variant="contained"
                        color="primary"
                        // className={classes.button}
                        onClick={()=>handleSubmit()}
                        fullWidth
                        >
                           Edit
                      </Button>
                </Grid>
             
                <Grid item xs={12}>
                    <b>Message:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   <font color='blue'><i><b> {getMsg} </b></i></font>                   
                </Grid>            

            </Grid>
        </Paper>
     </div>
    
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>              
            </DialogActions>
          </Dialog>
    
    
    )
    
    
    }
    
  
    return (
        <div className={classes.rootx}>
            <div className={classes.tablediv}>
      <MaterialTable
        title="List Of Categories"
        columns={state.columns}
        data={getList}

        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) => handleClickOpen(rowData)
          }
        ]}
  


        editable={{
         
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
               
                  const data = [...getList];
                  data.splice(data.indexOf(oldData), 1);
                  setList(data)
                  handleDelete(oldData)
                  
              
              }, 600);
            }),
        }}
      />
        </div>  
        {editDialog()}
      </div>
    );
  }








