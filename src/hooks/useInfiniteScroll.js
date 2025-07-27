import { useEffect, useRef, useCallback } from 'react'

export const useInfiniteScroll = (callback, hasMore, isLoading) => {
  const observerRef = useRef()
  const loadingRef = useRef()

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return
      if (observerRef.current) observerRef.current.disconnect()
      
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            callback()
          }
        },
        {
          threshold: 0.1,
          rootMargin: '100px'
        }
      )
      
      if (node) observerRef.current.observe(node)
    },
    [callback, hasMore, isLoading]
  )

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { lastElementRef }
}