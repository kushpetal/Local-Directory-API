# Directory Listing API for Local Server
###### Built through Node.Js, GraphQL & Apollo

## Installation
1. Change `port` and `host` variables in **app.js** suited to your environment.
2. Run `npm install` from the project directory into the command line (installing the dependencies).
3. Run `npm start`.
- If app crashes: `npm uninstall babel` -> `npm install --save-dev babel-cli` -> `npm start`.
4. Test API on: `http://HOST-VARIABLE:POST-VARIABLE/graphql`

## GraphQL Playground
Query Example:

```
{
  fileDirectory(rootPath: "DIRECTORY_PATH_HERE", depth: 100) {
    name
    type
    size
    path
    children {
      name
      type
      size
      path
      extension
    }
  }
}
```
![](/images/DirectoryApiQuery.png)

# Dependencies
- [Babel](https://babeljs.io/docs/en/)
- [Apollo Server Core](https://www.npmjs.com/package/apollo-server-core)
- [Apollo Server Express](https://www.npmjs.com/package/apollo-server-express)
- [Express](https://expressjs.com/en/4x/api.html)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [GraphQL](https://graphql.org/code/#javascript)
- [dree](https://www.npmjs.com/package/dree)

_**Resources Used:**_

- https://dev.to/peaonunes/loading-a-directory-as-a-tree-structure-in-node-52bg (tree structure) 
- https://www.apollographql.com/docs/apollo-server/data/resolvers/ (data sourcing)
