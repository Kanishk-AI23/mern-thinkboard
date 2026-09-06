import React, {useEffect, useState} from 'react'
import api from "../lib/axios"
import toast from "react-hot-toast"



import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'




const HomePage = () => {
  const [isRateLimited, setIsRateLimited]=useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await api.get("/notes") //This sends a GET request to the backend to fetch all the notes using the axios instance(api) with the base URL set to the backend API.
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)
      } catch(error){
        console.log("Error fetching notes");
        console.log(error)
        if(error.response?.status == 429){
          setIsRateLimited(true)
        } else {
          toast.error("Failed to load notes")
        }


      } finally {
        setLoading(false)
      }

    };

    fetchNotes()
  },[])


  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
         {notes.length === 0 && !isRateLimited && <NotesNotFound />}
         
         
         {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note.id} note={note} setNotes={setNotes} /> //This maps over the notes array and renders a NoteCard component for each note. The note object is passed as a prop to the NoteCard component.
            ))}
                                                                                       
          </div>



        ) }


      </div>
    </div>
  )
}

export default HomePage
