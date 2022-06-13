import {ReactNode, MouseEvent, useState} from "react";
import {useAppDispatch} from "../../../state/store";
import {deleteTagTC, filterNoteTC} from "../../../state/reducer";
import {NoteType} from "../Notes";

type TagPropsType = {
    children: ReactNode | string
    tag: string
    note:NoteType
}


export const Tag = ({note,children, tag}: TagPropsType) => {
    const dispatch = useAppDispatch()
    const [hovered, setHovered] = useState<boolean>(false)

    const toggleHover = (e: MouseEvent<HTMLDivElement>, value: boolean) => {
        setHovered(value)
    }

    const onDeleteTagClick = () => {
        dispatch(deleteTagTC({note, tag}))
    }

    const filterHelper = () => {
        const slicedTag = tag.slice(1)
        dispatch(filterNoteTC({tag: slicedTag}))
    }

    return (
        <div onClick={filterHelper}
             style={{
                 display: "inline-block",
                 marginRight: 10,
                 border: '1px solid',
                 borderRadius: 5,
                 padding: 5,
                 margin: 5
             }}
             onMouseEnter={e => toggleHover(e, true)}
             onMouseLeave={e => toggleHover(e, false)}
        >
            <span>{children}</span>
            {hovered && <button onClick={onDeleteTagClick}>Delete Tag</button>}
        </div>
    );
}