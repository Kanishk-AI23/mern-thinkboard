import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import React from 'react'
import { formateDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'



const NoteCard = ({note, setNotes}) => {

  const handleDelete = async (e, id) => {
    e.preventDefault()                     //This function is called when the user clicks the delete button on a note. It prevents the default action of the event (which is to navigate to the note's page) and sends a DELETE request to the backend to delete the note with the given ID.

    if(!window.confirm("Are you sure you want to delete this note?")) return  //This shows a confirmation dialog to the user asking if they are sure they want to delete the note. If the user clicks "Cancel", the function returns and does nothing.

    try{
      await api.delete(`/notes/${id}`)          //This sends a DELETE request to the backend to delete the note with the given ID using the axios instance(api) with the base URL set to the backend API.
      setNotes((prev) => prev.filter(note => note._id !== id))  //This updates the notes state in the parent component by filtering out the deleted note from the array of notes. It uses the previous state (prev) and returns a new array that excludes the note with the given ID.
      toast.success("Note deleted successfully!")   //If the request is successful, it shows a success message to the user.

    } catch(error){
      console.log("Error in handleDelete", error)
      toast.error("Failed to delete the note. Please try again.")  //If there is an error, it logs the error to the console and shows an error message to the user.

    }
  }
  return (
    <Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
                {formateDate(new Date (note.createdAt))}
            </span>

            <div className="flex items-center gap-1">
                <PenSquareIcon calssName="size-4" />
                <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e,note._id)}>   {/*This button is for deleting the note. When clicked, it calls the handleDelete function with the event and note ID as arguments.*/}
                    <Trash2Icon className='size-4'/> 
                </button> 
                

            </div>
        </div>
      
      
      </div>

    </Link>
  )
}

export default NoteCard
