import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import Users from '../lib/users';

const users = new Users();

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A users public information.',
  fields: () => ({
    _id: {
      description: 'The users id.',
      type: GraphQLString
    },
    username: {
      description: 'The users username.',
      type: GraphQLString
    },
    mail: {
      description: 'The users E-Mail address.',
      type: GraphQLString
    }
  })
});

const _self = {
  description: 'Information about the currently logged in user.',
  type: userType,
  resolve(parentValue, _, { rootValue: { session } }) {
    if(session.passport) {
      return session.passport.user;
    }
  }
};

const _list = {
  description: 'Information about all users.',
  type: new GraphQLList(userType),
  resolve(parentValue, _, { rootValue: { session } }) {
    return users.getList();
  }
};

const _updateMail = {
  description: 'Update your mail address.',
  type: userType,
  args: {
    mail: {
      description: 'The Mail address to set.',
      type: GraphQLString
    }
  },
  resolve(parentValue, _, { rootValue: { session } }) {
    if(session.passport) {
      return users.updateMail(session.passport.user._id, _.mail);
    }
  }
}

const _signup = {
  description: 'Signup for a user account.',
  type: userType,
  args: {
    username: {
      description: 'The chosen username.',
      type: GraphQLString
    },
    password: {
      description: 'The chosen password.',
      type: GraphQLString
    }
  },
  resolve(parentValue, _, { rootValue: { data } }) {
    return users.signup(_.username, _.password);
  }
}

export const selfField = _self;
export const userListField = _list;
export const userUpdateMailField = _updateMail;
export const userSignupField = _signup;
