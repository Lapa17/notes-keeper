import {ReactNode, MouseEvent, useState} from "react";
import {useAppDispatch} from "../../../state/store";
import {deleteTagTC, filterNoteTC} from "../../../state/reducer";
import {NoteType} from "../Notes";
import { DeleteButton } from "../../Buttons/DeleteButton/DeleteButton";

type TagPropsType = {
    children: ReactNode | string
    tag: string
    note?:NoteType
    onDeleteFormTagHandler?:(tag:string)=>void
}


export const Tag = ({note,children, tag, onDeleteFormTagHandler}: TagPropsType) => {
    const dispatch = useAppDispatch()
    const [hovered, setHovered] = useState<boolean>(false)

    const toggleHover = (e: MouseEvent<HTMLDivElement>, value: boolean) => {
        setHovered(value)
    }

    const onDeleteTagClick = () => {
        if(note){
            dispatch(deleteTagTC({note, tag}))
        }
        else if (onDeleteFormTagHandler){
            onDeleteFormTagHandler(tag)
        }
       
    }

    const filterHelper = () => {
        if(note){
            // const slicedTag = tag.slice(1)
            dispatch(filterNoteTC({tag: tag}))
        }
        
    }

    return (
        <div onClick={filterHelper}
             className='tag'
             onMouseEnter={e => toggleHover(e, true)}
             onMouseLeave={e => toggleHover(e, false)}
        >
            <span>{children}</span>
             {hovered && <DeleteButton className={'delete--tag'} onClick={onDeleteTagClick}>+</DeleteButton>}
        </div>
    );
}