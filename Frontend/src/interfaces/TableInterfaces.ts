import { ChangeEventHandler } from "react";

interface thead {
    title: string;
    checkbox: boolean;
    onChange: ChangeEventHandler
}

export interface TableProps {
    children : React.ReactElement;
    headers: Array<thead>;
}

export interface TRowProps {
    children: React.ReactElement;
}

export interface TDataProps {
    children : React.ReactElement;
    checkbox: boolean;
    onChange: ChangeEventHandler
}