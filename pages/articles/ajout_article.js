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
    const [images, setImages] = useState(null);
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [contenu, setContenu] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('images', images);
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('contenu', contenu);

        try {
            if (images !== null && titre !== '' && description !== '' && contenu !== '') {
                const response = await fetch('http://localhost:5050/article/ajouter_article', {
                    method: 'POST',
                    body: formData
                });
                console.log(response);
                //router.push('/articles')
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
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Ajouter Article</h5>
                        <div className="field">
                            <label htmlFor="titre">Titre Article</label>
                            <InputText onChange={(e) => setTitre(e.target.value)} id="titre" name="titre" type="text" />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" name="description" onChange={(e) => setDescription(e.target.value)} rows="4" />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="contenu">Contenu</label>
                            <InputTextarea id="contenu" name="contenu" onChange={(e) => setContenu(e.target.value)} rows="4" />
                        </div>

                        <div>
                            <FileUpload
                                name="images"
                                onSelect={(e) => {
                                    setImages(e.files[0]);
                                }}
                                accept="image/*"
                                maxFileSize={3000000}
                                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                            />
                        </div>

                        <Button className={styles.submit_button} type="submit" label="Ajouter" icon="pi pi-check" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
