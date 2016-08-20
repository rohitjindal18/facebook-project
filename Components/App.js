import React from 'react';
import { connect } from  'react-redux';
import Avatar from 'material-ui/Avatar';
import {handle_initial_load , handle_friend_list , handle_friend_profile_photo} from '../actions/actionCreator.js';
import Paper from 'material-ui/Paper';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import API from '../API/api.js';

class Friends extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friendL : [],
			imagePath : []
		}
	}

	componentWillMount() {
		this.setState({
			friendL : this.props.friends
		});
	}

	componentWillReceiveProps() {
		this.setState({
			friendL : this.props.friends
		});
	}
	render() {
		this.state.friendL.map((elem , index) => {
			API.fetchFriendsPhoto(elem.id).
				then((resp) => {
						this.setState({
							imagePath : this.state.imagePath.concat(resp)
						});
				});
		})
		var friendList = this.state.friendL.map((elem , index) => {
			return(
				<ListItem key={index}
					leftAvatar={
			        <Avatar src={this.state.imagePath[index]} />
			      }
				>{elem.name}</ListItem>
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
			friendLis : []
		}
	}
	componentWillMount() {
		this.props.dispatch(handle_initial_load());
	}
	componentDidMount(){
		this.setState({
			friendLis : this.props.appData.friends
		});
		this.props.dispatch(handle_friend_list());
	}

	componentWillReceiveProps() {
		this.setState({
			friendLis : this.props.appData.friends
		});
	}

	render() {
		return(
			<div>
				<Paper style={styles.mainPhoto} zDepth={3} circle={true}>
						<img style={styles.imageProfile} src={this.props.appData.profilePhotoPath} />
				</Paper>
				<Friends {...this.props} friends={this.props.appData.friends}/>
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