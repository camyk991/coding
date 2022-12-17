import { title } from "process";
import React, { useState } from "react";
import API from "../../API";
import './FileUploader.scss';

const FileUploader = () => {
    const [file, setFile] = useState()
    const [text, setText] = useState()

    function handleText(event:any) {
        setText(event.target.value)
    }

    function handleChange(event:any) {
        setFile(event.target.files[0])
    }

    async function handleSubmit(event:any) {
        event.preventDefault()
        const url = 'http://localhost:3000/uploadFile';
        const formData = new FormData();
        formData.append('filename', text ?? '');
        formData.append('file', file ?? '');
        console.log(formData.get('filename'));
        console.log(formData.get('file'));

        const data = await API.uploadFile(formData);

        console.log(data);

        if (data.ok) {
			console.log("wyslano")
		} else {
			console.log(data.errors);
			if (data.errors.length) {
				console.log("test");
				let messages: JSX.Element[] = [];
				data.errors.forEach((el: any) => {
					messages.push(el.msg);
				});
				console.log(messages+"fileupoader");
			}
		}
    }

    return (
        <div className="container">
            <h2>Prześlij plik</h2>
            <form onSubmit={handleSubmit}> 
                <label>
                Wpisz nazwę pliku:<br/>
                <input type="text" onChange={handleText} /> <br/>
                Wybierz plik:<br/>
                <input type="file" onChange={handleChange} /><br/>
                <input type="submit" value="Upload"/>
                </label>
            </form>
        </div>
    );
}

export default FileUploader;
