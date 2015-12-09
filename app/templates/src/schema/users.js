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

export const selfField = _self;
export const userListField = _list;
