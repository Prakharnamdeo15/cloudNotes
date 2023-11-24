import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import { useState } from 'react';


const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title:"", description:"", tag:""})
        props.showAlert("Added succefully ", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }



    return (
        <div className='container form'>
            <h2>Add a Note</h2>
            <div className="container">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={1} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={1} required/>
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="Tag" name='Tag' value={note.tag} onChange={onChange} />
                    </div> */}
                    <button disabled={note.title.length<1 || note.description.length<1} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote