import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getItemField } from './items';<% if (authLocal) { %>
import { selfField, userListField } from './users';<% } %>

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    getItem: getItemField<% if (authLocal) { %>,
    self: selfField,
    users: userListField<% } %>
  })
});

export const Schema = new GraphQLSchema({
  query: queryType
});
