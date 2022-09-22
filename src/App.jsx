import { useEffect, useState } from 'react';
import './App.css';

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
    const query = useMediaQuery('lg');
    return (
        <div className="container">
            <div className="plate-container">
                <img className="plate" src="plate-3.webp" />
            </div>
            <div className="text-container">
                <h1 className="title">Vegetarian Food, No Compromise!</h1>
                <div>
                    Delicious meat-free meals, with flavour to spare. Inspired
                    by Carribean cuisine, and bursting with flavour!
                </div>
                <button className="cta">Order Now</button>
            </div>
        </div>
    );
}

export default App;
