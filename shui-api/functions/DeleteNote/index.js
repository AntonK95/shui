import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";

export const handler = async (event) => {
    console.log("Event: ", JSON.stringify(event));

    const noteID = event.pathParameters?.noteID;

    if (!noteID) {
        console.log("No ID provided");
        return sendError(400, { message: 'Note ID is required' });
    }

    try {
        console.log(`Attempting to delete note with ID: ${noteID}`);
        const result = await db.delete({
            TableName : "notes-db",
            Key: { noteID: noteID },
            ReturnValues: "ALL_OLD" // Returnerar det raderade objektet
        });

        console.log('Delete result:', result);

    } catch (error) {
        console.error("Error deleting note: ", error);
        return sendError(500, { message: `Error deleting note: ${error.message}` });
    }
};
