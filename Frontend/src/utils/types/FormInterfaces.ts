import { FormEventHandler } from "react";


export interface FormProps {
    children: React.ReactElement;
    handleSubmit: FormEventHandler;
    className: string
}

export interface InputProps {
    id: string;
    name: string;
    defaultValue?:any;
    value?: any;
    title: string;
    type: string;
    placeholder?: string;
    onChange: FormEventHandler;
    error?: string | undefined
}

export interface SelectProps {
    id: string;
    name: string;
    title: string;
    options: Array<any>;
    onChange: FormEventHandler;
    error?: string | undefined;
    editId?: string;
    selected?: any
}

export interface CheckboxProps {
    title: string;
    name: string;
    onChange: FormEventHandler
}

export interface ButtonProps {
    className: string;
}