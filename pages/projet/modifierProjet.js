import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { useQueryClient, useMutation } from 'react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/service_css.module.css';

const FormLayoutDemo = () => {
    const router = useRouter();
    const [titre, setTitre] = useState(router.query.titre);
    const [adresse, setAdresse] = useState(router.query.adresse);
    const [description, setDescription] = useState(router.query.description);
    const [images, setImages] = useState(router.query.images);
    const [productionAnuelle, setProductionAnuelle] = useState(router.query.productionAnuelle);
    const [type, setType] = useState(router.query.type);
    const [video, setVideo] = useState(router.query.video);
    console.log("router.query.images ",router.query.images);
    const types = [
        { name: 'Pompage au fil du soleil', code: 'Pompage au fil du soleil' },
        { name: 'Pompage raccordé steg', code: 'Pompage raccordé steg' },
        { name: 'Maison raccordée STEG', code: 'Maison raccordée STEG' },
        { name: 'Maison non raccordée STEG', code: 'Maison non raccordée STEG' }
    ];


    useEffect(() => {
        console.log(images);
    }, [images]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("type.name",type.name)
        const _id = router.query._id;
        const formData = new FormData();
        console.log("9bal for each images",images)
        if (images!== undefined && images!== null) {
            if(!Array.isArray(images))
                {formData.append('images', images);}
                else{   
                    images?.forEach((image) => {
                    formData.append('images', image);
                });}

        }

        formData.append('titre', titre);
        formData.append('adresse', adresse);
        formData.append('description', description);
        formData.append('productionAnuelle', productionAnuelle);
        formData.append('video', video);
        formData.append('type', type?.name);
        console.log('houni images', images);

        try {
            if (images !== undefined) {
                const response = await fetch('http://localhost:5050/projet/update/' + _id, {
                    method: 'PUT',
                    body: formData
                });
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
        console.log(FormData);
        router.push('/projet');
    };
    const toast = useRef(null);

    return (
<div className="grid">
            <div className="col-12">
                <div className="card">
                <form onSubmit={handleSubmit}>
                    <h5>Modifier Projet</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Titre</label>
                            <InputText onChange={(e) => setTitre(e.target.value)} id="titre" name="titre" type="text" defaultValue={router.query.titre} />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="address">Address</label>
                            <InputTextarea id="address" name="address" onChange={(e) => setAdresse(e.target.value)} rows="4" defaultValue={router.query.adresse} />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="description">Description</label>
                            <InputTextarea onChange={(e) => setDescription(e.target.value)} id="description" name="description"  rows="4" defaultValue={router.query.description} />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="productionAnuelle">Production anuelle</label>
                            <InputText onChange={(e) => setProductionAnuelle(e.target.value)} id="productionAnuelle" name="productionAnuelle" type="text" defaultValue={router.query.productionAnuelle} />
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="type">Type</label>
                            <Dropdown id="type" value={type} onChange={(e) => setType(e.value)} options={types} optionLabel="name" placeholder={router.query.type} defaultValue={router.query.type}></Dropdown>
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
                    <Button className={styles.submit_button} type="submit" label="Valider" icon="pi pi-check" />
                </form>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;



