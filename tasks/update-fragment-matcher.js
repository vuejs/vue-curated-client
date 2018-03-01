const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const GRAPHQL_URI = process.env.GRAPHQL_URL || 'http://localhost:3000/graphql'

fetch(GRAPHQL_URI, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
.then(result => result.json())
.then(result => {
  // here we're filtering out any type information unrelated to unions or interfaces
  const filteredData = result.data.__schema.types.filter(
    type => type.possibleTypes !== null,
  )
  result.data.__schema.types = filteredData
  const file = path.resolve(__dirname, '../src/api/fragment-types.json')
  fs.writeFile(file, JSON.stringify(result.data), err => {
    if (err) {
      console.error(err)
      throw new Error('Error writing fragmentTypes file')
    }
    console.log('Fragment types successfully extracted!')
  })
})
.catch(e => {
  console.error(e)
  process.exit(1)
})
