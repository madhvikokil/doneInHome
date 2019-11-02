import React from 'react';
import './list.css';
import Axios from '../../axios-orders';
import {fetchOrders} from '../../store/actions/lists/lists';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class List extends React.Component {
  
    state ={
        posts:[]
    }
   // Deleting the data from the firebase
    deleteHandler = () => {
        console.log("Delete...");
        Axios.delete(`newPosts/${this.props.id}.json`)
            .then(response => {
                console.log("Pagination delete");
            this.props.onFetchOrders(this.props.token,this.props.userId)
            // .then(response =>{
            //     console.log("new response");
            //     console.log(response);
            //     this.setState({list:response})
            // })

        })
    }

    //  editHandler = () => {
    //     console.log("edit");
    //     console.log("title", this.props.title);
    //     console.log("description",this.props.description);
    //     console.log("id: ",this.props.id);
    //     this.props.history.push(`/dashboard/posts/${this.props.id}`)
    //     }

    //   previewHandler = () => {
    //      console.log("preview");
    //      this.props.history.push(`/dashboard/preview/${this.props.id}`);
         
        
    // }
render(){
    return(
        
        <div className="box">
            
            <table border="1px solid black" width="95%">
                <tr>
                    <button className="button-class" onClick={this.previewHandler} > preview </button>
                    <button className="button-class" onClick={this.deleteHandler}> delete </button>
                    <button className="button-class" onClick={this.editHandler} >  edit </button>
                        <h3>Title :  {this.props.title} </h3>
                        <h3>Created Date : {this.props.createdDate}</h3>
                        <h3>Updated Date : {this.props.updatedDate}</h3>
                </tr>
            </table>
           
        </div>
        
      
    )
};
}

const mapStateToProps =state=>{
    return{
     
        token: state.red.token,
        userId :state.red.userId,
        list: state.ord.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(fetchOrders(token,userId))
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(List));
