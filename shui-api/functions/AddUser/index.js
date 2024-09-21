
import { v4 as uuid } from 'uuid';
import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";
import { userSchema } from '../../models/userSchema.js';

export const createUser = async (event) => {
    console.log("Received event:", event); // Loggar hela eventet

    try {
        const body = JSON.parse(event.body);
        console.log("Parsed body:", body); // Loggar den parsnade body

        // Validera användardata
        const { error } = userSchema.validate(body);
        if (error) {
            console.error("Validation error:", error.details[0].message); // Loggar valideringsfel
            return sendError(400, error.details[0].message); // Returnera valideringsfel
        }

        // Kolla om användarnamn redan finns
        const existingUser = await db.query({
            TableName: "users-db",
            IndexName: "UsernameIndex",
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": body.username,
            },
        });

        if (existingUser.Items.length > 0) {
            return sendError(400, "Användarnamn finns redan.");
        }

        // Skapa upp ett användarobjekt
        const newUser = {
            userID: uuid().substring(0, 8),
            username: body.username,
            password: body.password,
            email: body.email,
            createdAt: new Date().toISOString(),
        };
        console.log("New user object:", newUser); // Loggar det nya användarobjektet

        await db.put({
            TableName: "users-db",
            Item: newUser,
        });
        console.log("User successfully added to DB"); // Logg vid lyckad inläggning

        return sendResponse(200, `Grattis ${newUser.username} skapad!`, newUser); // Returmeddelande

    } catch (error) {
        console.error("Error creating user:", error); // Loggar det fångade felet
        return sendError(500, error.message); // Returnera ett felmeddelande
    }
};
