import { useEffect, useRef, useState } from 'react'

type UseIntersectionObserverProps = {
	threshold?: number;
	root?: Element | null;
	rootMargin?: string;
};

export const useIntersectionObserver = ({
	threshold = 0,
	root = null,
	rootMargin = '0px',
}: UseIntersectionObserverProps = {}) => {
	const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
	const [isIntersecting, setIsIntersecting] = useState(false)
	const elementRef = useRef<HTMLElement | null>(null)

	const frozen = useRef(false)

	const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
		setEntry(entry)
		setIsIntersecting(entry.isIntersecting)
	}

	useEffect(() => {
		const node = elementRef?.current
		if (!node || frozen.current) return

		const observerParams = { threshold, root, rootMargin }
		const observer = new IntersectionObserver(updateEntry, observerParams)

		observer.observe(node)

		return () => observer.disconnect()
	}, [threshold, root, rootMargin])

	return { elementRef, entry, isIntersecting, frozen }
}
