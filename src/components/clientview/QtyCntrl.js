import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      width:40,
      height:40,
      margin:10,
      fontSize:42
      // margin:10,
      // fontSize:42,
      // marginBottom:20  
    },
  }));

  var qty = 0 ;

  function QtyCntrl(props){

    const classes = useStyles() ;
    const [counter , setCounter] =useState(props.value);
    

    const handleIncreament=()=>{
      var qty = counter + 1 ;
        setCounter(qty);
       props.onChange(qty)
        // alert('this is value '+qty);
      }



    const handleDecreament=()=>{
      if(counter >=1)
      var qty = counter - 1 ;
      //  { qty<(2) ? setCounter(1) : setCounter(qty - 1) };
      setCounter(qty)
      props.onChange(qty)
      // alert('this is value '+qty); 
       }


    return(
        <div>
            <div style={{display:'flex' , flexDirection:'row'}}>
                 <Avatar className={classes.purple} onClick={()=>handleIncreament()}>+</Avatar>
                    <div style={{margin:15}}>  {counter}  </div>
                 <Avatar className={classes.purple} onClick={()=>handleDecreament()}>-</Avatar>
            </div>     
        </div>

    )


}

export  {QtyCntrl , qty}