import React from 'react';
import Gallery from '../../demo/components/Gallery';

const EmptyPage = ({data}) => {
    const PROTOCOL_AND_HOSTNAME_PART_OF_THE_URL = 'http://localhost:5050';
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>Titre Article:</h3>
                    <h5>{data.titre}</h5>
                    <h3>Description:</h3>
                    <h5>{data.description}</h5>
                    <h3>Contenu:</h3>
                    <h5>{data.contenu}</h5>
                    <Gallery 
                        imagePaths={Array.isArray(data.images) ? 
                            data.images.map((imageName) => `${ PROTOCOL_AND_HOSTNAME_PART_OF_THE_URL}/imagesArticle/${imageName}`): 
                            `${PROTOCOL_AND_HOSTNAME_PART_OF_THE_URL}/imagesArticle/${data.images}`}>

                    </Gallery>

                </div>
            </div>
        </div>
    );
};

EmptyPage.getInitialProps = async ({ query }) => {
    const data = query;

    return { data };
};

export default EmptyPage;






