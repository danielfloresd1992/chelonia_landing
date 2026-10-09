import DayToNight from '../components/home/DayToNight'
import Experiences from '../components/home/Experiences'
import Intro from '../components/home/Intro'
import Journey from '../components/home/Journey'
import Rooms from '../components/home/Rooms'
import Services from '../components/home/Services'
import Tagline from '../components/home/Tagline'
import Testimonials from '../components/home/Testimonials'
import VideoHero from '../components/home/VideoHero'

export default function Home() {
  return (
    <>
      <VideoHero />
      <Intro />
      <Journey />
      <Rooms />
      <Experiences />
      <Tagline />
      <Services />
      <DayToNight />
      <Testimonials />
    </>
  )
}
