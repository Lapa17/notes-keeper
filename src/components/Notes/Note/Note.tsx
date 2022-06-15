import { NoteType } from "../Notes";
import { Tag } from "../Tag/Tag";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { deleteNoteTC, saveNoteTC } from "../../../state/reducer";
import { useAppDispatch } from "../../../state/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../Modals/Modal";
import { FormInput } from "../../FormInput/FormInput";
import { Highlighted } from "../../Higlight";

type NotePropsType = {
    note: NoteType
}


export const Note = ({ note }: NotePropsType) => {

    const [content, setContent] = useState(note.description)
    const [title, setTitle] = useState(note.title)
    const [editTag, setEditTag] = useState<boolean>(false)
    const [tags, setTags] = useState<Array<string>>(note.tags)
    const [tag, setTag] = useState<string>('')
    const [showEditMenu, setShowEditMenu] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    function contentChanged(e: ChangeEvent<HTMLInputElement>) {
        setContent(e.target.value);
        //@ts-ignore
        if (editTag && e.nativeEvent.data !== null && e.nativeEvent.data !== '#') {
            //@ts-ignore
            setTag(tag + e.nativeEvent.data)
        }
    }

    function onHashClick(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === '#') {
            setEditTag(true)
        }
        if (e.key === ' ' && editTag) {
            setTags([tag, ...tags])
            setTag('')
            setEditTag(false)
        }
        if (e.key === 'Backspace') {
            setTag(tag.slice(0, tag.length - 1))
        }
    }
    function onInputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }
    function saveNoteHandler() {
        dispatch(saveNoteTC({
            id: note.id,
            title,
            description: content,
            tags,
        }))
        setEditMode(false)
    }



    function onDeleteNoteClickHandler() {
        dispatch(deleteNoteTC({ id: note.id }))
    }
    function showEditMenuHandler() {
        setShowEditMenu(!showEditMenu)
    }
    function onEditNoteClickHandler(value: boolean) {
        setEditMode(value)
        setShowEditMenu(false)
        setContent(note.description)
        setTitle(note.title)
        setTags(note.tags)
    }
    function onDeleteFormTagHandler(tag: string) {
        setTags(tags.filter(el => el !== tag))
    }

    return (
        <div className='note--container'>
            <div>
                <div className='note--container--title'>
                    {note.title}
                </div>
                <div className='note--container--description'>
                    {note.description}
                </div>
                {/* <Highlighted 
                        text={note.description}
                        highlight={note.tags[0]}
                    /> */}


                <div className="tag--container">
                    {note.tags.length > 0 && note.tags.map(el => {
                        return <Tag key={el} tag={el} note={note}>{el}</Tag>
                    }
                    )}
                </div>

                <div className='edit--button' onClick={() => showEditMenuHandler()}><FontAwesomeIcon icon={faEllipsisVertical} /></div>

            </div>
            {showEditMenu && <div className="edit--menu">
                <div className='edit--menu--li' onClick={() => onEditNoteClickHandler(true)}>Edit note</div>
                <div className='edit--menu--li' onClick={onDeleteNoteClickHandler}>Delete note</div>
            </div>}
            {editMode && <div className="modal">
                <div className="modal--container">
                    <FormInput className='modal--title' value={title} onChange={onInputChangeHandler} placeholder={'Title'} />
                    <FormInput value={content} onChange={contentChanged} onKeyDown={onHashClick} placeholder={'Content'} />
                    <div>
                        {tags.map(el => {
                            return <Tag key={el} tag={el} onDeleteFormTagHandler={onDeleteFormTagHandler}>{el}</Tag>
                        }
                        )}
                    </div>
                    <div className='modal--close' onClick={() => onEditNoteClickHandler(false)}>+</div>
                    <div className='modal--save' onClick={saveNoteHandler}>Save </div>
                </div>
            </div>}
        </div>)
}