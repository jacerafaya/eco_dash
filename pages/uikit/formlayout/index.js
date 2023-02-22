import React, { useState,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
import { FileUpload } from 'primereact/fileupload';
import {useQueryClient,useMutation} from 'react-query';


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
    const toast = useRef(null);

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
                            <label htmlFor="name1">Nom Service</label>
                            <InputText onChange={setFormData} id="name1" name="name1" type="text" />
                        </div>

                        <div className="field col-12">
                            <label htmlFor="address">Description</label>
                            <InputTextarea id="address" rows="4" />
                            
                        </div>

                        <div>
                            <FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000} />

                        </div>

            
                    </form>
                </div>
                


            </div>





            
        </div>
    );
};

export default FormLayoutDemo;
