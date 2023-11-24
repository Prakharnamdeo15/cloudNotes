import noteContext from '../context/notes/NoteContext';
import { useContext, useEffect, useRef,useState } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'




const Notes = (props) => {
  const context = useContext(noteContext)
  let navigate = useNavigate();
  const { Notes, getNotes,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log(localStorage.getItem('token'))
      getNotes()
      
    }
    else{
      navigate("/login")
    }
  },)
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "" })

  const updateNote = async(currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  }
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("updated successfully ", "success")
}

const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
}
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-etitle fs-5" id="exampleModalLabel">edit note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="eTag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<1 || note.edescription.length<1} onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <h2>Your notes</h2>
        
        {Notes.length===0 && <h5> Your notes will be displayed here </h5>}
        
        {Notes.map((note) => {
          return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  )
}

export default Notes