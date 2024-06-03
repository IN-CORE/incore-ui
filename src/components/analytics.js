// analytics.js

import ReactGA from 'react-ga';

export const initializeGA = async () => {
	try {
		const response = await fetch('/config/config.json');
		const config = await response.json();
		ReactGA.initialize(config.GA_KEY);
	} catch (error) {
		console.error('Failed to fetch Google Analytics Keys:', error);
	}
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
