import React, { useRef,useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Galleria } from 'primereact/galleria';
import { Carousel, CarouselItem } from 'primereact/carousel';


const Gallery = ({ imagePaths }) => {
    if(!Array.isArray(imagePaths)){imagePaths=[imagePaths]}
    return (
      <div className="gallery">
        {imagePaths.map(path => (
          <img key={path} src={`http://localhost:5050/imagesArticle/${path}`} alt={path} />
        ))}
      </div>
    );
  };



const EmptyPage = () => {
    const router = useRouter();
    
    
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    


    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />
    }

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} />
    }




    const PROTOCOLANDHOSTNAMEPARTOFTHEURL = 'http://localhost:5050/';
    
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h3>Titre Article:</h3>
                    <h5>{router.query.titre}</h5>
                    <h3>Description:</h3>
                    <h5>{router.query.description}</h5>
                    <h3>Contenu:</h3>
                    <h5>{router.query.contenu}</h5>
                    
                    <Gallery imagePaths={router.query.images}></Gallery>


                </div>

            </div>
        </div>
    );
};

export default EmptyPage;






