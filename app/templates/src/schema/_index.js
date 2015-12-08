import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getItemField } from './items';
import { selfField, userListField } from './users';

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    getItem: getItemField,
    self: selfField,
    users: userListField
  })
});

export const Schema = new GraphQLSchema({
  query: queryType
});
