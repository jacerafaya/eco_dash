import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import {useEffect,useRef } from 'react';

import { useRouter } from 'next/router';

const FormLayoutDemo = () => {
    const router = useRouter();
    const ref_id=useRef(0);
   
    
    
    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://localhost:5050/';
   
    useEffect(() => {
        
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'puissance')
            .then((response) => response.json())
            .then((data) => {
                ref_id.current=data[0]._id
                
                setPuissanceAllemande(data[0].puissanceAllemande)
                setPuissanceChinoise(data[0].puissanceChinoise)
                
            })
            .catch((error) => console.log(error));
    }, []);
    const [puissanceAllemande, setPuissanceAllemande] = useState('');
    const [puissanceChinoise, setPuissanceChinoise] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const temp_puissance = {};


        const _id=ref_id.current
        const puissance={_id,puissanceAllemande, puissanceChinoise}
        console.log(puissance);
        
        
        try {
           
            const response = await fetch('http://localhost:5050/puissance/update/' + _id, {
                method: 'PUT',
                body: JSON.stringify(puissance),
                headers: {
                    "Content-Type": "application/json",
                  }
            });
            console.log(response);
        
        } catch (error) {
            console.log(error);
        }
        
        router.push('/articles');
    };

    return (
        <div className="grid">
            <div className="col-10">
                <div className="card">
                    <h5>Puissances des panneaux</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-12">
                                <label htmlFor="SiegeSocial">Puissance Allemande</label>
                                <InputText onChange={(e) => setPuissanceAllemande(e.target.value)} id="PuissanceAllemande" name="PuissanceAllemande" type="text" defaultValue={puissanceAllemande} />
                            </div>
                            <div className="field col-12 md:col-12">
                                <label htmlFor="numeroTelephone">Puissance Chinoise</label>
                                <InputText onChange={(e) => setPuissanceChinoise(e.target.value)} id="PuissanceChinoise" name="PuissanceChinoise" type="text" defaultValue={puissanceChinoise} />
                            </div>
                            <Button type="submit" label="Valider" icon="pi pi-check" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;










