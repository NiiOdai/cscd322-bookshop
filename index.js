const {ApolloServer, gql} = require("apollo-server");
const port =process.env.PORT || 8000;

// const express = require('express');

// const app =express();
// app.listen (4000,() => {
//     console.log("Server started on port 4000");
// })
//Schemas
//typeDefs
const books = [
    {
        title:"Harry Kane and the Chamber of Secrets",
        author:"J.K. Rowling",
        ISBN:"0-7475-3269-9"
    },
    {
        title:"Jurassic Park",
        author:"Michael Crichton",
        ISBN: "0-7475-3269-9"
    }
];
//type NameOfthe type

const schemas = gql`

    type Book {
        title: String!
        author: String!
        ISBN: String
    }
    type Query {   
            books:[Book]
            book(title:String!):Book
        }
    type Mutation {
        createBook(title: String!, author: String!,ISBN: String): Book
    }

`;
const booksResolvers = {
    Query:{
        books:() => books,
        book: (parent,args) => books.find(book => book.title ==args.title)
    },
    Mutation:{
        createBook: (parent,args) =>{
            const {title, author,ISBN} = args;
            const book = {title, author,ISBN };
            books.push(book);
            return book;
        }
    },
}
const server = new ApolloServer({ 
    typeDefs: schemas,
    resolvers: booksResolvers,
    playground: true,
    introspection: true});

server.listen(port).then(({url}) => {
    console.log(`Server ready at ${url} and ready to be used`);
}).catch(err => console.log(err.message));