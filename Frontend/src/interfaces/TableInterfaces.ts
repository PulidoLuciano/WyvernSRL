import { ChangeEventHandler } from "react";

export interface thead {
    title: string;
    checkbox?: boolean;
    onChange?: ChangeEventHandler 
}

export interface TableProps {
    children : React.ReactNode;
    headers: Array<thead>;
    selectedAll?: boolean
}

export interface TRowProps {
    children: React.ReactNode;
}

export interface TDataProps {
    children : React.ReactNode;
    checkbox?: boolean;
    onChange?: ChangeEventHandler;
    selectedAll?: boolean;
}