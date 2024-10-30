import { ChangeEventHandler } from "react";

export interface thead {
    title: string;
    checkbox?: boolean;
    onChange?: ChangeEventHandler 
}

export interface TableProps {
    children : React.ReactNode;
    headers: Array<thead>;
    selectedAll?: boolean;
    onChange?: ChangeEventHandler 
}

export interface TRowProps {
    children: React.ReactNode;
    id: number
}

export interface TDataProps {
    children : React.ReactNode;
    checkbox?: boolean;
    onChange?: ChangeEventHandler;
    selectedAll?: boolean;
}