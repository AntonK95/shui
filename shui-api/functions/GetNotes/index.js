import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";  

export const handler = async (event) => {
    try {
        // Scan för att hämta alla objekt i "notes-db" tabellen
        const { Items } = await db.scan({
            TableName: "notes-db",  // Använd ditt tabellnamn
        });

        // Kontrollera om det finns några objekt
        if (Items.length > 0) {
            return sendResponse(200, Items);  // Returnera alla objekt
        } else {
            return sendError(404, "No notes found!");  // Om det inte finns några objekt
        }
    } catch (error) {
        // Hantera eventuella fel
        console.error("error fetching todos", error);
        return sendError(500, error.message);  // Returnera ett felmeddelande
    }
};
