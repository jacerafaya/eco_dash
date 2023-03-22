import React, { useState,useRef,useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import { FileUpload } from 'primereact/fileupload';
import {useQueryClient,useMutation} from 'react-query';
import { useRouter } from 'next/router';
import styles from '../../styles/service_css.module.css'

const FormLayoutDemo = (props) => {
    const router = useRouter()
    
    
    const [image, setImage] = useState(router.query.image);
    const [titre, setTitre] = useState(router.query.titre);
    const [description, setDescription] = useState(router.query.description);

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const _id=router.query._id;
        console.log("houni",_id)
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('titre', titre);
        try {
            const response = await fetch('http://localhost:5050/service/update/'+_id,
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
        router.push('/services')
    }
    const toast = useRef(null);


    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <form onSubmit={handleSubmit}>
                        <h5>Modifier Services</h5>
                        <div className="field">
                            <label htmlFor="titre">Nom Service</label>
                            <InputText onChange={(e)=>setTitre(e.target.value)} id="titre" name="titre" type="text" defaultValue={router.query.titre}  />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="address">Description</label>
                            <InputTextarea onChange={(e)=>setDescription(e.target.value)} id="description" name="description" rows="4" defaultValue={router.query.description} />
                            
                        </div>

                        <div>
                            <FileUpload name="myFile" className="custom-file-upload" 
                                customUpload onSelect={(e) => {
                                    setImage(e.files[0])
                                }}
                                chooseLabel={!image ? router.query.image : image!==router.query.image ? image.name : router.query.image} cancelLabel="Cancel" mode="basic"
                                accept=".jpg,.png" maxFileSize={1000000} />
                        </div>
                        <Button className={styles.submit_button} type="submit" label="Valider" icon="pi pi-check"/>
            
                    </form>
                </div>



            </div>
        </div>
    );
};

export default FormLayoutDemo;
