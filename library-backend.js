import { ApolloServer } from "@apollo/server"
import { GraphQLError } from "graphql"
import { v4 as uuidv4 } from "uuid"
import { startStandaloneServer } from "@apollo/server/standalone"

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*

 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: String
    id: ID!
    genres: [String]!
  }
  type Info {
   name: String!
   born: Int
  }
  type Author {
    info: Info!
    id: ID!
    
  }
  enum authorCheck {
    YES
    NO
  }
  type Query {
    booksCount: Int!,
    allBooks(author: String, genre: String): [Book!]!
    findBook(id: ID!): Book
    allAuthors: [Author!]!
    findAuthor(id: ID!): Author
    authorsCount: Int!
  }
  type Mutation {
    addBook(title: String!, published: Int!, author: String!, genres: [String]!): Book
    editBook(title: String!, published: Int!): Book
  }
`

const resolvers = {
  Query: {
    booksCount: () => books.length,
    allBooks: (root, args) => {
      if (!args.author) {
        return books
      }
      const byAuthor = (book) =>
        args.author === book.author ? book.author : !book.author
      return books.filter(byAuthor)
    },
    findBook: (root, args) => books.find((b) => b.id === args.id),
    allAuthors: () => authors.map((a) => ({ ...a, id: a.id })),
    findAuthor: (root, args) => authors.find((a) => a.id === args.id),
    authorsCount: () => authors.length,
  },
  Mutation: {
    addBook: (root, args) => {
      if (books.find((b) => b.title === args.title)) {
        throw new GraphQLError("Title must be unique", {
          extensions: { code: "ALREADY_EXISTS" },
          invalidArgs: args,
        })
      }
      const book = { ...args, id: uuidv4() }
      books = books.concat(book)
      return book
    },
    editBook: (root, args) => {
      const book = books.find((b) => b.title === args.title)
      if (!book) {
        return null
      }

      const updatedBook = { ...book, published: args.published }
      books = books.map((b) => (b.title === args.title ? updatedBook : b))
      return updatedBook
    },
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    genres: (root) => root.genres,
    id: (root) => root.id,
  },
  Author: {
    id: (root) => root.id,
    info: (root) => {
      return {
        name: root.name,
        born: root.born,
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
})

console.log(`Server ready at ${url}`)
