import { v4 as uuid } from 'uuid';
import { sendResponse, sendError } from "../../responses/index.js";
import db from "../../services/db.js";

export const handler = async (event) => {
    try {
        const { note } = JSON.parse(event.body);
        if(!note) {
            return sendError(400, { success : false}, 'No note found' );
        }
        if(!note.textContent ) {
            return sendError(400, { success : false }, 'No textContent found' );
        }
        if(!note.username) {
            return sendError(400, { success : false }, 'Must fill username field' );
        }
        
        // Kolla om användaren finns i users-db
        const checkUser = await db.query({
            TableName : 'users-db',
            IndexName : 'UsernameIndex', // avnänder GSI igen
            KeyConditionExpression : 'username = :username',
            ExpressionAttributeValues : { ':username': note.username }
        });
        console.log("Result of user check:", checkUser);
        console.log("TableName:", 'users-db');
        console.log("IndexName:", 'UsernameIndex');


        if(checkUser.Items.length === 0) {
            return sendError(404, { success : false, message : `No user with username ${note.username} found. Only registered users can post notes.` })
        }

        // Hämta userID från den användare som returneras
        const userID = checkUser.Items[0].userID;

        // Formatera date så det stämmer med figma skiss
        const dateFormat = {
            weekday: 'long', // Långa namnet för dagen
            day: 'numeric', // Dagen för månaden
            month: 'short', // Korta namnet på månaden
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: 'Europe/Stockholm'  // Sätt timeZone till Stockholm för rätt tid
        }
        // toLocaleDateString('sv-SE', dateFormat) enligt svneksa lokalinställningar
        const formattedDate = new Date().toLocaleDateString('sv-SE', dateFormat)

        // Skapa upp ett note-objekt
        const newNote = {
            noteID : uuid().substring(0, 8),
            date: formattedDate, // det formaterade datumet
            textContent : note.textContent,
            username : note.username,
            userID : userID,
        }
			// const id = uuid().substring(0, 6);

			await db.put({
				TableName : "notes-db",
				Item : newNote
			});

			return sendResponse(200, { success : true, note : newNote });

		} catch(error) {
            console.log('Error adding note:', error)
			return sendError(404, { success : false, message : error.message });
		}
};