import { ChangeEvent, useState, KeyboardEvent, Dispatch } from "react";
import { NoteType } from "../Notes";
import { addNoteTC } from "../../../state/reducer";
import { useAppDispatch } from "../../../state/store";
import { v1 } from "uuid";
import { FormInput } from "../../FormInput/FormInput";
import { Tag } from "../Tag/Tag";
import { AddButton } from "../../Buttons/AddButton/AddButton";

type NoteFormType = {
    notes: Array<NoteType>
}

export const NoteForm = ({ notes }: NoteFormType) => {
    const [content, setContent] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [editTag, setEditTag] = useState<boolean>(false)
    const [isWritable, setIsWritable] = useState<boolean>(false)
    const [tags, setTags] = useState<Array<string>>([])
    const [tag, setTag] = useState<string>('')

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

    function onAddClickHandler() {
        dispatch(addNoteTC({
            id: v1(),
            title,
            description: content,
            tags,
        }))
        setIsWritable(false)
        setTags([])
        setTitle('')
        setContent('')
    }
    function onNoteClickHandler() {
        setIsWritable(true)
    }
    function onDivBlurHandler() {
        setIsWritable(false)
    }
    function onInputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    function onDeleteFormTagHandler(tag: string) {
        setTags(tags.filter(el => el !== tag))
    }

    return (
        <div className='noteForm' >
            <div className='noteForm--content'>
                <FormInput placeholder={'??????????????????'}
                    value={title}
                    onChange={onInputChangeHandler}
                    className='noteForm--content--title' />

                <FormInput placeholder={'??????????????..'}
                    onClick={onNoteClickHandler}
                    value={content}
                    onChange={contentChanged}
                    onKeyDown={onHashClick}
                />
                <AddButton onClick={onAddClickHandler}>+</AddButton>
                {tags.length > 0 && tags.map((el, index) => {
                    return <Tag key={index} tag={el} onDeleteFormTagHandler={onDeleteFormTagHandler}>{el}</Tag>
                })}
            </div>
        </div>
    )
}