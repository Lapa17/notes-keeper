import {NoteType} from "../Notes";

type NotePropsType = {
    note: NoteType
    onDeleteClickHandler:(id:string)=> void
}

export const Note = ({note, onDeleteClickHandler}:NotePropsType) => {
    function onDeleteClick() {
        onDeleteClickHandler(note.id)
    }
    debugger
    return (
      <div style={{width:200, border:'1px solid', margin: 10}}>
          <div>
              {note.noteTitle}
          </div>
          <div>
              {note.noteDescription}
          </div>
          <button onClick={onDeleteClick}> Delete</button>
          <div>
              {note.tags[0] && note.tags.map(el=> <span key={note.id} style={{marginLeft:10}}>{el}</span>)}
          </div>
      </div>
  )
}