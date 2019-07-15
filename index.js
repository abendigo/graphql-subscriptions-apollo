const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    random: Float
  }

  type Subscription {
    random: Float
  }
`;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const resolvers = {
  Query: {
    random: () => Math.random(),
  },
  Subscription: {
    random: {
      subscribe: async function* asyncRandomNumbers() {
        while (true) {
          yield { random: Math.random() };
          await sleep(1000);
        }
      }
    }
  }
};

// Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
