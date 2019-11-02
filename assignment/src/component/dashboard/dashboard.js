import React from 'react';
import { Route} from 'react-router-dom';
import './dashboard.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 
import Lists from '../../container/lists/lists';
import addPost from '../addPost/addPost';
import Modal from '../Modal/Modal';


class Dashboard extends React.Component{

    componentDidMount() {
     
        console.log("fteched data");
    }

     clickHandler=()=> {
        this.props.history.push('/dashboard/posts');
    }
    
    render(){
        
        const userid=localStorage.getItem('userId');
        const token= localStorage.getItem('token');
        console.log("userId: ",userid);
        console.log("token: ",token);

        // if('/dashboard'){
        //     showButton = <button onClick={this.clickHandler}> See Posts </button>
        // }

        return(
           <div className="example">
                <h1> Dashboard</h1>

                    <Route path="/dashboard/posts" exact component={Lists} />
                    {/* {showButton} */}
                    <Route path="/dashboard/preview/:id" component={Modal}/>
                    <Route path="/dashboard/posts/:id" component={addPost}/>
                    
            </div> 
        )
    }

}


const mapStateToProps =state=>{
    return{

        token: state.red.token,
        userId :state.red.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard));