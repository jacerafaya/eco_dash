import React, { useState,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import { FileUpload } from 'primereact/fileupload';
import {useQueryClient,useMutation} from 'react-query';


const FormLayoutDemo = () => {
    const [image, setImage] = useState(null);
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        try {
            const response = await fetch('http://localhost:5050/service/update/'+titre,
            {
                    method:'PUT',
                    body:formData
                }
            );
            console.log(response);

        } catch (error) {
            console.log(error);
        }
        console.log(FormData);
    }
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    };
    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Modifier Services</h5>
                        <div className="field">
                            <label htmlFor="titre">Nom Service</label>
                            <InputText onChange={(e)=>setTitre(e.target.value)} id="titre" name="titre" type="text" />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="address">Description</label>
                            <InputTextarea onChange={(e)=>setDescription(e.target.value)} id="description" name="description" rows="4" />
                            
                        </div>

                        <div>
                            <FileUpload name="demo[]" onSelect={(e)=>setImage(e.files[0])} accept="image/*" maxFileSize={3000000} />

                        </div>
                    <button type='submit'>Submit</button>
            
                    </form>
                </div>
                


            </div>
        </div>
    );
};

export default FormLayoutDemo;
