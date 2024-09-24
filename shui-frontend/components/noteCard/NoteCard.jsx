import './notecard.css';
import React from "react";

const NoteCard = ({ note }) => {
    return (
        <article className="noteCard">
            <p className='date'>{note.date}</p>
            <p className='textContent'>{note.textContent}</p>
            <p className='username'> - {note.username}</p>
            <div className='noteCardWing'></div>
        </article>
    )
}

export default NoteCard;