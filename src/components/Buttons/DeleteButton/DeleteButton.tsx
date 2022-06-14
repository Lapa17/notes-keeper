import { ReactNode } from "react";

type DeleteButtonPropsType = {
    className:string;
    children:ReactNode
    onClick:()=> void
}

export const DeleteButton = ({className, children, onClick}:DeleteButtonPropsType) => {
    return <div className={className} onClick={() => onClick()}>
        {children}
    </div>
}