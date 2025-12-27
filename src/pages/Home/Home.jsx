import React from 'react'
import Navbar from '../Navbar/Navbar'
import MainHeroSection from '../Hero/MainHeroSection'
import ScrollFade from '../../Components/ScrollFade/ScrollFade'
import ImageHeroSection from '../ImageSection/ImageHeroSection'
import ModernHeroSection from '../MidSection/ModernHeroSection'
import HashTag from '../Hashtag/HashTag'
import ScrollingShowcase from '../../Components/ScollingText/ScrollingShowcase'
import DailyCodeChallenge from '../ChallengeSection/DailyCodeChallenge'
import SearchSection from '../SearchSection/SearchSection'
import UpdateNotification from '../../Components/UpdateInfo/UpdateNotification'
const Home = () => {
  return (
    <div>
        <UpdateNotification />
        <Navbar />
        <MainHeroSection />
        <ImageHeroSection />
        <ModernHeroSection />
        <SearchSection />
         <HashTag />
        <ScrollingShowcase />
        <DailyCodeChallenge />
       
    </div>
  )
}

export default Home