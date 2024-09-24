// import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import NoteCard from "../../components/noteCard/NoteCard";
import NoNotesPage from '../../pages/NoNotesPage/NoNotesPage'
import './notespage.css';
import axios from "axios";



function NotesPage() {
    const [ notes, setNotes ] = useState([]);

    useEffect(() => {
        const getNotes = async () => {
        
            try {
              const res = await axios.get('https://r2n0yrekwc.execute-api.eu-north-1.amazonaws.com/notes')
              setNotes(res.data.data);
              console.log(res);
            } catch (error) {
              console.log(error);
            }
          };
          getNotes(); 

    }, []);


    
    return (
        <div className='notesPage'>
            <section className="noteSection">
            { notes.length > 0 ? (
                notes.map(note => (
                    <NoteCard key={note.noteID} note={note} />
                )
                    
                ) ) : (
                    <NoNotesPage />
            )}
        </section>
        </div>
    )
}

export default NotesPage;