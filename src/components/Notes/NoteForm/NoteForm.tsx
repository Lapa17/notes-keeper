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
    const [tags, setTags] = useState<Array<string>>([''])
    const [tag, setTag] = useState<string>('')
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

    function contentChanged(e:ChangeEvent<HTMLInputElement> ) {
        setContent(e.target.value);
        if(editTag){
            //@ts-ignore
            setTag(tag + e.nativeEvent.data)
            console.log(tag)
        }
    }

    function contentClicked(e:MouseEvent<HTMLInputElement>) {
        // settyping(true);
        // setcontent(e.currentTarget);
    }

    function onHashClick(e:KeyboardEvent<HTMLInputElement>){
        if(e.key === '#'){
            setEditTag(true)
        }
        if(e.key === ' '){
            setTags([tag, ...tags])
            setTag('')
            setEditTag(false)
        }
    }

    function onAddClickHandler() {
        const newNote = {id: v1(), noteTitle:title, noteDescription: content, tags}
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
            <input placeholder={'Description'}
                      style={textareaStyle}
                      value={content}
                      onClick={contentClicked}
                      onChange={contentChanged}
                      onKeyDown={onHashClick}
            />
            <button onClick={onAddClickHandler}>Add</button>
            {tags.map((el,index )=> {
                return <span key={index} style={{marginRight:10}}>{el}</span>
            })}
        </div>
    )
}