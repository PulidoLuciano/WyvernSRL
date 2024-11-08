import { useCurrentEditor } from "@tiptap/react";

const FootBar = ({handleCancelEmail, handleSendEmail }:{handleCancelEmail:any,handleSendEmail:(emailText:string|undefined,subject:string)=>Promise<any>}) => {
    const { editor } = useCurrentEditor()
    const regex = /<p>\/\*([\s\S]*?)\*\/<\/p>/;
    const handleClickSend = () => {
        
        let subject = "";
        let emailText;
        const text = editor?.getHTML();
        
        
        emailText = text?.split("<p> *</p>",2);
        if(!emailText) return;
        const match = text?.match(regex);
        
        if (match && match[1]) {
           subject = match[1] // Esto imprime solo el contenido dentro de /* */
        }
        // console.log(emailText);
        
        handleSendEmail(emailText[1],subject);
        editor?.destroy();
    }

    const handleClickCancel = () => {
        handleCancelEmail()
        editor?.destroy();
    }

    return (
        <div className='flex gap-x-3 justify-end rounded-b-md p-3 bg-primary'>
            <button onClick={handleClickCancel} className='rounded-md font-semibold p-3 bg-red text-white'>Cancelar</button>
            <button onClick={handleClickSend} className='rounded-md font-semibold p-3 bg-green text-black'>Enviar</button>
        </div>
    )
}

export default FootBar