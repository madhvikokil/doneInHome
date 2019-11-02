import React from 'react';
import Axios from '../../axios-orders';
import { withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';


class Modal extends React.Component {

    componentDidMount() {
       
        console.log("id: ");
        console.log(this.props.match.params.id);
        console.log("hello");
            Axios.get(`newPosts/${this.props.match.params.id}.json`)
            .then(response => {
              console.log(response);
              console.log("Success");
              console.log(response.data.title);
              console.log(response.data.description);
              this.setState({des:response.data.description,
                            title: response.data.title,
                            cd:response.data.createdDate,
                            ud:response.data.updatedDate})
             
            })
            .catch(error => {
                console.log("error");
                console.log(error)
            })
        }

        state ={
            title:'',
            des:'',
            cd:'',
            ud:''
        }
      
    
    render(){
        const html = this.state.des ;
        return(
            <div><br/><hr/>
           
                <p><b>Title :</b> {this.state.title}</p>
                <p><b>Description :</b>
                <div>{ReactHtmlParser(html) }
                </div></p>
                <p><b>Created Date :</b> {this.state.cd}</p>
                <p><b>Updated Date :</b> {this.state.ud}</p>
                
            </div>
        

        )
    }
}

export default withRouter(Modal);

