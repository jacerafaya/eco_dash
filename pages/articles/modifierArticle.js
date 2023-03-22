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
    const [images, setImages] = useState(router.query.images);
    const [titre, setTitre] = useState(router.query.titre);
    const [description, setDescription] = useState(router.query.description);
    const [contenu, setContenu] = useState(router.query.contenu);

    useEffect(() => {
        console.log(images);
    }, [images]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const _id = router.query._id;
        const formData = new FormData();
        if (images !== undefined) {
            images.forEach((image) => {
                formData.append('images', image);
            });
        }

        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('contenu', contenu);
        console.log('houni images', images);

        try {
            if (images !== undefined) {
                const response = await fetch('http://localhost:5050/article/update/' + _id, {
                    method: 'PUT',
                    body: formData
                });
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
        console.log(FormData);
        router.push('/articles');
    };
    const toast = useRef(null);

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Modifier Article</h5>
                        <div className="field">
                            <label htmlFor="titre">Titre Article</label>
                            <InputText onChange={(e) => setTitre(e.target.value)} id="titre" name="titre" type="text" defaultValue={router.query.titre} />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" name="description" onChange={(e) => setDescription(e.target.value)} rows="4" defaultValue={router.query.description} />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="contenu">Contenu</label>
                            <InputTextarea id="contenu" name="contenu" onChange={(e) => setContenu(e.target.value)} rows="4" defaultValue={router.query.contenu} />
                        </div>

                        <div>
                            <FileUpload
                                name="images"
                                onSelect={(e) => {
                                    setImages([...images, ...e.files]);
                                }}
                                accept="image/*"
                                multiple
                                maxFileSize={3000000}
                                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
                            />
                        </div>

                        <Button className={styles.submit_button} type="submit" label="Valider" icon="pi pi-check" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
