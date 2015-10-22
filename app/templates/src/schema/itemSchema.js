import Items from '../lib/items';
import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

const items = new Items();

const itemType = new GraphQLObjectType({
  name: 'Item',
  description: 'An item.',
  fields: () => ({
    id: {
      description: 'The items id.',
      type: GraphQLInt
    },
    name: {
      description: 'The items name.',
      type: GraphQLString
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Query item related information.',
  fields: () => ({
    find: {
      description: 'Find an item by id.',
      type: itemType,
      args: {
        id: {
          description: 'ID of the item to retreive.',
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, {id}) => items.getById(id)
    }
  })
});

export const ItemSchema = new GraphQLSchema({
  query: queryType
});
