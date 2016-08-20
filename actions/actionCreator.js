import API from '../API/api.js';
export const LOAD_PROFILE_PHOTO = 'LOAD_PROFILE_PHOTO';

export function handle_initial_load(userId){
	return (dispatch) => {
		API.fetchMyProfilePhoto(userId).
		then((response) => {
				return dispatch({
					type : 'LOAD_PROFILE_PHOTO',
					response
				})
		});
	}
}

export function handle_friend_list(userId) {
	return (dispatch) => {
		API.fetchFriends(userId).
		then((response) => {
				if(response.length > 0){
						return dispatch({
							type : 'LOAD_FRIENDS',
							response
					})
				}
				
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