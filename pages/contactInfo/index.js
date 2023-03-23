import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useReducer, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useRouter } from 'next/router';

const FormLayoutDemo = () => {
    const router = useRouter();

    const [contactInfo, setContactInfo] = useState([]);
    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://localhost:5050/';

    useEffect(() => {
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'contactInfo')
            .then((response) => response.json())
            .then((data) => {
                setContactInfo(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const [siegeSocial, setSiegeSocial] = useState(contactInfo[0]?.siegeSocial);
    const [numeroTelephone, setNumeroTelephone] = useState(contactInfo[0]?.numeroTelephone);
    const [email, setEmail] = useState(contactInfo[0]?.email);
    const [localisation, setLocalisation] = useState(contactInfo[0]?.localisation);
    const [lienFacebook, setLienFacebook] = useState(contactInfo[0]?.lienFacebook);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const temp_contactInfo = {};

        if (siegeSocial === undefined) {
            temp_contactInfo['siegeSocial'] = contactInfo[0]?.siegeSocial;
        } else {
            temp_contactInfo['siegeSocial'] = siegeSocial;
        }
        if (numeroTelephone === undefined) {
            temp_contactInfo['numeroTelephone'] = contactInfo[0]?.numeroTelephone;
        } else {
            temp_contactInfo['numeroTelephone'] = numeroTelephone;
        }
        if (email === undefined) {
            temp_contactInfo['email'] = contactInfo[0]?.email;
        } else {
            temp_contactInfo['email'] = email;
        }
        if (localisation === undefined) {
            temp_contactInfo['localisation'] = contactInfo[0]?.localisation;
        } else {
            temp_contactInfo['localisation'] = localisation;
        }
        if (lienFacebook === undefined) {
            temp_contactInfo['lienFacebook'] = contactInfo[0]?.lienFacebook;
        } else {
            temp_contactInfo['lienFacebook'] = lienFacebook;
        }

        const _id = contactInfo[0]._id;

        const formData = new FormData();

        formData.append('siegeSocial', temp_contactInfo['siegeSocial']);
        formData.append('numeroTelephone', temp_contactInfo['numeroTelephone']);
        formData.append('email', temp_contactInfo['email']);
        formData.append('localisation', temp_contactInfo['localisation']);
        formData.append('lienFacebook', temp_contactInfo['lienFacebook']);

        console.log('tab3a total', siegeSocial, numeroTelephone, email, localisation, lienFacebook);

        try {
            const response = await fetch('http://localhost:5050/contactInfo/update/' + _id, {
                method: 'PUT',
                body: formData
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        console.log(FormData);
        router.push('/articles');
    };

    return (
        <div className="grid">
            <div className="col-10">
                <div className="card">
                    <h5>Inforamtion Contact</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12 md:col-6">
                                <label htmlFor="SiegeSocial">Siège social</label>
                                <InputText onChange={(e) => setSiegeSocial(e.target.value)} id="SiegeSocial" name="SiegeSocial" type="text" defaultValue={contactInfo[0]?.siegeSocial} />
                            </div>
                            <div className="field col-12 md:col-6">
                                <label htmlFor="numeroTelephone">Numéros de téléphones</label>
                                <InputText onChange={(e) => setNumeroTelephone(e.target.value)} id="numeroTelephone" name="numeroTelephone" type="text" defaultValue={contactInfo[0]?.numeroTelephone} />
                            </div>
                            <div className="field col-12 ">
                                <label htmlFor="email">email</label>
                                <InputText onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="text" defaultValue={contactInfo[0]?.email} />
                            </div>
                            <div className="field col-12">
                                <label htmlFor="localisation">Localisation de la société</label>
                                <InputTextarea onChange={(e) => setLocalisation(e.target.value)} id="localisation" name="localisation" type="text" defaultValue={contactInfo[0]?.localisation} />
                            </div>
                            <div className="field col-12 ">
                                <label htmlFor="lienFacebook">Lien Facebook</label>
                                <InputText onChange={(e) => setLienFacebook(e.target.value)} id="lienFacebook" name="lienFacebook" type="text" defaultValue={contactInfo[0]?.lienFacebook} />
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
