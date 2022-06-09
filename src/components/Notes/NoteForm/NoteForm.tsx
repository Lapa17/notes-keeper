import {ChangeEvent, useState, MouseEvent, KeyboardEvent} from "react";
import {NoteType} from "../Notes";
import {v1} from "uuid";

type NoteFormType = {
    setNotes:(params:Array<NoteType> )=> void
    notes: Array<NoteType>
}

export const NoteForm = ({setNotes, notes}:NoteFormType) =>{
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [editTag, setEditTag] = useState<boolean>(false)
    const [tags, setTags] = useState('')
    const [textareaStyle, setTextareaStyle] = useState<any>({
        textAlign: "justfiy",
        width:'100%'
    });

    function textareaHeight(e:ChangeEvent<HTMLTextAreaElement>) {
        setTextareaStyle({
            ...textareaStyle,
            //height: e.target.scrollHeight + "px",
            textAlign: "justfiy",
            maxHeight: "500px",
        })
    }

    function contentChanged(e:ChangeEvent<HTMLTextAreaElement>) {
        setContent(e.target.value);
        if(editTag){
            setTags(e.target.value)
        }
    }

    function contentClicked(e:MouseEvent<HTMLTextAreaElement>) {
        // settyping(true);
        // setcontent(e.currentTarget);
    }

    function onHashClick(e:KeyboardEvent<HTMLTextAreaElement>){
        if(e.key === '#'){
            setEditTag(true)
        }
        if(e.key === ' '){
            setEditTag(false)
        }
    }

    function onAddClickHandler() {
        const newNote = {id: v1(), noteTitle:title, noteDescription: content}
        setNotes([...notes,newNote])
    }

    function onInputChangeHandler(e:ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    return (
        <div style={{border:'1px solid black', borderRadius: '5px', width: '400px'}}>
            <input type={"text"} placeholder={'Title'} style={
                {width: '100%',display: 'block', height: '30px', fontSize: '1.4em', padding: '5px'}}
                   value={title}
                onChange={onInputChangeHandler}
            />
            <textarea placeholder={'Description'}
                      onInput={textareaHeight}
                      style={textareaStyle}
                      value={content}
                      onClick={contentClicked}
                      onChange={contentChanged}
                      onKeyDown={onHashClick}
            />
            <button onClick={onAddClickHandler}>Add</button>
            {tags}
        </div>
    )
}