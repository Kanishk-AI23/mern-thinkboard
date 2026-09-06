import { ArrowLeftIcon } from "lucide-react"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router"
import toast from "react-hot-toast"
import api from "../lib/axios"

const CreatePage = () => {
  const [title, setTitle] = useState("")    //These states are for handeling the input given by the user in the note.
  const [content, setContent] = useState("") 
  const[loading, setLoading] = useState(false)  //This state is for handeling the loading state when the note is being created.

  const navigate = useNavigate()  //This is a hook from react-router that allows us to navigate to different pages programmatically.
  
  const handleSubmit = async (e) => {
    e.preventDefault()             //This function is called when the user submits the form to create a new note.
    

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required.") //This checks if the title and content fields are empty. If they are, it shows an error message.   
       return
    }

    setLoading(true)
    try{
      await api.post("/notes", { title, content })  //This sends a POST request to the backend to create a new note with the title and content provided by the user using the axios instance(api) with the base URL set to the backend API.
      navigate("/")  //This navigates the user back to the home page after the note is created successfully.
    } catch(error){
      console.log("Error creating note", error)
      if (error.response.status === 429) {  //This checks if the error response status is 429 (rate limit exceeded), which means the user is creating notes too fast. If so, it shows a specific error message.
        toast.error("Slow down! You are creating notes too fast.",{
          duration: 4000,
          icon: "⚠️",
        })
      } else {
        toast.error("Failed to create note. Please try again.")
      }
    } finally {
      setLoading(false)
    }

  }
  

  return <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
     <div className="max-w-2xl mx-auto">
      <Link to={"/"} className="btn btn-ghost mb-6">
      <ArrowLeftIcon className="size-5" />
      Back to Notes
      </Link>

      <div className="card bg-base-100 shadow-md p-6">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Create New Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input 
                type="text"
                placeholder="Note Title"
                className="input input-bordered"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                placeholder="Write your note here..."
                className="textarea textarea-bordered h-32"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Creating..." : "Create Note"}

              </button>
            </div>
          </form>
        </div>

      </div>
    </div>

    </div>
  </div>

}

export default CreatePage
