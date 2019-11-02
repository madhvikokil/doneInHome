import React,{ Component } from 'react';
import Input from '../../UI/Input/Input';
import classes from './AuthSignup.css'
import Axios from '../../axios-orders';
import {Message,Segment} from 'semantic-ui-react';
import Auth from '../../store/actions/auth/auth';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/auth/auth';

import Validator from "validatorjs";
import { connect } from 'react-redux';


class AuthSignup extends Component {

state ={
    form: {
        email:'',
        password:'',
        name:''
    },
    errorMessage: {
        email:'',
        password:''
    },
    isSignUp:false
}

submitHandler = event => {
    event.preventDefault();
    if(!this.validate()) {
        console.log("here");
        this.props.onAuth(this.state.form.name, this.state.form.email, this.state.form.password, this.state.isSignUp)
        .then(() => {
            this.props.history.push('/login')
        })
    }

}

validate = () => {
    const rules = {
      email: 'required|email',
      password: 'required|min:6|max:15',
      name: 'required|min:4|max:15'
    };

    let validation = new Validator(this.state.form, rules);
    let isError = validation.fails();
    this.setState({ errorMessage: validation.errors.errors });
    return isError;
}

   
 
changeHandler = (e) => {
    let form = { ...this.state.form }
    //console.log(e.target.name);
    form[e.target.name] = e.target.value;
    //console.log(e.target.value);
    this.setState({ form });
    const rules = {
        email: 'required|email',
        password: 'required|min:4|max:15',
        name: 'required'
      };
  
      let validation = new Validator(this.state.form, rules);
      let isError = validation.fails();
      this.setState({ errorMessage: validation.errors.errors });
      return isError;
  }

  getValidationMessages = () => {
    let validationMessages = [];
    if (this.state.errorMessage.email) {
      validationMessages.push(<Message key="1"
        size='mini'
        error
        content={this.state.errorMessage.email} />)
    }
    if (this.state.errorMessage.password) {
      validationMessages.push(<Message key="2"
        size='mini'
        error
        content={this.state.errorMessage.password} />)
    }
    if (this.state.errorMessage.name) {
      validationMessages.push(<Message key="3"
        size='mini'
        error
        content={this.state.errorMessage.name} />)
    }
    return validationMessages;
  }


render() {
   

    let validationMessages = this.getValidationMessages();
    const formElementArray =[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]


            })
        }
       
        let formData =(

            <form>

          {validationMessages.length ? <Segment style={{ display: "block" }} stacked>
            {[...validationMessages]}
          </Segment> : null}
                <input type="text" placeholder="name" name="name" onChange={this.changeHandler}></input><br/>
                <input type="text" placeholder="Email" name="email" onChange={this.changeHandler}></input><br />
                <input type="password" placeholder="Password " name="password" onChange={this.changeHandler}></input><br/><br/>

                <button onClick={this.submitHandler}>Submit</button>
            </form>
        )
    return (
        <div className="signup">
            <h1> Enter Details...</h1>
            {formData}
        </div>
    
    )
}
}



const mapDispatchToProps =(dispatch) => {
    return{
        onAuth: (name, email, password, isSignUp) => dispatch(actions.auth(name, email, password, isSignUp))

    };
}
 
export default connect(null,mapDispatchToProps)(AuthSignup);