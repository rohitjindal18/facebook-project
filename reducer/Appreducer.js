const initialState = {
	profilePhotoPath : "",
	friends : [],
	friendsPhoto : []
};

function appData(state = initialState ,  action){
	switch(action.type) {
		case 'LOAD_PROFILE_PHOTO':
			return {
				...state ,
				profilePhotoPath : action.response
			}
		case 'LOAD_FRIENDS':
			return {
				...state ,
				friends : action.response
			}
		case 'LOAD_FRIENDS_PHOTO':
			return {
				...state
			}
		default:
			return state;
	}
}

export default appData;