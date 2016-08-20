import API from '../API/api.js';
export const LOAD_PROFILE_PHOTO = 'LOAD_PROFILE_PHOTO';

export function handle_initial_load(){
	return (dispatch) => {
		API.fetchMyProfilePhoto().
		then((response) => {
				return dispatch({
					type : 'LOAD_PROFILE_PHOTO',
					response
				})
		});
	}
}

export function handle_friend_list() {
	return (dispatch) => {
		API.fetchFriends().
		then((response) => {
				return dispatch({
					type : 'LOAD_FRIENDS',
					response
				})
		});
	}
}

export function handle_friend_profile_photo(id) {
	return (dispatch) => {
		API.fetchFriendsPhoto(id).
		then((response) => {
				return dispatch({
					type : 'LOAD_FRIENDS_PHOTO',
					response
				})
		});
	}
}