import { useEffect, useRef, useState } from 'react'
import { projectContent, projectOrder } from '../data/portfolio-content'

const ACTIVATION_RATIO = 0.45

function ControlIcon({ paused }) {
  if (paused) {
    return (
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="currentColor" d="M8 5.5v13l11-6.5L8 5.5z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="currentColor" d="M6.5 5h3.5v14H6.5V5zm7.5 0H17.5v14H14V5z" />
    </svg>
  )
}

export default function ProjectGrid() {
  const gridRef = useRef(null)
  const videoRefs = useRef(new Map())
  const soundModeRef = useRef('try')
  const userPausedRef = useRef(false)
  const pinnedIdRef = useRef(null)
  const previousActiveRef = useRef(null)
  const [activeId, setActiveId] = useState(null)
  const [paused, setPaused] = useState(false)
  const [soundBlocked, setSoundBlocked] = useState(false)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return undefined

    const cards = Array.from(grid.querySelectorAll('[data-project-id]'))
    const ratios = new Map()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const chooseActive = () => {
      if (reducedMotion.matches) {
        setActiveId((current) => (current === null ? current : null))
        return
      }

      let bestId = null
      let bestRatio = ACTIVATION_RATIO
      cards.forEach((card) => {
        const ratio = ratios.get(card.dataset.projectId) || 0
        if (ratio > bestRatio) {
          bestRatio = ratio
          bestId = card.dataset.projectId
        }
      })
      setActiveId((current) => (current === bestId ? current : bestId))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.dataset.projectId, entry.isIntersecting ? entry.intersectionRatio : 0)
        })
        chooseActive()
      },
      { threshold: [0, 0.25, 0.45, 0.7, 1] },
    )

    cards.forEach((card) => observer.observe(card))
    reducedMotion.addEventListener('change', chooseActive)

    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', chooseActive)
    }
  }, [])

  useEffect(() => {
    const unlock = (event) => {
      if (soundModeRef.current === 'on') return
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest('.project-media, .project-pause, .project-sound')) return

      soundModeRef.current = 'on'
      setSoundBlocked(false)
      const id = pinnedIdRef.current || activeId
      const video = id ? videoRefs.current.get(id) : null
      if (!video || userPausedRef.current || document.hidden) return
      video.muted = false
      video.play().catch(() => {
        soundModeRef.current = 'blocked'
        video.muted = true
        setSoundBlocked(true)
      })
    }

    window.addEventListener('pointerdown', unlock)
    return () => window.removeEventListener('pointerdown', unlock)
  }, [activeId])

  useEffect(() => {
    const previous = previousActiveRef.current
    if (previous && activeId && previous !== activeId) {
      userPausedRef.current = false
      setPaused(false)
    }
    if (pinnedIdRef.current && pinnedIdRef.current === activeId) {
      pinnedIdRef.current = null
    }
    previousActiveRef.current = activeId
  }, [activeId])

  useEffect(() => {
    let cancelled = false

    const playVideo = async (video) => {
      if (soundModeRef.current === 'on') {
        video.muted = false
        try {
          await video.play()
        } catch {
          /* Playback can fail if the element was removed mid-swipe. */
        }
        return
      }

      if (soundModeRef.current === 'blocked') {
        video.muted = true
        if (!cancelled) setSoundBlocked(true)
        try {
          await video.play()
        } catch {
          /* Leave the pause control so a tap can start it. */
        }
        return
      }

      video.muted = false
      try {
        await video.play()
        if (cancelled) return
        soundModeRef.current = 'on'
        setSoundBlocked(false)
      } catch {
        if (cancelled) return
        soundModeRef.current = 'blocked'
        video.muted = true
        setSoundBlocked(true)
        try {
          await video.play()
        } catch {
          /* Autoplay is fully blocked until the next tap. */
        }
      }
    }

    const selectedId = pinnedIdRef.current || activeId

    videoRefs.current.forEach((video, id) => {
      const shouldPlay = id === selectedId && !userPausedRef.current && !document.hidden
      if (shouldPlay) playVideo(video)
      else video.pause()
    })

    const onVisibility = () => {
      const video = selectedId ? videoRefs.current.get(selectedId) : null
      if (!video) return
      if (document.hidden || userPausedRef.current) video.pause()
      else playVideo(video)
    }

    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [activeId, paused, soundBlocked])

  const togglePause = (id) => {
    const video = videoRefs.current.get(id)
    if (!video) return

    if (!video.paused) {
      pinnedIdRef.current = null
      userPausedRef.current = true
      video.pause()
      setPaused(true)
      return
    }

    pinnedIdRef.current = id
    userPausedRef.current = false
    soundModeRef.current = 'on'
    setSoundBlocked(false)
    setPaused(false)
    videoRefs.current.forEach((other, otherId) => {
      if (otherId !== id) other.pause()
    })
    video.muted = false
    video.play().catch(() => {
      soundModeRef.current = 'blocked'
      video.muted = true
      setSoundBlocked(true)
      video.play().catch(() => {})
    })

    if (id !== activeId) {
      gridRef.current
        ?.querySelector(`[data-project-id="${id}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }

  const enableSound = (id) => {
    const video = videoRefs.current.get(id)
    soundModeRef.current = 'on'
    setSoundBlocked(false)
    if (!video || userPausedRef.current) return
    video.muted = false
    video.play().catch(() => {
      soundModeRef.current = 'blocked'
      video.muted = true
      setSoundBlocked(true)
    })
  }

  return (
    <div className="project-grid" ref={gridRef}>
      {projectOrder.map((id, index) => {
        const project = projectContent[id]
        const hasVideo = Boolean(project.video)
        const isActive = id === activeId
        const showSound = hasVideo && isActive && soundBlocked
        const showPaused = !isActive || paused

        return (
          <article
            key={id}
            data-project-id={id}
            className={[
              'project-card',
              index === 0 ? 'project-card--feature' : '',
              hasVideo ? 'project-card--video' : 'project-card--text',
              hasVideo ? `project-card--${project.videoFrame}` : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {hasVideo ? (
              <div className="project-media">
                <video
                  ref={(node) => {
                    if (node) videoRefs.current.set(id, node)
                    else videoRefs.current.delete(id)
                  }}
                  src={project.video}
                  playsInline
                  loop
                  preload="metadata"
                  aria-label={`${project.shortTitle} project video`}
                  onClick={() => togglePause(id)}
                />
                <div className="project-controls">
                  {showSound ? (
                    <button type="button" className="project-sound" onClick={() => enableSound(id)}>
                      Sound
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="project-pause"
                    aria-pressed={!showPaused}
                    onClick={() => togglePause(id)}
                  >
                    <ControlIcon paused={showPaused} />
                    <span>{showPaused ? 'Play' : 'Pause'}</span>
                  </button>
                </div>
              </div>
            ) : null}

            <div className="project-body">
              <p className="project-index">{String(index + 1).padStart(2, '0')}</p>
              <p className="project-kicker">
                {project.category} · {project.eyebrow}
              </p>
              <h3>{project.shortTitle}</h3>
              <p className="project-copy">{hasVideo || index !== 0 ? project.description : project.detail}</p>
              <p className="project-focus">{project.focus}</p>
              <ul className="chip-row">
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
          </article>
        )
      })}
    </div>
  )
}
