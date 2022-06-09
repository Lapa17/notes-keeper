import {NoteType} from "../Notes";

type NotePropsType = {
    id: string
    noteTitle: string
    noteDescription: string
    onDeleteClickHandler:(id:string)=> void
}

export const Note = ({noteTitle, noteDescription, id, onDeleteClickHandler}:NotePropsType) => {
    function onDeleteClick() {
        onDeleteClickHandler(id)
    }

    return (
      <div style={{width:200, border:'1px solid', margin: 10}}>
          <div>
              {noteTitle}
          </div>
          <div>
              {noteDescription}
          </div>
          <button onClick={onDeleteClick}> Delete</button>
      </div>
  )
}