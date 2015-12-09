import User from '../models/User';

class Users {
  getList() {
    var getUsers = User.find({}, '_id username').exec();
    return getUsers.then((users) => {
      return users;
    });
  }
}

export default Users;
