
import styles from '../styles/Home.module.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Hero from './Hero';

function MyCarousel () {
  const breakPoints = [
    { width: 1, itemsToShow: 1 }
  ];

  return (
    <div className={styles.carou}>
    <Carousel breakPoints={breakPoints}   autoPlay >
      <div>
        <Hero/>
      </div>
      <div className={styles.image}>
          <img src="/assets/IMG0.jpg" alt="IMG0"  />
      </div>
      <div className={styles.image}>
          <img src="/assets/IMG1.jpg" alt="IMG1"  />
      </div>
      <div className={styles.image}>
          <img src="/assets/IMG2.jpg" alt="IMG2"  />
      </div>
      <div className={styles.image} >
          <img src="/assets/IMG4.jpg" alt="IMG4"  />
      </div>
    </Carousel> 
    </div>
  )

}
    export default MyCarousel;







