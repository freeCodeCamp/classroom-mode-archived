const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const TeacherType = new GraphQLObjectType({
  name: 'TeacherType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
  },
})

module.exports = TeacherType
