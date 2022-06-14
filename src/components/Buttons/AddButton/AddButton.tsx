import { ReactNode } from "react"

type AddButtonPropsType = {
    onClick: ()=> void
    children: ReactNode
}

export const AddButton = ({onClick,children}:AddButtonPropsType) => {
    return <div className="add--button" onClick={() => onClick()}>
        {children}
    </div>
}