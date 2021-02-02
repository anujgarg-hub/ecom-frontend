import React ,{useState , useEffect} from 'react';
import {getData, ServerURL } from '../FetchNodeSevices';


export default function Displayall(props){

    const [getList , setList]=useState([]);


    const fetchData =async()=>{

        let list = await getData('category/displayall')
        setList(list)
    }

    useEffect(function(){

        fetchData()

    },[])


    const displayData=()=>{
      
        return(
            getList.map((item , key)=>{
                return(
                    <tr>
                        <td> {key+1} </td>
                        <td> {item.categoryname} </td>
                        <td> {item.description}  </td>
                        <td> <img src={`${ServerURL}/images/${item.icon}`} width='35' height='35' /></td>
                    </tr>

                )})
        )
        
    } 

    return(

        <div>
            <center>
                <caption> List Of Categories </caption>
        <table cellSpacing='0' border='1'>
            <tr> 
                <th> Index </th>
                <th> Category Name </th>
                <th> Description </th>   
                <th> Icon </th>   
            </tr>
            {displayData()}
        </table>
        </center>
        </div>

    )
}
