import { ChangeEventHandler } from "react";



export interface TableProps {
    children : React.ReactNode;
    id?:string;
    headers: Array<string>;
}

export interface TRowProps {
    children: React.ReactNode;
    id: number;
    detail?: boolean;
    deleteButton?: boolean;
    path?: string
    handleDelete?: (ids:Array<string>) => Promise<void>
}

export interface TDataProps {
    children : React.ReactNode;
    checkbox?: boolean;
    onChange?: ChangeEventHandler;
    selectedAll?: boolean;
    id?: string,
    isSelectAll?:boolean
}