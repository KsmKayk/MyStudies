import React, {useState,useEffect} from 'react';
import {Link} from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import GetYoutubeVideoThumb from "../../Services/GetYoutubeVideoThumb"

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import './styles.scss';

function Home() {
  let logged = false

  const [coursesThumbs, setCoursesThumbs] = useState([])

  useEffect(() => {
    if (!logged) {
      GetYoutubeVideoThumb.teste().then(res => {
        setCoursesThumbs(res)
      })
    }
    else {}
  },[])

  SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


  if (!logged) {  
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" id="nav-home">
          <div className="container-fluid">
            <Link className="navbar-brand" id="title-nav-home" to="/">MyStudies</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
              <Link className="btn btn-outline-primary" id="login-btn-home" to="/login">Login</Link>
              <Link className="btn btn-primary" id="register-btn-home" to="/register">Register</Link>
          </div>
         </div>
        </nav>

        <div className="courses-container-home">
          <h1>The Largest Selection of Courses in the World</h1>
          <Swiper
            spaceBetween={0}
            slidesPerGroup={1}
            navigation={{ clickable: true }}
            loop={true}
            breakpoints={{

              306: {
                slidesPerView: 1,
                spaceBetween: 40,
              },

              520: {
                slidesPerView: 2,
              },
              800: {
                slidesPerView: 3,
              },
              1136: {
                slidesPerView: 4,
              },
              1300: {
                slidesPerView: 5
              }

            }}
          >
            {coursesThumbs.map((thumb) => (
              <SwiperSlide><Link to="/"><img key={thumb}src={thumb} alt={thumb} width="250"/></Link></SwiperSlide>
          ))}
          </Swiper>
        </div>

        <div className="courses-container-home">
          <h1>More Courses</h1>
          <Swiper
            spaceBetween={0}
            slidesPerView={5}
            slidesPerGroup={2}
            navigation={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            loop= {true}
            breakpoints={{

              306: {
                slidesPerView: 1,
                spaceBetween: 40,
              },

              520: {
                slidesPerView: 2,
              },
              800: {
                slidesPerView: 3,
              },
              1136: {
                slidesPerView: 4,
              },
              1300: {
                slidesPerView: 5
              }

            }}  
          >
            {coursesThumbs.map((thumb) => (
              <SwiperSlide><Link to="/"><img key={thumb}src={thumb} alt={thumb} width="250"/></Link></SwiperSlide>
          ))}
          </Swiper>
        </div>
        
      </>
    )
  }

  else {
    return
  }
}

export default Home;