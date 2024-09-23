import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";

export const handler = async (event) => {
    const noteID = event.pathParameters.noteID;

    if(!noteID) {
        return sendError(400, { message: 'noteID is required' });
    }

    try {
        // get för att hämta en note ur notes-db tabellen
        const { Item } = await db.get({
            TableName : "notes-db",  // Använd ditt tabellnamn
            Key : { noteID : noteID },
        });

        // Kontrollera om det finns något objekt
        if (Item) {
            return sendResponse(200, Item);  // Returnera objektet
        } else {
            return sendError(404, `No notes found with noteID ${noteID}...`);  // Om det inte finns någroy objekt
        }
    } catch (error) {
        console.error("error fetching note", error);
        return sendError(500, error.message);  
    }
};
