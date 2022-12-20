const initalState = {
  isUserLoggedIn: false,
  id: "",
  name: "",
  img: ""
};

const userReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN':
      console.log('payload', payload);
      return { isUserLoggedIn: true, id: payload.id, name: payload.name, img: payload.img };
    case 'LOGOUT':
      return initalState;
    case 'UPDATE_USER':
      console.log('payload', payload);
      return { isUserLoggedIn: true, id: payload.id, name: payload.name, img: payload.img };
    default:
      return state;
  }
};

export default userReducer;
