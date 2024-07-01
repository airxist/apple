import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { animateWithGsap } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger);

const Chip = () => {
  const videoRef = useRef();

  useGSAP(() => {
    animateWithGsap('.g_fadeIn', {
      y: 0, opacity: 1, ease: 'power2.inOut', duration: 1, stagger: 0.3
    })

    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom',
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: 'power2.inOut'
    })

    gsap.to('#chip-video', {
      scrollTrigger: {
        trigger: '#chip-video',
        toggleActions: 'play pause resume reset',
        start: 'top center'
      },
      onComplete () {
        videoRef.current.play();
      }
    })
  }, [])

  return (
    <section className='common-padding'>
      <div className="screen-max-width">
        <div id="chip" className='flex-center w-full my-20'>
          <img src={chipImg} alt="chip"width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h1 className="hiw-title">
            A17 Pro chip.
            <br /> A monster win for gaming.
          </h1>
          <p className="hiw-subtitle">
            The biggest design in the history of Apple GPUs.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img 
                src={frameImg}
                alt='frame'
                className='bg-transparent relative z-10'
              />
            </div>
            <div className="hiw-video">
                <video
                  className='pointer-events-none'
                  id='chip-video'
                  playsInline
                  preload='none'
                  muted
                  autoPlay
                  ref={videoRef}
                >
                  <source src={frameVideo} type='video/mp4' />
                </video>
            </div>
          </div>

          <p className="text-gray font-semibold text-center mt-3">
            Honkai: Star Rail
          </p>
          
          <div className='hiw-text-container mt-16'>
            <div className="flex flex-1 justify-center flex-col">
              <p className="hiw-text g_fadeIn">
                A17 Pro is an entirely new class of iPhone chip that delivers our{' '}
                <span className="text-white">
                  best graphic performance by far
                </span>
              </p>
              <p className="hiw-text mt-5 g_fadeIn">
                Mobile{' '}
                <span className="text-white">
                  games will look and feel so immersive
                </span>,
                with incredibly detailed environments and more realistic characters. And with industry-leading speed and efficiency. A17 Pro takes fast and runs with it.
              </p>
            </div>
            <div className="flex-1 flex justify-center flex-col g_fadeIn">
              <p className="hiw-text">New</p>
              <p className="hiw-bigtext">Pro-class GPU</p>
              <p className='hiw-text'>with 6 cores</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Chip
