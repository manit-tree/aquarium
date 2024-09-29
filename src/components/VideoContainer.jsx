import { useEffect } from 'preact/hooks';

export default function VideoContainer({children}) {
    return (
        <div className="video-container">{children}</div>
    )
}