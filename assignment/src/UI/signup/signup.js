import React, { Component } from 'react'

class Signup extends Component{

     state ={ 
        controls: {
            email : {    
                elementType :'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true
                },
                vaild:false,
                touched:false
             },
             password : {    
                elementType :'input',
                elementConfig:{
                    type:'password',
                    placeholder:'password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:7
                },
                vaild:false,
                touched:false
             }
        },
        isSignup:true
    }
    render(){
        return(

<div class="ui equal width form">
  <div class="fields">
    <div class="field">
      <label>First Name</label>
      <input type="text" placeholder="firstname"></input>
    </div>
    </div>
    <div class="field">
      <label>Last Name</label>
      <input type="text" placeholder="lastname"></input>
    </div>
  
  <div class="fields">
    <div class="field">
      <label>Email</label>
      <input type="email" placeholder="Email"></input>
    </div>
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password" placeholder="Password"></input>
    </div>

  <button class="ui button" type="submit">Signup</button>
</div>
        )
    }

}

export default Signup;