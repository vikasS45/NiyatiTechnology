import {ADD_USER, DELETE_USER, EDIT_USER} from '../actionTypes';

const initialState = {
  userList: [],
  currentUser: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      const {
        id,
        photo,
        name,
        emailId,
        mobile,
        birthDate,
        latitude,
        longitude,
      } = action.payload;
      return {
        ...state,
        userList: [
          ...state.userList,
          {
            id,
            photo,
            name,
            emailId,
            mobile,
            birthDate,
            latitude,
            longitude,
          },
        ],
      };
    }
    case DELETE_USER: {
      const {id} = action.payload;
      return {
        ...state,
        userList: state.userList.filter(user => user.id !== id),
      };
    }
    case EDIT_USER: {
      const {user} = action.payload;
      let userData = state.userList;
      let index = state.userList.findIndex(users => users.id === user.id);

      console.log('Index from reducer', index);
      if (index !== -1) {
        userData[index].photo = user.photo;
        userData[index].name = user.name;
        userData[index].emailId = user.emailId;
        userData[index].mobile = user.mobile;
        userData[index].birthDate = user.birthDate;
        userData[index].latitude = user.latitude;
        userData[index].longitude = user.longitude;
      }
      state = (state, {userList: userData});

      console.log('New Updated Data', state);
      return state;
    }
    default:
      return state;
  }
}
