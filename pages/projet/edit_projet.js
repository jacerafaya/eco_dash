import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import {useQueryClient,useMutation} from 'react-query';
import { FileUpload } from 'primereact/fileupload';
const formReducer=(state,event)=>{
    return{
        ...state,
        [event.target.name]:event.target.value
    }

}
const FormLayoutDemo = () => {
    const[FormData,setFormData]=useReducer(formReducer,{});
    const handleSubmit=(e)=>{
        e.preventDefault();
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
                    <h5>Modifier Projet</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Titre</label>
                            <InputText id="firstname2" type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Lastname</label>
                            <InputText id="lastname2" type="text" />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="address">Address</label>
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
                            <FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} />
                        </div>

                        <div className="field col-12 ">
                            <label htmlFor="state">Vedio</label>
                            <FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} />
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
