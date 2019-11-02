import React from "react";
import AddPost from "../addPost/addPost";
import AddPost from '../../component/addPost/addPost';

class PostContainer extends React.Component {
    render() {
        return(
            <Route to="/add/:postId" component = { AddPost } />
        );
    }
}

export default PostContainer;