import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';
import { useRouter } from 'next/router';
import styles from '../../styles/service_css.module.css';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';


const FormLayoutDemo = () => {





    ///////////////////////////////////////////

    const toast = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;

        });

        setTotalSize(_totalSize);

        setImages([...images, ...e.files]);

    };




    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        console.log("images in remove ", images)
        console.log("file in remove ", file);
        setImages(images.filter((image) => image !== file));
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
    //////////////////////////////////////



    const [images, setImages] = useState([]);
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [contenu, setContenu] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        images.forEach(image => {
            formData.append('images', image)

        });

        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('contenu', contenu);
        console.log("houni images", images);

        try {
            if (images.length !== 0 && titre !== '' && description !== '' && contenu !== '') {
                const response = await fetch('http://79.137.87.204:5050/article/ajouter_article', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });
                console.log(response);
                if (response.ok) {
                    router.push('/articles')

                }
            }
        } catch (error) {
            console.log(error);
        }
        console.log(formData);
    };

    const router = useRouter();

    return (
        <div className="grid">
            <div className="col-12 ">
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
                        <div className="field col-12 ">
                            <label >Images</label>
                            <div>
                                <Toast ref={toast}></Toast>

                                <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                                <FileUpload ref={fileUploadRef} name="images" multiple accept="image/*" maxFileSize={3000000}
                                    onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
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
