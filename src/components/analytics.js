// analytics.js

import ReactGA from 'react-ga';

export const initializeGA = () => {
    ReactGA.initialize('G-VT38KCDFTM');
};

export const trackPageview = (path) => {
    ReactGA.pageview(path);
};

export const trackEvent = (category, action, label) => {
    ReactGA.event({
        category,
        action,
        label,
    });
};
