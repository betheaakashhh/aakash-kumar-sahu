import React from 'react'
import Navbar from '../Navbar/Navbar'
import MainHeroSection from '../Hero/MainHeroSection'
import ScrollFade from '../../Components/ScrollFade/ScrollFade'
import ImageHeroSection from '../ImageSection/ImageHeroSection'
import ModernHeroSection from '../MidSection/ModernHeroSection'
import HashTag from '../Hashtag/HashTag'
import ScrollingShowcase from '../../Components/ScollingText/ScrollingShowcase'
import DailyCodeChallenge from '../ChallengeSection/DailyCodeChallenge'
const Home = () => {
  return (
    <div>
        <Navbar />
        <ScrollFade><MainHeroSection /></ScrollFade>
        <ScrollFade><ImageHeroSection /></ScrollFade>
        <ScrollFade><ModernHeroSection /></ScrollFade>
        <ScrollFade><HashTag /></ScrollFade>
        <ScrollFade><ScrollingShowcase /></ScrollFade>
        <ScrollFade><DailyCodeChallenge /></ScrollFade>
    </div>
  )
}

export default Home