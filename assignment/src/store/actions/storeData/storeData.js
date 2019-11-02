import * as actionTypes from '../actionTypes';
import Axios from '../../axios-orders';

// export const data =(token) => {
//     return{
//         type:actionTypes.DATA_SUBMIT,
//         token:token
//     }
// }

// export const dataSubmit =(info,token) => {
//     const obj ={
//         info:info,
//         token:token
//     }
//     return dispatch =>{
//         //  dispatch(data(token));
//       Axios.post('/data.json?auth=' + token,obj)
//         .then (response => {
//             console.log(response.data);
         
//         })
           
//         .catch ( error => {
//        console.log(error);
//     });
//     }
// }