import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EmptyPage = () => {
    const router = useRouter();
    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://79.137.87.204:5050/';
    
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>Titre Service:</h3>
                    <h5>{router.query.titre}</h5>
                    <h3>Description:</h3>
                    <h5>{router.query.description}</h5>
                    <img src={PROTOCOLANDHOSTNAMEPARTOFTHEURL+"imageService/"+router.query.image} ></img>
                </div>

            </div>
        </div>
    );
};

export default EmptyPage;
