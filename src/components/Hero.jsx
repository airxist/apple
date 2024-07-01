import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { heroVideo, smallHeroVideo } from "../utils"
import { useEffect, useState } from "react"

const Hero = () => {
  const [ vidSrc, setVidSrc ] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);

  const handleVidSrcSet = () => {
    if (window.innerWidth < 760) {
      setVidSrc(smallHeroVideo)
    } else {
      setVidSrc(heroVideo);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleVidSrcSet);
    // clean up function
    return () => {
      window.removeEventListener('resize', handleVidSrcSet)
    }
  }, [])

  useGSAP(() => {
    gsap.to('#hero', {
      opacity: 1,
      delay: 2,
    })

    gsap.to('#cta', {
      opacity: 1,
      y: -50,
      delay: 2 
    })
  }, [])
  return (
    <section className='w-full nav-height position-relative bg-black screen-max-width'>
      <div className='h-5/6 w-full flex-center flex-col'>
        <p id="hero" className='hero-title'>iPhone 15 pro</p>
        <div className="md:w-10/12 w-9/12">
          <video className="pointer-events-none" autoPlay muted playsInline={true} key={vidSrc}>
            <source
              src={vidSrc}
              type="video/mp4"
            />
          </video>
        </div>
      </div>

      <div
      id="cta"
      className="cta flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero
