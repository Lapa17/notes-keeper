import { DetailedHTMLProps, InputHTMLAttributes } from "react"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type FormInputPropsType = DefaultInputPropsType & {

}

export const FormInput = (props: FormInputPropsType) => {
    return (
        <input
            placeholder={props.placeholder}
            onClick={props.onClick}
            value={props.value}
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            className={`form--input ${props.className}`}
        />)
}