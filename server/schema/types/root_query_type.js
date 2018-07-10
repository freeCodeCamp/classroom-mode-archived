const graphql = require('graphql')

const { GraphQLObjectType, GraphQLID } = graphql
const TeacherType = require('./teacher_type')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    teacher: {
      type: TeacherType,
      resolve(parentValue, args, req) {
        return req.teacher
      },
    },
  },
})

module.exports = RootQueryType
