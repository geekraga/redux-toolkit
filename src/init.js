import injectTapEventPlugin from 'react-tap-event-plugin';
import webFont from 'webfontloader';

// Load custom fonts
webFont.load({
    google: {
        families: ['Montserrat:300,400,500,600,700', 'Roboto:300,400,500,600,700'],
    },
});

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
