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
const Home = () => {
  return (
    <div>
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