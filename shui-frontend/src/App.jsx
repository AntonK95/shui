import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'


const getNotes = async (setNotes) => {
  try {
    const res = await axios.get('https://r2n0yrekwc.execute-api.eu-north-1.amazonaws.com/notes')
    setNotes(res.data.data);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}


function App() {
  const [ notes, setNotes ] = useState([]);
  // const [ newNote, setNewNote ] = useState('');

  useEffect(() => {
    getNotes(setNotes); // Hämtar alla notes och sparar dem i tillståndet
  }, []);

  return (
    <div className='content-wrapper'>
      <section className='notes-section'>
        {
          notes.map(note => (
            <div>
              <p>{note.date}</p>
              <p>{note.textContent}</p>
              <p>{note.username}</p>
              {/* <p>{note.date}</p> */}
            </div>
          ))
        }
      </section>
    </div>
  )
}

export default App
