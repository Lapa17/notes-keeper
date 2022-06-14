
type ModalPropsType = {
    title: string
    content: string
    onTitlesChangeHandler:()=>void

}

export const Modal = () => {
    return <div className="modal">
        <div className="modal--container">

            {/* <input value={title} onChange={onInputChangeHandler}/>
            <input onChange={contentChanged}
                   onKeyDown={onHashClick}
                   value={content}/>
            <div>
                {tags.map(el => {
                        return <Tag key={el} tag={el} note={note}>{el}</Tag>
                    }
                )}
            </div>
            <button onClick={() => editNote(false)}>Close </button>
            <button onClick={saveNoteHandler}>Save </button> */}
        </div>
    </div>
}