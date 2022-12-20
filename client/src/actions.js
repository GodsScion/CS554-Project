const login = (id, name, img) => ({
  type: 'LOGIN',
  payload: {
    id: id,
    name: name,
    img: img,
  }
});

const logout = () => ({
  type: 'LOGOUT',
  payload: {}
});

const updateUser = (id, name, img) => ({
  type: 'UPDATE_USER',
  payload: { id, name, img }
});

module.exports = {
  login,
  logout,
  updateUser,
};
