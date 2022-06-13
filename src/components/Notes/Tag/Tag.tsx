import {Dispatch, ReactNode} from "react";
import {ActionType} from "../../../state/reducer";

type TagPropsType = {
    children: ReactNode
    dispatch:Dispatch<ActionType>
}

export const Tag = ({children,dispatch }: TagPropsType) => {
    const filterHelper = () => {
        dispatch({type: 'FilteredByTag', payload:{
            value: children
            }})
    }

    return (
        <div onClick={filterHelper} style={{display: "inline-block", marginRight:10, border: '1px solid', borderRadius:5, padding:5, margin: 5}}>
            {children}
        </div>
    );
}