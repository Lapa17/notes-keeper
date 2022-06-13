import {ChangeEvent, useState, KeyboardEvent, Dispatch} from "react";
import {NoteType} from "../Notes";
import {ActionType, addNoteTC} from "../../../state/reducer";
import {useAppDispatch} from "../../../state/store";
import {v1} from "uuid";

type NoteFormType = {
    notes: Array<NoteType>
}

export const NoteForm = ({notes}:NoteFormType) =>{
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [editTag, setEditTag] = useState<boolean>(false)
    const [tags, setTags] = useState<Array<string>>([])
    const [tag, setTag] = useState<string>('')

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

    function onAddClickHandler() {
        dispatch(addNoteTC({
            id:v1(),
            title,
            description: content,
            tags,
        }))
        setTags([])
        setTitle('')
        setContent('')
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
                      value={content}
                      onChange={contentChanged}
                      onKeyDown={onHashClick}
            />
            <button onClick={onAddClickHandler}>Add</button>
            { tags.length > 0 && tags.map((el,index )=> {
                return <span key={index} style={{marginRight:10}}>{el}</span>
            })}
        </div>
    )
}