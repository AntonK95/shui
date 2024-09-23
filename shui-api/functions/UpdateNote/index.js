import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";

export const handler = async (event) => {
    console.log("Event: ", JSON.stringify(event));

    const { noteID } = event.pathParameters;
    const { textContent } = JSON.parse(event.body);

    if (!noteID) {
        console.log("No noteID provided");
        return sendError(400, { message: 'note ID is required' });
    }

    // Kontrollera om noten existerar
    // const checkNote = await db.get({
    //     TableName: "notes-db",
    //     Key: { noteID: noteID }
    // });

    // if (!checkNote.Item) {
    //     return sendError(404, { message: `Note with ID ${noteID} not found` });
    // }

    let updateExpression = 'SET';
    let expressionAttributeValues = {};
    let updateExpressions = [];

    if (textContent !== undefined) {
        updateExpressions.push('textContent = :textContent');
        expressionAttributeValues[':textContent'] = textContent;
    }

    updateExpression += ' ' + updateExpressions.join(', ');

    try {
        console.log(`Attempting to update note with ID: ${noteID}`);
        const result = await db.update({
            TableName: "notes-db",
            Key: { noteID: noteID },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW"
        });

        console.log('Update result:', result);

        return sendResponse(200, { message: `note ${noteID} updated!`, item: result.Attributes });
    } catch (error) {
        console.error("Error updating note: ", error);
        return sendError(500, { message: `Error updating note: ${error.message}` });
    }
};
