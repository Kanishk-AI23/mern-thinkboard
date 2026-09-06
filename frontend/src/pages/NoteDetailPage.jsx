import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import toast from 'react-hot-toast'
import api from '../lib/axios'
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react'



const NoteDetailPage = () => {
  const [note, setNote] = useState(null) //This state is for storing the note details fetched from the backend. It is initialized to null, indicating that no note has been loaded yet.
  const [loading, setLoading] = useState(true) //This state is for handling the loading state when the note details are being fetched from the backend. It is initialized to true, indicating that the note details are being loaded.
  const [saving, setSaving] = useState(false) //This state is for handling the saving state when the note details are being saved to the backend. It is initialized to false, indicating that the note details are not currently being saved.

  const navigate = useNavigate()
  const {id} = useParams() //This hook is used to extract the note ID from the URL parameters. It allows us to access the specific note that the user wants to view or edit based on the ID provided in the URL.

  useEffect(() => { //The useEffect hook is used to perform side effects in functional components. In this case, it is used to fetch the note details from the backend when the component mounts or when the note ID changes.
    const fetchNote = async () => {
      try{
        const res = await api.get(`/notes/${id}`) //This line makes an asynchronous GET request to the backend API to fetch the note details based on the note ID. The response is stored in the 'res' variable.
        setNote(res.data)
      } catch(error){
        console.log("Error in fetching note", error) //This line logs any errors that occur during the fetch operation to the console for debugging purposes.
        toast.error("Failed to fetch the note details. Please try again later.") 
      } finally{
        setLoading(false)
      }
    }
    fetchNote() //This line calls the 'fetchNote' function to initiate the fetch operation when the component mounts or when the note ID changes.
  }, [id]) //The useEffect hook is used to fetch the note details from the backend when the component mounts or when the note ID changes. It ensures that the note details are always up-to-date based on the current note ID.

 const handleDelete = async () => {
  if(!window.confirm("Are you sure you want to delete this note?")) return

  try{
    await api.delete(`/notes/${id}`) //This line makes an asynchronous DELETE request to the backend API to delete the note based on the note ID. It uses the 'api' instance of Axios to send the request to the specified endpoint. If the request is successful, it means that the note has been deleted from the backend.
    toast.success("Note deleted successfully")
    navigate("/") //This line navigates the user back to the home page ("/") after successfully deleting the note. It uses the 'navigate' function from the 'react-router' library to programmatically change the route.

  } catch(error){
    console.log("Error in deleting note", error) //This line logs any errors that occur during the delete operation to the console for debugging purposes.
    toast.error("Failed to delete the note. Please try again later.") //This line displays an error toast notification to the user if the delete operation fails. It informs the user that the note could not be deleted and suggests trying again later.
  }
 }
 const handleSave = async () => {
  if(!note.title.trim() || !note.content.trim()){
    toast.error("Please fill both title and content.")
    return
  }

  setSaving(true)

  try{
    await api.put(`/notes/${id}`, note)  //This line makes an asynchronous PUT request to the backend API to update the note based on the note ID. It sends the updated note data in the request body. If the request is successful, it means that the note has been updated in the backend.
    toast.success("Note updated successfully")
    navigate('/')

  } catch(error){
    console.log("Error in saving note", error)
    toast.error("Failed to update the note. Please try again later.")
  
  } finally{
    setSaving(false)
  }

 }

  if(loading){
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }

  return(
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Notes         
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-outline">
            <Trash2Icon className="h-5 w-5" />
            Delete Note
          </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
               <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title} //This line sets the value of the input field to the 'title' property of the 'note' state. It ensures that the input field displays the current title of the note when the component renders.
                  onChange={(e) => setNote({ ...note, title: e.target.value })} //This line updates the 'note' state with the new title value entered by the user. It creates a new object with the existing note properties and updates the 'title' property with the new value from the input field.
                />
              </div>


            <div className="form-control mb-4">
              <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content} //This line sets the value of the textarea field to the 'content' property of the 'note' state. It ensures that the textarea field displays the current content of the note when the component renders.
                  onChange={(e) => setNote({ ...note, content: e.target.value })} //This line updates the 'note' state with the new content value entered by the user. It creates a new object with the existing note properties and updates the 'content' property with the new value from the textarea field.
                />

            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                {saving ? "Saving..." : "Save Changes"} {/*This line conditionally renders the button text based on the 'saving' state. If 'saving' is true, it displays "Saving..." to indicate that the save operation is in progress. If 'saving' is false, it displays "Save Changes" to allow the user to save their changes.*/}
              </button>

            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default NoteDetailPage
