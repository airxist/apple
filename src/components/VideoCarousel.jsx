import { useRef } from 'react'
import { hightlightsSlides } from '../constants'
import { useState } from 'react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
// import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

// gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false
  })

  
  const [loadedData, setLoadedData] = useState([]);
  
  // destructurin the above object
  const {
    isEnd,
    startPlay,
    videoId,
    isLastVideo,
    isPlaying
  } = video
  
  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 1,
      ease: 'power1.inOut'
    })
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none'
      },
      onComplete () {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true
        }))
      }
    })
  }, [isEnd, videoId])

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData])

  const handleLoadedMetaData = (index, element) => {
    return setLoadedData((prev) => ([
      ...prev,
      element
    ]))
  }

  // animating the progress
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate () {
          // const progress = Math.ceil(anim.progress()) * 100;
          // if (progress != currentProgress) {
          //   currentProgress = progress;

          //   gsap.to(videoDivRef.current[videoId], {
          //     width: window.innerWidth < 768 
          //       ? '10vw'
          //       : window.innerWidth < 1200
          //         ? '10vw'
          //         : '4vw'
          //   })

          //   gsap.to(span[videoId], {
          //     width: `${currentProgress}%`,
          //     backgroundColor: "white"
          //   })
          // }
        },
        onComplete () {
          // if (isPlaying) {
          //   gsap.to(videoDivRef.current[videoId], {
          //     width: '12px'
          //   })
          //   gsap.to(span[videoId], {
          //     backgroundColor: '#afafaf'
          //   })
          // }
        }
      })

      if (videoId === 0) {
        anim.restart()
      }

      const animUpdate = () => {
        anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
      }

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate)
      }
    }
  }, [ videoId, startPlay])

  const handleProcess = (type, index) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({
          ...prev, 
          isEnd: true,
          videoId: index + 1
        }))
        break;
      case 'video-last':
        setVideo((prev) => ({
          ...prev,
          isLastVideo: true
        }))
        break;
      case 'video-reset':
        setVideo((prev) => ({
          ...prev,
          isLastVideo: false,
          videoId: 0
        }))
        break;
      case 'play':
        setVideo((prev) => ({
          ...prev,
          isPlaying: !prev.isPlaying
        }))
        break;
      case 'pause':
        setVideo((prev) => ({
          ...prev,
          isPlaying: !prev.isPlaying
        }))
        break;
      default:
        return video;
    }
  }

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, index) => {
          return (
            <div key={list.id} id='slider' className='pr-10 sm:pr-20'>
              <div className='video-carousel_container'>

                <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                  <video
                    id='video'
                    playsInline={true}
                    preload='auto'
                    muted
                    ref={(el) => (videoRef.current[index] = el)}
                    onEnded={() => {
                      index !== 3
                        ? handleProcess('video-end', index)
                        : handleProcess('video-last')
                    }}
                    onPlay={() => {
                      setVideo(prevVid => ({
                        ...prevVid,
                        isPlaying: true
                      }))
                    }}
                    onLoadedMetadata={(el) => (
                      handleLoadedMetaData(index, el)
                    )}
                  >
                    <source
                      src={list.video}
                      type='video/mp4'
                    />
                  </video>
                </div>

                <div className="absolute top-12 left-[5%] z-10">
                  {list.textLists.map((text) => {
                    return <p key={text} className='md:text-2xl text-xl font-medium'>
                      {text}
                    </p>
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="relative flex-center mt-10">

        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, index) => {
            return <span
              key={index}
              ref={(el) => {
                return videoDivRef.current[index] = el
              }}
              className='mx-2 w-3 h-3 bg-gray-300 rounded-full relative cursor-pointer'
            >
              <span className="absolute h-full w-full rounded-full"  ref={(el) => {
                return videoSpanRef.current[index] = el
              }} />
            </span>
          })}
        </div>
        <button className='control-btn'>
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={isLastVideo ? () => handleProcess('video-reset')
              : !isPlaying
               ? () => handleProcess('play')
               : () => handleProcess('pause')
            }
          />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel
