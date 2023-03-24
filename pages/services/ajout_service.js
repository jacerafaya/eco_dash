import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useQueryClient, useMutation } from 'react-query';
import Link from 'next/link';

import { useRouter } from 'next/router'

import styles from '../../styles/service_css.module.css'


const FormLayoutDemo = () => {
    const [image, setImage] = useState(null);
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('titre', titre);
        formData.append('description', description);
        
        
            
        
        try {
            
            if (image!==null && titre!=='' && description!=='') {
                const response = await fetch('http://localhost:5050/service/ajouter_service',
                {
                    method:'POST',
                    body:formData
                });
            console.log(response);
            router.push('/services')
            }
        } catch (error) {
            console.log(error);
        }
        console.log(formData);
        
    }
    const toast = useRef(null);
    const router = useRouter()
    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    };
    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Ajouter Services</h5>
                        <div className="field">
                            <label htmlFor="titre">Nom Service</label>
                            <InputText onChange={(e) => setTitre(e.target.value)} id="titre" name="titre" type="text" />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" name="description" onChange={(e) => setDescription(e.target.value)} rows="4" />

                        </div>

                        <div>
                        
                        <FileUpload name="myFile" className="custom-file-upload" 
                                customUpload onSelect={(e) => {
                                    setImage(e.files[0])
                                }}
                                chooseLabel={image ? image.name : 'Choisir une photo'} cancelLabel="Cancel" mode="basic"
                                accept=".jpg,.png" maxFileSize={3000000} />



                        </div>

                        <Button className={styles.submit_button} type="submit" label="Ajouter" icon="pi pi-check"/>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
