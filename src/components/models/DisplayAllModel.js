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
import Slide from '@material-ui/core/Slide';


/// for drop down components..
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex' ,
      alignItems : 'center',
      justifyContent:'center',
      
    },
      rootx: {
        width:1100,
        marginTop:10
        // display: 'flex' ,
        // alignItems : 'center',
        // justifyContent:'center',
        

    },
    button: {
        margin: theme.spacing(1),
        width:250
      },

    mypaper :{
        backgroundColor:'#f5f6fa',
        width : 450,
         margin: 10,
        padding:20,
        
    },

    headingStyle : {
        backgroundColor:'#f1f2f6',
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
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },


  }));




export default function MaterialTableDemo() {
    const classes = useStyles();

    const [getModelId , setModelId] = useState('');
    const [getCategoryList,setCategoryList]= useState([]);
    const [getBrandId,setBrandId]= useState('');
    const [getBrandList,setBrandList]= useState([]);
    const [getModelName,setModelName]= useState('');
    const [getDescription,setDescription]= useState('');
    const [getMsg,setMsg]= useState('');
    const [getCategoryId,setCategoryId]= useState('');
    /// for validations
    const [getErrCategoryId,setErrCategoryId]= useState('');
    const [getErrBrandId,setErrBrandId]= useState('');
    const [getErrModelName,setErrModelName]= useState('');
    const [getErrDescription,setErrDescription]= useState('');  
    const [open, setOpen] = React.useState(false);
    const [getList , setList] = useState([])
    const [state, setState] = useState({
      columns: [
        { title: 'Brand', field: 'brandname' },
        { title: 'Model Name', field: 'modelname' },
        { title: 'Description', field: 'description'},
       ],
     
    
    });

    ///// functions from modelinterface


    useEffect(function(){
        fetchCategory();
    },[])

    const handleCategoyChange=async(event)=>{
        setCategoryId(event.target.value)
        fetchBrands(event.target.value)
    }


    const handleBrandChange=async(event)=>{

        setBrandId(event.target.value)   
    
    }



    const fetchCategory=async()=>{
        let list = await getData('category/displayall')
        setCategoryList(list)
        }

    const fillCategoryItems=()=>{
        return(

            getCategoryList.map((item,key)=>{
                return(

                    <MenuItem value={item.categoryid}>{item.categoryname} </MenuItem>

                )
            })
            
        )
    }    


    const fetchBrands=async(categoryid)=>{
        var body = {'categoryid':categoryid}
        let list = await postData('brand/displayallbrands',body);
        setBrandList(list)
       
    }

    const fillBrandsItems=()=>{
        return(
            getBrandList.map((item,key)=>{
                return(
                    <MenuItem value={item.brandid}>{item.brandname} </MenuItem>

                )
            })
        )
    }

    // Submit Data
    const handleSubmit=async()=>{

        var err=false;

        if (!checkRequire(getCategoryId))
        {
            err = true;
            setErrCategoryId('/images/cross.jpg')
        }

        if(checkRequire(getCategoryId))
        {
            err = false;
            setErrCategoryId('images/tick.jpg')
        }

        if (!checkRequire(getBrandId))
        {
            err = true;
            setErrBrandId('/images/cross.jpg')
        }

        if(checkRequire(getBrandId))
        {
            err = false;
            setErrBrandId('images/tick.jpg')
        }

        if (!checkRequire(getModelName))
        {
            err = true;
            setErrModelName('/images/cross.jpg')
        }

        if(checkRequire(getModelName))
        {
            err = false;
            setErrModelName('images/tick.jpg')
        }

        if (!checkRequire(getDescription))
        {
            err = true;
            setErrDescription('/images/cross.jpg')
        }

        if(checkRequire(getDescription))
        {
            err = false;
            setErrDescription('images/tick.jpg')
        }


        if(!err)

     {

       var body={ 'modelid':getModelId ,'brandid':getBrandId , 'modelname':getModelName , 'description':getDescription }
        let result = await postData('model/editrecord',body) 

        if(result)
        {
            setMsg('Record updated...')
        }

        else
        {
            setMsg('Failed to update record')
        }
    }

    else
    {
        alert('Please Fill All Fields..')
    }
}



    ///////////////////////////////////




    /// Display all functions only

    useEffect(function(){
        fetchData()          
        
    },[])


    const fetchData=async()=>{
        var list = await getData('model/displayall')
        setList(list)
    }

    const handleDelete=async(oldData)=>{
        let body = {modelid : oldData.modelid}
        await postData('model/delete',body)
    }

    /////////////
  

    //// dilouge fuctions /////

    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    //   });
      
     
      
        const handleClickOpen = (event , rowData) => {
          setOpen(true); 
          setModelId(rowData.modelid)         
          setBrandId(rowData.brandid)
          setModelName(rowData.modelname)
          setDescription(rowData.description)
        };
      
        const handleClose = () => {
          setOpen(false);
          fetchData()
        };

    ////  dilouge fuctions /////

/// dilouge
const editDilouge=()=>{
return (
    <div>
    {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}> */}
        {/* Slide in alert dialog */}
      {/* </Button> */}
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Model Registor [Edit Model]"}</DialogTitle>
        <DialogContent>

        <div className={classes.root}>
            <Paper  className={classes.mypaper}>
                <Paper  className={classes.headingStyle}><Typography>Edit Model</Typography></Paper>
                <Grid container spacing={1}>
                    <Grid item xs={6} className={classes.gridstyle}>
                        <img   src={getErrCategoryId} width='10' height='10' />
                       <FormControl className={classes.formControl} fullWidth spacing={3} >
                         <InputLabel id="demo-simple-select-label">Category </InputLabel>
                         <Select
                           labelId="demo-simple-select-label"
                             id="demo-simple-select"
                            fullWidth
                                value={getCategoryId}
                               onChange={(event)=>handleCategoyChange(event)}
                         >
                                {fillCategoryItems()}
                         </Select>
                       </FormControl>
                    </Grid>

                    <Grid item xs={6} className={classes.gridstyle}>
                    <img   src={getErrBrandId} width='10' height='10' />
                       <FormControl className={classes.formControl} fullWidth spacing={3}>
                         <InputLabel id="demo-simple-select-label">Brand </InputLabel>
                         <Select
                           labelId="demo-simple-select-label"
                             id="demo-simple-select"
                            fullWidth
                            //  value={getBrandId}
                               onChange={(event)=>handleBrandChange(event)}
                         >
                                {fillBrandsItems()}
                         </Select>
                       </FormControl>
                    </Grid>

                    <Grid item xs={12} className={classes.gridstyle}>
                    <img   src={getErrModelName} width='10' height='10' />
                        <TextField fullWidth  label='Model Name' value={getModelName} onChange={(event)=>setModelName(event.target.value)}/>
                    </Grid>

                    <Grid item xs={12} className={classes.gridstyle}>
                    <img   src={getErrDescription} width='10' height='10' />
                        <TextField fullWidth  label='Description' value={getDescription} onChange={(event)=>setDescription(event.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <Button fullWidth color='primary'
                         variant='contained' 
                         label='Description'
                         onClick={()=>handleSubmit()}
                         >
                            Edit Record
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <div>Message : <font color='brown'><b>{getMsg}</b></font></div>
                            
                    </Grid>

                </Grid>

            </Paper>

        </div>

         
        </DialogContent>
        <DialogActions>
        
          <Button onClick={handleClose} color="primary">
            Thanks & close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );


}




////////////








    return (
        <div className={classes.root}>
          <div className={classes.rootx}>
      <MaterialTable
        title="Model List"
        columns={state.columns}
        data={getList}

        actions={[
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: (event, rowData) => handleClickOpen( event ,rowData)
            }
          ]}


        editable={{
        //   onRowAdd: (newData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         setState((prevState) => {
        //           const data = [...prevState.data];
        //           data.push(newData);
        //           return { ...prevState, data };
        //         });
        //       }, 600);
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve) => {
        //       setTimeout(() => {
        //         resolve();
        //         if (oldData) {
        //           setState((prevState) => {
        //             const data = [...prevState.data];
        //             data[data.indexOf(oldData)] = newData;
        //             return { ...prevState, data };
        //           });
        //         }
        //       }, 600);
        //     }),
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
      {editDilouge()}
      </div>
      </div>
    );
  }