import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getItemField } from './items';<% if (authLocal) { %>
import {
  selfField,
  userListField,
  userSignupField,
  userUpdateMailField
} from './users';<% } %>

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    getItem: getItemField<% if (authLocal) { %>,
    self: selfField,
    users: userListField<% } %>
  })
});
<% if (authLocal) { %>
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    signup: userSignupField,
    updateEmail: userUpdateMailField
  })
});<% } %>

export const Schema = new GraphQLSchema({
  query: queryType<% if (authLocal) { %>,
  mutation: mutationType<% } %>
});
