import * as dotenv from 'dotenv'
dotenv.config();
import { Client } from "@notionhq/client";

// Initalize the client 
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

// Database connection test
const getDatabase = async () => {
  const response = await notion.databases.query({
    database_id: databaseId})
    console.log(response);
}

getDatabase();

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
