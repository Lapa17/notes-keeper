import {NoteType} from "../Notes";
import {Tag} from "../Tag/Tag";
import {Dispatch} from "react";
import {ActionType} from "../../../state/reducer";

type NotePropsType = {
    note: NoteType
    onDeleteClickHandler:(id:string)=> void
    dispatch:Dispatch<ActionType>
}


export const Note = ({dispatch, note, onDeleteClickHandler}:NotePropsType) => {
    function onDeleteClick() {
        onDeleteClickHandler(note.id)
    }
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
              {note.tags.length > 0 && note.tags.map(el=> {
                  return <Tag key={el} dispatch={dispatch}>{el}</Tag>}
              )}
          </div>
      </div>
  )
}