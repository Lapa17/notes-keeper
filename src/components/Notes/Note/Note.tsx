import {NoteType} from "../Notes";
import {Tag} from "../Tag/Tag";
import {ChangeEvent, Dispatch, KeyboardEvent, useState} from "react";
import {ActionType, addNoteTC, deleteNoteTC, saveNoteTC} from "../../../state/reducer";
import {v1} from "uuid";
import {useAppDispatch} from "../../../state/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAd, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

type NotePropsType = {
    note: NoteType
}


export const Note = ({ note}: NotePropsType) => {

    const [content, setContent] = useState(note.description)
    const [title, setTitle] = useState(note.title)
    const [editTag, setEditTag] = useState<boolean>(false)
    const [tags, setTags] = useState<Array<string>>(note.tags)
    const [tag, setTag] = useState<string>('')
    const [showEditMenu, setShowEditMenu] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    function contentChanged(e:ChangeEvent<HTMLInputElement> ) {
        setContent(e.target.value);
        if(editTag){
            //@ts-ignore
            setTag(tag + e.nativeEvent.data)
        }
    }

    function onHashClick(e:KeyboardEvent<HTMLInputElement>){
        if(e.key === '#'){
            setEditTag(true)
        }
        if(e.key === ' ' && editTag){
            setTags([tag, ...tags])
            setTag('')
            setEditTag(false)
        }
    }
    function onInputChangeHandler(e:ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }
    function saveNoteHandler() {
        dispatch(saveNoteTC({
            id:note.id,
            title,
            description: content,
            tags,
        }))
        // setTags([])
        // setTitle('')
        // setContent('')
    }

    const [editMode, setEditMode] = useState<boolean>(false)

    function onDeleteNoteClickHandler() {
        dispatch(deleteNoteTC({id:note.id}))
    }
    function showEditMenuHandler() {
        setShowEditMenu(!showEditMenu)
    }
    function editNote(value:boolean) {
        setEditMode(value)
    }
    //"fa-solid fa-ellipsis-vertical"
    return (
        <div className='note--container'>
            <div>
                <div className='note--container--title'>
                    {note.title}
                </div>
                <div className='note--container--description'>
                    {note.description}
                </div>
                <div className="tag--container">
                    {note.tags.length > 0 && note.tags.map(el => {
                            return <Tag key={el} tag={el} note={note}>{el}</Tag>
                        }
                    )}
                </div>
                
                <div className='edit--button' onClick={() => showEditMenuHandler()}><FontAwesomeIcon icon={faEllipsisVertical} /></div>

            </div>
            {showEditMenu && <div className="edit--menu">
                <div className='edit--menu--li'onClick={() => editNote(true)}>Edit note</div>
                <div className='edit--menu--li' onClick={onDeleteNoteClickHandler}>Delete note</div>
                </div>}
            {editMode &&
            <div style={{
                width: '100%',
                height: '100vh',
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 20,
                background: '#00000082'
            }}>
                <div style={{
                    width: '500px',
                    height: '200px',
                    position: "absolute",
                    top: '35%',
                    left: '35%',
                    padding:20,
                    background: 'white'
                }}>

                    <input value={title} onChange={onInputChangeHandler}/>
                    <input onChange={contentChanged}
                           onKeyDown={onHashClick}
                           value={content}/>
                    <button onClick={onDeleteNoteClickHandler}> Delete</button>
                    <div>
                        {tags.map(el => {
                                return <Tag key={el} tag={el} note={note}>{el}</Tag>
                            }
                        )}
                    </div>
                    <button onClick={() => editNote(false)}>Close </button>
                    <button onClick={saveNoteHandler}>Save </button>
                </div>
            </div>}
        </div>)
}