import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer } from 'react';
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

    return (
        <div className="grid">
      
            <div className="col-10">
                <div className="card">
                    <h5>Inforamtion Contact</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2">Siège social</label>
                            <InputText id="firstname2" type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Numéros de téléphones</label>
                            <InputText id="lastname2" type="text" />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="address">Localisation de la société</label>
                            <InputTextarea id="address" rows="4" />
                        </div>
                        <div className="field col-12 ">
                            <label htmlFor="lastname2">Lien Facebook</label>
                            <InputText id="lastname2" type="text" />
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
