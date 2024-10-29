import { FormEventHandler } from "react";


export interface FormProps {
    children: React.ReactElement;
    handleSubmit: FormEventHandler;
    className: string
}

export interface InputProps {
    id: string;
    name: string;
    value: string | number;
    title: string;
    type: string;
    placeholder: string;
    onChange: FormEventHandler;
    error : string | undefined
}

export interface SelectProps {
    id: string;
    name: string;
    title: string;
    options: Array<any>;
    onChange: FormEventHandler
}

export interface CheckboxProps {
    title: string;
    name: string;
    onChange: FormEventHandler
}