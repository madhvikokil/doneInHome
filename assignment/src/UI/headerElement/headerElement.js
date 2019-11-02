import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import{Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter }from 'react-router-dom';

class HeaderElement extends Component {
  state = { activeItem: 'home' }
  

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // if(this.props.location.pathname == pathname){
      
    // }

    const isApp = this.props.location.pathname.includes('/dashboard');
    console.log(this.props);
    
    const { activeItem } = this.state
   
    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          {this.props.isAuthenticate && !isApp &&
          <Menu.Item
          as={Link} to='/dashboard/posts'
          name='dashboard'
          active={activeItem === 'dashboard'}
          onClick={this.handleItemClick}
        />
          }
          {isApp ?
          <Menu.Item
            as={Link} to='/'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
        :
        <React.Fragment>
          <Menu.Item
           as={Link} to='/aboutus'
            name='aboutus'
            active={activeItem === 'aboutus'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
           as={Link} to='/contactus'
            name='contactus'
            active={activeItem === 'contactus'}
            onClick={this.handleItemClick}
          />
        </React.Fragment>
          }
         {this.props.isAuthenticate ?
         (<Menu.Item position="right">
           
         <Button class="ui button" as={Link} to ='/dashboard/posts'>Posts</Button>
         <Button class="ui button" as={Link} to ='/logout'>Log out</Button>
        
        </Menu.Item>) :
         (<Menu.Item position="right">
         <Button class="ui button" as={Link} to ='/signup'>Sign Up</Button>
         <Button class="ui button" as={Link} to ='/login'>Log In</Button>
       </Menu.Item>)
        }
        
        </Menu>
      </Segment>


    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate :state.red.token !==null
  }
}


export default withRouter(connect(mapStateToProps)(HeaderElement));
