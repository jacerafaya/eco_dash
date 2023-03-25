import React from 'react';
import { useRouter } from 'next/router';


const Gallery = ({ imagePaths }) => {
    if(!Array.isArray(imagePaths)){imagePaths=[imagePaths]}
    return (
      <div className="gallery">
        {imagePaths.map(path => (
          <img key={path} src={`http://localhost:5050/imagesProjet/${path}`} alt={path} />
        ))}
      </div>
    );
  };








const EmptyPage = ({data}) => {
    const router = useRouter();
    console.log("data",data)
    
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
                    <h3>Titre Projet:</h3>
                    <h5>{data.titre}</h5>
                    <h3>Description:</h3>
                    <h5>{data.description}</h5>
                    <h3>Adresse:</h3>
                    <h5>{data.adresse}</h5>
                    <h3>Production Anuelle:</h3>
                    <h5>{data.productionAnuelle}</h5>
                    <h3>type:</h3>
                    <h5>{data.type}</h5>
                    
                    <Gallery imagePaths={data.images}></Gallery>
                    <video controls>
  <source src={"http://localhost:5050/videosProjet/"+data.video } type="video/mp4" />
  Your browser does not support the video tag.
</video>


                </div>

            </div>
        </div>
    );
};

EmptyPage.getInitialProps = async ({ query }) => {
    // Fetch data using the query parameter
    const data = query;
  
    // Return the data as props
    return { data };
  };


export default EmptyPage;






