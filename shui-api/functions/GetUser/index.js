import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";

export const handler = async (event) => {
    const username = event.pathParameters.username;

    if (!username) {
        return sendError(400, { message: 'Username is required' });
    }

    try {
        console.log('Söker efter username:', username);
        // Query för att hämta användare ur "users-db" tabellen
        const result = await db.query({
            TableName: 'users-db',
            IndexName: 'UsernameIndex', // Använd GSI
            KeyConditionExpression: 'username = :username',
            ExpressionAttributeValues: { ':username': username },
        });

        console.log(result);

        // Kontrollera om det finns några objekt
        if (result.Items && result.Items.length > 0) {
            const user = result.Items[0]; // Returnera första användarobjektet i user
            return sendResponse(200, user);  
        } else {
            return sendError(404, `No user found with username ${username}...`);  
        }
    } catch (error) {
        // Hantera eventuella fel
        console.error("error fetching user", error);
        return sendError(500, error.message); 
    }
};
