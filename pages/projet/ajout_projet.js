import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { FileUpload } from 'primereact/fileupload';
const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }

}
const FormLayoutDemo = () => {
    const [FormData, setFormData] = useReducer(formReducer, {});
    const [video, setVideo] = useState(null);
    const [images, setImages] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images) {
            for (let i = 0; i < files.length; i++) {
                FormData.append('images', images[i]);
            }
        }
        FormData.append(video);
        console.log(FormData);
    }
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Ajouter Projet</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Titre</label>
                            <InputText id="firstname2" type="text" />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="address">Address</label>
                            <InputTextarea id="address" rows="4" />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="address">Description</label>
                            <InputTextarea id="address" rows="4" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="city">Production anuelle</label>
                            <InputText id="city" type="text" />
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="state">Type</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>

                        <div className="field col-12 ">
                            <label htmlFor="state">Image</label>
                            <FileUpload name="demo[]" url="http://localhost:5050/projet/ajouter_projet" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} />
                        </div>

                        <div className="field col-12 ">
                            <label htmlFor="state">Video</label>
                            <FileUpload name="demo[]" url="http://localhost:5050/projet/ajouter_projet" onUpload={onUpload} accept="video/*" maxFileSize={5000000000} />
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
