import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router'

const PanelDemo = () => {
    const router = useRouter();
    const menu1 = useRef(null);
    const [articleCardsContent, setArticleCardsContent] = useState([]);
    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://localhost:5050/';

    useEffect(() => {
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'articles')
            .then((response) => response.json())
            .then((data) => {
                setArticleCardsContent(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const editCard = (cardContent) => {    
        const {_id,titre,images,description,contenu}=cardContent;     
        router.push({
            pathname: '/articles/modifierArticle',
            query: {_id,titre,images,description,contenu}
        })
    };

    const readCard = (cardContent) => {    
        const {_id,titre,images,description,contenu}=cardContent;
          
        router.push({
            pathname: '/articles/singleArticle',
            query: {_id,titre,images,description,contenu}
        })
    };

    const removeCard = (id) => {
        console.log(id);
        fetch(PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'article/' + id, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`http error, status : ${response.status}`);
                }
                console.log('articleSuccessfully deleted');
            })
            .catch((error) => console.log(error));
        setArticleCardsContent(articleCardsContent.filter((card) => card._id !== id));
    };

    if (articleCardsContent.length === 0) {
        return <div>loading...</div>;
    }
    return (
        <div className="grid">
            {articleCardsContent.map((cardContent, index) => {
                const json_data = JSON.stringify(cardContent);
                console.log(json_data)

                return (
                    <div key={cardContent._id} className="card col-12 md:col-6">
                        <Fieldset legend={cardContent.titre} toggleable>
                            <img src={PROTOCOLANDHOSTNAMEPARTOFTHEURL + 'imagesArticle/' + cardContent.images[0]} style={{ height: 215.1, width: 322.5 }} className="w-6" />
                            <p className="text-gray-800 sm:line-height-2 md:line-height-4 text-xl mt-4">{cardContent.description}</p>
                        </Fieldset>

                            <Button label="Consulter" className="p-button-success m-4" onClick={() => readCard(cardContent)} />
                            <Button label="Modifier" className="m-4" onClick={() => editCard(cardContent)} />
                            <Button label="Supprimer" className="p-button-danger m-4" onClick={() => removeCard(cardContent._id)} />
                            
                    </div>
                );
            })}
           
        </div>
    );
};

export default withRouter (PanelDemo);









