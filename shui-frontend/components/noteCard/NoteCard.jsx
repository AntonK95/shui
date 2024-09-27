import './notecard.css';
import { useState } from 'react';
import axios from 'axios';

const NoteCard = ({ note, onUpdate, onDelete }) => {

    const [ isEditing, setIsEditing ] = useState(false); // Om vi redigerar
    const [ updatedText, setUpdatedText ] = useState(note.textContent); // Håller den nya texten

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = async () => {

        const noteID = note.noteID; // Extrahera noteID från note

        try {
            const response = await axios.put(`https://r2n0yrekwc.execute-api.eu-north-1.amazonaws.com/notes/${noteID}`, {
                textContent : updatedText,
                username : note.username,
            });

            if(response.status === 200) {
                onUpdate(noteID, updatedText); // Vid lyckat svar anropa onUpdate som är skickad som prop
                setIsEditing(false); // Byt status efter uppdatering
            }

        } catch (error) {
            console.log('Cannot update note', error);
        }

    }
    const cancelEdit = () => {
        setIsEditing(false); // Avbryt editering av note
        setUpdatedText(note.textContent);
    }

    const deleteNote = async () => {
        const noteID = note.noteID;
      
        try {
          console.log(`Delete note with id ${noteID}`); // Kolla id för den note som skall tas bort
          const response = await axios.delete(`https://r2n0yrekwc.execute-api.eu-north-1.amazonaws.com/notes/${noteID}`);
      
          if (response.status === 200) { 
            console.log("Note deleted successfully");
            onDelete(noteID);  // Uppdatera state 
          } else {
            console.log('Error: Note not deleted successfully', response);
          }
        } catch (error) {
          console.log('Error deleting note', error);
        }
      };
      

    return (

        <article className="noteCard"> {/* Representerar en anteckning */}
            {isEditing ? ( // Kollar om vi är i redigeringsläge
                <>
                    <div className='noteCard-icons'>
                        <button 
                        className='noteCard-btn' 
                        onClick={handleUpdate}>
                            <i 
                            className="fa fa-check-square-o" 
                            aria-label='save edit'>
                            </i>
                        </button> 
                        <button 
                        className='noteCard-btn' 
                        onClick={ cancelEdit }>
                            <i 
                            className="fa fa-close" 
                            aria-label='cancel edit'>
                            </i>
                        </button> 
                    </div>
                    <textarea className='noteCard-text'
                        type="text" 
                        value={updatedText} // Visar den uppdaterade texten i inputfältet
                        onChange={(e) => setUpdatedText(e.target.value)} // Uppdaterar updatedText state när användaren skriver i fältet
                    />
                </>
            ) : (
                <>  
                <div className='noteCard-icons'>
                    <button 
                        className='noteCard-btn' 
                        onClick={handleEdit}>
                        <i 
                        className="fa fa-pencil-square-o"
                        aria-label='edit note'>
                        </i>
                    </button>
                    <button 
                            className='noteCard-btn'
                            onClick={ deleteNote }
                    >
                    <i 
                        className="fa fa-trash-o"
                        aria-label='delete note'>
                    </i>
                    </button> 
                </div>
                <p className='textContent'>{note.textContent}</p> 
                </>
            )}
            <p className='date'>{note.date}</p> 
            <p className='username'> - {note.username}</p> 
            <div className='noteCardWing'></div> 
        </article>
    )
}

export default NoteCard;