'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play, Pause, ExternalLink } from 'lucide-react'

interface PodcastEpisode {
  id?: string | null
  title: string
  description: string
  publishedDate: string
  coverImage?: string | null
  audioFile?: string | null
  duration?: number | null
}

interface PodcastBlockProps {
  id?: string
  title?: string
  spotifyUrl?: string
  useCustomPlayer?: boolean
  spotifyEmbedCode?: string
  episode?: PodcastEpisode
}

export const PodcastBlock: React.FC<PodcastBlockProps> = (props) => {
  const {
    id,
    title = 'Listen to Our Podcasts on Spotify',
    spotifyUrl = 'https://open.spotify.com/show/7MoeAljOnuz3QVMjptb5TQ?si=9zJzTPRUQMutRcUvp4KJiQ',
    useCustomPlayer = true,
    spotifyEmbedCode,
    episode,
  } = props

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Default episode data
  const defaultEpisode: PodcastEpisode = {
    id: 'demo-episode',
    title: 'Sample Podcast Episode',
    description: 'This is a sample podcast episode description.',
    publishedDate: '2024-01-15',
    coverImage: '/media/podcast-cover.jpg',
    audioFile: '/media/sample-podcast.mp3',
    duration: 381, // 6:21 in seconds
  }

  const currentEpisode = episode || defaultEpisode

  // Initialize duration from episode data if available
  useEffect(() => {
    if (currentEpisode?.duration && currentEpisode.duration > 0) {
      setDuration(currentEpisode.duration)
      console.log('Setting duration from episode data:', currentEpisode.duration)
    }
  }, [currentEpisode?.duration])

  const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00'
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const togglePlayPause = async () => {
    if (!audioRef.current || !currentEpisode?.audioFile) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        await audioRef.current.play()
        setIsPlaying(true)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error playing audio:', error)
      setIsLoading(false)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration || duration <= 0) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const progressBarWidth = rect.width
    const clickRatio = clickX / progressBarWidth
    const newTime = clickRatio * duration

    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentEpisode.audioFile) return

    // Force load the audio to get duration
    audio.load()

    const handleLoadedMetadata = () => {
      console.log('Audio metadata loaded, duration:', audio.duration)
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration)
      } else if (currentEpisode?.duration && currentEpisode.duration > 0) {
        console.log('Using episode duration fallback:', currentEpisode.duration)
        setDuration(currentEpisode.duration)
      }
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      // Double-check duration on every time update
      if (duration === 0 && !isNaN(audio.duration) && audio.duration > 0) {
        console.log('Setting duration during time update:', audio.duration)
        setDuration(audio.duration)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = (e: Event) => {
      console.error('Audio error:', e)
      setIsLoading(false)
      setIsPlaying(false)
    }

    const handleCanPlay = () => {
      console.log('Audio can play, duration:', audio.duration)
      setIsLoading(false)
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration)
      }
    }

    const handleLoadStart = () => {
      console.log('Audio load started')
      setIsLoading(true)
    }

    const handleDurationChange = () => {
      console.log('Duration changed:', audio.duration)
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration)
      }
    }

    const handleLoadedData = () => {
      console.log('Audio data loaded, duration:', audio.duration)
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration)
      }
    }

    // Add all possible events to catch duration
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('loadeddata', handleLoadedData)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('durationchange', handleDurationChange)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('loadeddata', handleLoadedData)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('durationchange', handleDurationChange)
    }
  }, [currentEpisode.audioFile, duration, currentEpisode?.duration])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  // DEBUG: Add visual indicator at the very start
  if (!useCustomPlayer && spotifyEmbedCode) {
    return (
      <div className="my-16" id={`block-${id}`}>
        <div className="container">
          <div className="mb-4 p-4 bg-yellow-500 text-black rounded">
            <h4 className="font-bold">SPOTIFY EMBED MODE</h4>
            <p>useCustomPlayer: {useCustomPlayer.toString()}</p>
            <p>spotifyEmbedCode: {spotifyEmbedCode ? 'PROVIDED' : 'NOT PROVIDED'}</p>
          </div>
          <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
          <div
            className="max-w-2xl mx-auto"
            dangerouslySetInnerHTML={{ __html: spotifyEmbedCode }}
          />
          <div className="text-center mt-6">
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View More on Spotify
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      <div className="container">
        <div className="mb-4 p-4 bg-purple-500 text-white rounded">
          <h4 className="font-bold">CUSTOM PLAYER MODE</h4>
          <p>useCustomPlayer: {useCustomPlayer.toString()}</p>
          <p>spotifyEmbedCode: {spotifyEmbedCode ? 'PROVIDED' : 'NOT PROVIDED'}</p>
          <p>episode.audioFile: {currentEpisode.audioFile || 'NOT PROVIDED'}</p>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-48 md:h-48 relative">
              {currentEpisode.coverImage ? (
                <Image
                  src={currentEpisode.coverImage}
                  alt={`Cover for ${currentEpisode.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              ) : (
                <div className="w-full h-48 md:h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                  <div className="text-white text-6xl">🎙️</div>
                </div>
              )}
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {currentEpisode.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {currentEpisode.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Published: {new Date(currentEpisode.publishedDate).toLocaleDateString()}
              </p>

              {/* DEBUG: Show progress calculation */}
              <div className="mb-4 p-4 bg-red-500 text-white rounded">
                <h4 className="font-bold">AUDIO CONTROLS DEBUG</h4>
                <p>Audio file: {currentEpisode.audioFile}</p>
                <p>
                  Duration: {duration} seconds ({formatTime(duration)})
                </p>
                <p>
                  Current time: {currentTime} seconds ({formatTime(currentTime)})
                </p>
                <p>Progress: {progress.toFixed(2)}%</p>
                <p>Is playing: {isPlaying.toString()}</p>
                <p>Is loading: {isLoading.toString()}</p>
              </div>

              {/* Audio Controls - Always show if episode has audio */}
              <audio
                ref={audioRef}
                src={currentEpisode.audioFile || undefined}
                preload="metadata"
              />

              <div className="flex items-center gap-4 mb-4 p-4 bg-blue-500 rounded">
                <button
                  onClick={togglePlayPause}
                  disabled={isLoading || !currentEpisode.audioFile}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-5 h-5 text-gray-700" />
                  ) : (
                    <Play className="w-5 h-5 text-gray-700 ml-0.5" />
                  )}
                </button>
                <div className="text-white">
                  {formatTime(currentTime)} / {formatTime(duration)}
                  {duration > 0 && (
                    <span className="text-xs ml-2">
                      ({formatTime(duration - currentTime)} left)
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4 p-2 bg-green-500 rounded">
                <div className="text-white text-xs mb-1">
                  Progress: {progress.toFixed(1)}% | Width: {progress}%
                </div>
                <div
                  className="w-full h-4 bg-white rounded-full cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-red-500 rounded-full transition-all duration-100"
                    style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
                  />
                </div>
              </div>
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View More on Spotify
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
