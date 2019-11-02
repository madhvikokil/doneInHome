import Axios from '../../../axios-orders';
import firebase from "firebase";
import * as actionTypes from '../actionTypes';
import { Route } from 'react-router-dom';
import { Redirect,Link } from 'react-router-dom';


// const firebaseConfig = {
//     apiKey: "AIzaSyAQhsLsRX4QrkPtp7OQCA11_oTnxIZ8nZA",
//     authDomain: "assignment-cms.firebaseapp.com",
//     databaseURL: "https://assignment-cms.firebaseio.com",
//     projectId: "assignment-cms",
//     storageBucket: "assignment-cms.appspot.com",
//     messagingSenderId: "525478083915",
//     appId: "1:525478083915:web:7f038755f69cbaf04ebcce",
//     measurementId: "G-7KEPVNLR0G"
//   };

export const authStart =() => {
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess =(token,userId) => {
    
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
        
    }
}

export const authFail =(error) => {
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}


export const checkOutTimeout =(expiration) => {
    return dispatch=>{
         setTimeout(() => {
            dispatch(logout());
         },expiration * 1000)
    }
}

export const logout =() => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const submit =(info,token) => {
        return dispatch => new Promise((resolve, reject) => {
        
        //dispatch(authSuccess(response.data.idToken,response.data.localId));
      Axios.post('/newPosts.json?auth=' + token,info)
        .then (response => {
            alert("Data Added Successfully");
            resolve();
            // this.props.history.push('/dashboard/posts');
            console.log("hei");
            console.log(response.data);
         })
           
        .catch ( error => {
       console.log(error);
    });
    });
}


export const auth = (name,email,password,isSignup)=>{
        return dispatch => new Promise((resolve, reject) => {
       console.log("my data");
        const authData = {
            name:name,
            email:email,
            password:password,
            userType:'USER',
            returnSecureToken : true
        };
        console.log(password);
        console.log(authData);
        console.log("Auth.js");
        console.log("signup:",isSignup);
        let url;
        if(!isSignup){
           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAQhsLsRX4QrkPtp7OQCA11_oTnxIZ8nZA'
        }
        Axios.post(url,authData)
            .then(response => {
                console.log(response.data.localId)
                Axios.put('/userData/'+response.data.localId+'.json',authData);
                // Axios.post(`/newPosts`)
                console.log(response);
                console.log(authData);
                console.log("Successfully Signed up...");  
                resolve();
                
                // const expirationDate = new Date(new Date() .getTime()+ response.data.expiresIn * 1000);
                // localStorage.setItem('token',response.data.idToken);
                // localStorage.setItem('expirationDate',expirationDate);
                // localStorage.setItem('userId',response.data.localId);
               
                // dispatch(authSuccess(response.data.idToken,response.data.localId));
                
                //dispatch(checkOutTimeout(response.data.expiresIn));

            })
            .catch(err=> {
                console.log(err);
                alert("Already Exists");
                // // <Redirect to ="/login"/>
                // console.log("Invalid User");
                // console.log("error response")
               
               
            })
    });
}

export const authLogin = (email,password,isSignUp)=>{
    return dispatch => new Promise((resolve, reject) => {
   console.log("my data");
    const authData = {
        isSignup:isSignUp,
        email:email,
        password:password,
        returnSecureToken : true
    };
    console.log(authData);
    console.log("Auth.js");
    console.log("email :",email);
     console.log("signup:",isSignUp);
    let url;
    if(isSignUp){
       url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAQhsLsRX4QrkPtp7OQCA11_oTnxIZ8nZA'
    }
       
    Axios.post(url,authData)
        .then(response => {
            console.log("admin user login");
            console.log(response)
            console.log("Successfully Logged..."); 
            Axios.put(url,authData); 
             resolve();
            
            const expirationDate = new Date(new Date() .getTime()+ response.data.expiresIn * 1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            localStorage.setItem('email',response.data.email);
            dispatch(authSuccess(response.data.idToken,response.data.localId));
         })
          
            
//             //dispatch(checkOutTimeout(response.data.expiresIn));

//         })
        .catch(err=> {
            console.log(err);
            alert("Invalid User");
            // <Redirect to ="/login"/>
            console.log("Invalid User");
            console.log("error response")
           
           
//         })
// });
})
 })
}



export const authCheckState =()=> {
    return dispatch => {
        const token = localStorage.getItem('token')

        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(checkOutTimeout((expirationDate.getTime() - new Date().getTime())/ 1000))
            }
           
        }
    }
}
