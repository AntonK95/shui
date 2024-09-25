import { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'

import NotesPage from '../pages/notesPage/notesPage';
import AddNotePage from '../pages/AddNotePage/AddNotePage';
import Layout from '../components/layout/Layout';




function App() {
  
  // const [ newNote, setNewNote ] = useState('');

  // useEffect(() => {
  //   getNotes(setNotes); // Hämtar alla notes och sparar dem i tillståndet
  // }, []);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<NotesPage />}/>
        <Route path='/note/add' element={<AddNotePage />}/>
      </Routes> 
    </Layout>
  )
}

export default App
