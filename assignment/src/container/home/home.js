
import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Route,Link } from 'react-router-dom';
import Axios from '../../axios-orders';
import PublicPost from '../../component/publicPost/publicPost';

class Home extends Component{
    state ={
        fullPosts:[],
        publishedPosts:[]
    }

    componentDidMount() {
        Axios.get('/newPosts.json')
        .then(response => {
            const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
        })
    }
    console.log("fetchedOrders :",fetchedOrders)
    this.setState({fullPosts:fetchedOrders})
    let showArray = [];
    showArray= fetchedOrders.filter(post => post.type =='published');
    this.setState({publishedPosts:showArray});
})
    }
    render() {
        return(
            <div>
                <Menu>
                {
                this.state.publishedPosts.map(data => (
                    <Menu.Item name={data.title}
                    as={Link} to ={`/publicPosts/${data.id}`}
                    />))
                }
                </Menu>
                <Route path="/publicPosts/:id" component={PublicPost}/>
            </div>
               
         )
    }
}

export default Home;