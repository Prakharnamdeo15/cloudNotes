import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) =>{
    const host = "http://localhost:5000"
    // const host = "https://cloudnotesbackend-bxm8.onrender.com"

    const notesInitial = []

          const [Notes, setNotes] = useState(notesInitial)

               //get all notes 
               const getNotes = async () => {

                //API call
    
                const response = await fetch(`${host}/api/notes/fetchallnotes` , {
                    method:'GET',
                    headers:{
                        'content-type':'application/json',
                        'auth-token':localStorage.getItem('token')
                    },
                });
                const json = await response.json()
                setNotes(json);
              }
          //Add note 
          const addNote = async (title, description, tag) => {

            //API call
            // eslint-disable-next-line 
            const response = await fetch(`${host}/api/notes/addnote` , {
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({title, description, tag})
            });

            const json = await response.json();

          let note = json
            setNotes(Notes.concat(note))
          }

          //Delete note
          const deleteNote = async(id) => {

            const response = await fetch(`${host}/api/notes/deletenote/${id}` , {
                method:'DELETE',
                headers:{
                    'content-type':'application/json',
                    'auth-token':localStorage.getItem('token')
                }
                        });
            const json = response.json();
            console.log(json)

            console.log("deleting the note with id "+id)
           const newNotes = Notes.filter((note)=>{ return note._id!==id})
           setNotes(newNotes)
          }

          //edit note
          const editNote = async (id, title, description, tag) => {

            //API call 
            const response = await fetch(`${host}/api/notes/updatenote/${id}` , {
                method:'PUT',
                headers:{
                    'content-type':'application/json',
                    'auth-token':localStorage.getItem('token')
                },
                body:JSON.stringify({title, description, tag})
            });
             // eslint-disable-next-line 
            const json = response.json();
        

            //logic
            for (let index = 0; index < Notes.length; index++) {
                const element = Notes[index];
                if(element._id === id){
                    element.title = title;
                    element.description = description;
                    element.tag = tag;
                }
                
            }
          }

    return (
        <NoteContext.Provider value={{Notes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;