import { useCallback, useEffect, useRef, useState } from 'react'

type UseIntersectionObserverProps = {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number | number[];
	onIntersect?: () => void;
};

export const useIntersectionObserver = (
	{ root, rootMargin, threshold, onIntersect }: UseIntersectionObserverProps = {
		rootMargin: '100px',
		threshold: 0.1,
	},
) => {
	const elementRef = useRef(null)

	const [isIntersecting, setIsIntersecting] = useState(false)

	const handleIntersect = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [entry] = entries
			setIsIntersecting(entry.isIntersecting)

			if (entry.isIntersecting) {
				onIntersect?.()
			}
		},
		[onIntersect],
	)

	useEffect(() => {
		const target = elementRef?.current
		if (!target) return

		const observer = new IntersectionObserver(handleIntersect, {
			root,
			rootMargin,
			threshold,
		})

		observer.observe(target)

		return () => {
			observer.unobserve(target)
		}
	}, [elementRef, root, rootMargin, threshold, handleIntersect])

	return { elementRef, isIntersecting }
}
