import React from 'react';
import { connect } from  'react-redux';
import Avatar from 'material-ui/Avatar';
import {handle_initial_load , handle_friend_list , handle_friend_profile_photo} from '../actions/actionCreator.js';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import API from '../API/api.js';

class FriendsPhoto extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded : false,
			photoPath : ""
		}
	}

	handleClick(index) {
		this.props.handleFriendClick(index);

	}
	componentWillMount() {
		API.fetchFriendsPhoto(this.props.friendId).
			then((resp) => {	
				//console.log("cnae");
				this.setState({
					photoPath : resp,
					isLoaded : true 
				});
			});
	}

	componentWillUnmount() {
		this.setState({
			isLoaded : false
		});
	}

	componentWillReceiveProps(nextProps) {
			this.setState({
				isLoaded : false
			});	
			API.fetchFriendsPhoto(nextProps.friendId).
			then((resp) => {	
				this.setState({
					photoPath : resp,
					isLoaded : true 
				});
			});
	}

	render() {
		var component = this;
		if(!this.state.isLoaded){
			return(
				<ListItem onClick={this.handleClick.bind(component , this.props.friendIndex)} key={this.props.friendIndex}
					leftAvatar={
					        <Avatar src="../Images/user.png" />
					      }>
						{this.props.friendName}
				</ListItem>
			);
		}
		else {
			return(
				<ListItem onClick={this.handleClick.bind(component , this.props.friendIndex)} key={this.props.friendIndex}
					leftAvatar={
					        <Avatar src={this.state.photoPath} />
					      }>
						{this.props.friendName}
				</ListItem>
			);
		}
		
	}
}


class Friends extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friendL : [],
			imagePath : [],
			isChanged : false
		}
	}

	componentWillMount() {
		this.setState({
			friendL : this.props.friends
		});
	}

	shouldComponentUpdate(){
		return (this.state.friendL.length != this.props.friends.length);
	}

	componentWillReceiveProps() {
		this.setState({
			friendL : this.props.friends
		});
	}

	handleClick(index) {
		this.props.handleFriendClick(this.state.friendL[index].id);
	}
	render() {
		var component = this;
		var friendList = this.state.friendL.map((elem , index) => {
			return(
					<FriendsPhoto friendId={elem.id} friendIndex={index} friendName={elem.name} handleFriendClick={this.handleClick.bind(this)}/>
				);
		});
	
		return(
			<div>
				<List>
				{friendList}
				</List>
			</div>
		);
	}
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state= {
			userId : "me",
			friendLis : []
		}
	}
	componentWillMount() {
		this.props.dispatch(handle_initial_load(this.state.userId));
	}
	componentDidMount(){
		console.log("11");
		this.setState({
			friendLis : this.props.appData.friends
		});
		this.props.dispatch(handle_friend_list(this.state.userId));
	}

	handleClicked(index) {
		this.props.dispatch(handle_initial_load(index));
		this.props.dispatch(handle_friend_list(index));
	}

	render() {
		return(
			<div>
				<Paper style={styles.mainPhoto} zDepth={3} circle={true}>
						<img style={styles.imageProfile} src={this.props.appData.profilePhotoPath} />
				</Paper>
				<Friends handleFriendClick={this.handleClicked.bind(this)} {...this.props} friends={this.props.appData.friends}/>
			</div>
		);
	}
};

var styles = {
	mainPhoto : {
		height : 100,
		width : 100,
		textAlign : 'center',
		marginLeft : '40%'
	},
	imageProfile : {
		height : 100 ,
		width : 100 , 
		borderRadius : 50
	}
}

function mapStateToProps (state) {
	const { appData } = state;
	return {
		appData
	};
}

export default connect(mapStateToProps)(App);