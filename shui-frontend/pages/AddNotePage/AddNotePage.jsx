import { useState } from 'react';
import axios from 'axios';
import './addnotepage.css';


function AddNotePage() {
    
    const [ newNote, setNewNote ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ errorMsg, setErrorMsg ] = useState('');

    // Ett försök till att koppla en users-db för att endast registrerade användare skall kunna skicka in en post
    // Kolla om användaren som skriver en post finns i databasen innan post anrop
    // const lookForUsername = async () => {
    //     try {
    //         console.log('Fetching user', username);
    //         const response = await axios.get(`https://r2n0yrekwc.execute-api.eu-north-1.amazonaws.com/user/${username}`);
    //         return response.data.exists; // Returnerar true om användarnamn finns
    //     } catch (error) {
    //         console.log('Error checking username', error);
    //     }
    // }

    const postNote = async (event) => {
        event.preventDefault();

        if(username.trim() === '') {
            setErrorMsg('Username can not be empty');
            // return;
        }

        if(newNote.trim() === '') {
            setErrorMsg('Text field can not be empty!');
            console.log('Text field can not be empty!');
            // return;
        };

        // const userExists = await lookForUsername();
        // if(!userExists) {
        //     setErrorMsg('Username does not exist');
        //     console.log(`Username ${username} does not exist`);
        // }

        try {
            console.log('Data to be sent to backend', {
                textContent: newNote,
                username: username,
            });
            const response = await axios.post('https://r2n0yrekwc.execute-api.eu-north-1.amazonaws.com/note', {
                textContent : newNote,
                username : username,
            });

            if(response.status === 200) {
                console.log('Note added', response.data);
                setNewNote('');
                setUsername('');
                setErrorMsg('');
            }

        } catch (error) {
            console.log('Error adding note', error)
        }
    }

    return (

        <form className='add-note-form' onSubmit={ postNote }>
            <div className="input-wrapper noteCard">
                {/* Inputfält för anteckning */}
                <input
                    className="input-text"
                    id="note"
                    onChange={(event => setNewNote(event.target.value))}  // Uppdatera state med anteckning
                    type="text"
                    value={ newNote }  // Värdet kopplat till state
                    placeholder="Write your note here" 
                />
                <label className="label" htmlFor="note"></label>
                <div className='noteCardWing'></div>
            </div>
            <div className="input-wrapper__username">
                {/* Inputfält för användarnamn */}
                <input
                    className="input-username"
                    id="username"
                    onChange={(event => setUsername(event.target.value))}  // Uppdatera state med användarnamn
                    type="text"
                    value={ username }  // Värdet kopplat till state
                />
                <label className="label" htmlFor="username">Användarnamn</label>
            </div>
            {/* Felmeddelande visas om något går fel */}
            {/* {errorMsg && <p className="error">{errorMsg}</p>} */}
            {/* {console.log(errorMsg)} */}

            <button className='publish-btn' type="submit">Publicera</button>
        </form>
    )
}

export default AddNotePage;