const dotenv = require('dotenv');
dotenv.config();
const { Client } = require("@notionhq/client");

// Initalize the client 
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

// Export getDatabase() to bring into server.js 
exports.getDatabase = async function () {
  const response = await notion.databases.query({
    database_id: databaseId})

    console.log(response);
    // Mapping through the paths
    const responseResults = response.results.map((page) => {
      return {
        id: page.id,
        // Using Expression: optional chaining operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
        name: page.properties.Name.title[0]?.plain_text,
        address: page.properties.Address.rich_text[0]?.plain_text,
      }
    });
    // Test to see response that we are getting back
    console.log(responseResults);
    return responseResults;
}

// To add a new entry
// Notion API - Create a Page: https://developers.notion.com/reference/post-page
exports.newEntryToDatabase = async function (name, address) {
  const response = await notion.pages.create({
    parent: {
      database_id: databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      Address: {
        rich_text: [
          {
            text: {
              content: address,
            },
          },
        ],
      },
    }
  });
  return response;
};


// To add an item

// async function addItem(text) {
//   try {
//     const response = await notion.pages.create({
//       parent: { database_id: databaseId },
//       properties: {
//         title: {
//           title:[
//             {
//               "text": {
//                 "content": text
//               }
//             }
//           ]
//         }
//       },
//     })
//     console.log(response)
//     console.log("Success! Entry added.")
//   } catch (error) {
//     console.error(error.body)
//   }
// }

// addItem("Yurts in Big Sur, California")
