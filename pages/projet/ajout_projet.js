import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useQueryClient, useMutation } from 'react-query';
import Link from 'next/link';

import { useRouter } from 'next/router';

import styles from '../../styles/service_css.module.css';

const FormLayoutDemo = () => {
    const [titre, setTitre] = useState('');
    const [adresse, setAdresse] = useState('');
    const [description, setDescription] = useState('');
    const [productionAnuelle, setProductionAnuelle] = useState('');
    
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    
    
    const [type, setType] = useState(null);
    const types = [
        { name: 'Pompage au fil du soleil', code: 'Pompage au fil du soleil' },
        { name: 'Pompage raccordé steg', code: 'Pompage raccordé steg' },
        { name: 'Maison raccordée STEG', code: 'Maison raccordée STEG' },
        { name: 'Maison non raccordée STEG', code: 'Maison non raccordée STEG' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        images.forEach(image => {
            formData.append('images',image)

        });

        formData.append('titre', titre);
        formData.append('adresse', adresse);
        formData.append('description', description);
        formData.append('productionAnuelle', productionAnuelle);
        formData.append('type', type);
        formData.append('video', video);
        //console.log("houni video" ,images,video,titre,adresse,description,productionAnuelle,type);

        try {
            if (images.length!==0 && titre !== '' && adresse !== '' && description !== '' && productionAnuelle !== '' && type !== '' && video !==null) {
                const response = await fetch('http://localhost:5050/projet/ajouter_projet', {
                    method: 'POST',
                    body: formData
                });
                console.log(response);
                router.push('/projet')
            }
        } catch (error) {
            console.log(error);
        }
        console.log(formData);
    };
    const toast = useRef(null);
    const router = useRouter();
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                <form onSubmit={handleSubmit}>
                    <h5>Ajouter Projet</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Titre</label>
                            <InputText onChange={(e) => setTitre(e.target.value)} id="titre" name="titre" type="text" />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="address">Address</label>
                            <InputTextarea id="address" name="address" onChange={(e) => setAdresse(e.target.value)} rows="4" />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="description">Description</label>
                            <InputTextarea onChange={(e) => setDescription(e.target.value)} id="description" name="description"  rows="4" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="productionAnuelle">Production anuelle</label>
                            <InputText onChange={(e) => setProductionAnuelle(e.target.value)} id="productionAnuelle" name="productionAnuelle" type="text" />
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="type">Type</label>
                            <Dropdown id="type" value={type} onChange={(e) => setType(e.value)} options={types} optionLabel="name" placeholder="Choisir type du projet"></Dropdown>
                        </div>

                        <div className="field col-12 ">
                            <label htmlFor="state">Images</label>
                            <FileUpload
                                name="images"
                                onSelect={(e) => {
                                    setImages([...images,...e.files]);
                                }}
                                accept="image/*"
                                multiple
                                maxFileSize={3000000}
                                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                            />
                        </div>

                        <div className="field col-12 ">
                            <label htmlFor="state">video</label>
                            <FileUpload name="myFile" className="custom-file-upload" 
                                customUpload onSelect={(e) => {
                                    setVideo(e.files[0])
                                }}
                                chooseLabel={video ? video.name : 'Choisir une video'} cancelLabel="Cancel" mode="basic"
                                accept=".mp4" maxFileSize={1000000} />
                        </div>
                    </div>
                    <Button className={styles.submit_button} type="submit" label="Ajouter" icon="pi pi-check" />
                </form>
                </div>
            </div>
        </div>
    );
  
};

export default FormLayoutDemo;
