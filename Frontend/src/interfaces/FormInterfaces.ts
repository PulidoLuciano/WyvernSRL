import { FormEventHandler } from "react";

export interface FormProps {
    createForm: boolean;
    children: React.ReactElement;
    handleSubmit: FormEventHandler
}

export interface InputProps {
    id: string;
    name: string;
    value: string;
    title: string;
    type: string;
    placeholder: string;
    onChange: FormEventHandler
}

export interface SelectProps {
    id: string;
    name: string;
    title: string;
    options: Array<string>
    onChange: FormEventHandler
}

export interface CheckboxProps {
    title: string;
    name: string;
    onChange: FormEventHandler
}

