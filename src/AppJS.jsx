import {useEffect, useState} from 'react'
import './App.css'


export const sizes = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

export const useMediaQuery = (screen) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const query = `(min-width: ${sizes[screen]})`;
        const media = window.matchMedia(query);
        console.log(media);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [matches, screen]);

    return matches;
};

function isMatch(media) {
    const query = `(min-width: ${sizes[media]})`;
    return window.matchMedia(query).matches;
}

function findClosest(queries) {
    for (let i = queries.length - 1; i >= 0; i--) {
        if (isMatch(queries[i])) {
            return queries[i];
        }
    }
    return 'sm';
}

const queries = Object.keys(sizes);

export const useClosestMedia = () => {
    const [closest, setClosest] = useState('sm');

    useEffect(() => {
        const listener = () => setClosest(findClosest(queries));
        listener();
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener); //Cleanup
    }, []);

    useEffect(() => {
        console.log(closest);
    }, [closest]);
    return closest;
};


function App() {
    const closest = useClosestMedia();
    const sm = useMediaQuery('sm');
    return (
        <div className="container flex-col text-white gap-4">
            <div className="bg-neutral-900 p-4 rounded">Closest Media: {closest}</div>
            <div className="bg-neutral-900 p-4 rounded">{sm ? 'Hi desktop user!' : 'Hi mobile user!'}</div>
        </div>
    )
}

export default App
