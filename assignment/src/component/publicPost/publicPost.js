import React ,{Component} from 'react';
import Axios from '../../axios-orders';
import { withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

class PublicPosts extends Component{

    state={
        title:'',
        des:'',
        cd:'',
        ud:'',
        id:''
    }

    componentDidMount(){
        console.log("get the Id");
        console.log("here");
        
        Axios.get('/newPosts');
        console.log("id :",this.props.match.params.id);
        this.setState({id:this.props.match.params.id});
        // Axios.get(`/newPosts/${this.props.match.params.id}.json`)
        // .then(response => {
        //     console.log("public posts response");
        //     console.log(response);
        //     this.setState({ title:response.data.title,
        //                     des:response.data.description,
        //                     cd:response.data.createdDate,
        //                     up:response.data.updatedDate
        //     })
        // })
    }

    componentDidUpdate(){
        console.log("id");
       
        console.log("In comonent did update");
        console.log(this.props.match.params.id);
        Axios.get(`/newPosts/${this.props.match.params.id}.json`)
        .then(response => {
            console.log("public posts response");
            console.log(response);
            this.setState({ title:response.data.title,
                            des:response.data.description,
                            cd:response.data.createdDate,
                            up:response.data.updatedDate
            })
        })
        // this.setState({id:this.props.match.params.id});
        
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
            
               
          
        );
    }
}


export default withRouter(PublicPosts);