import {FaSun, FaMoon} from "react-icons/fa"
import ReactDOMServer from 'react-dom/server';

const SwitchTheme = () => {
    // function to set a given theme/color-scheme
    function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
    }
// function to toggle between light and dark theme
    function toggleTheme(e) {
        e.preventDefault();
        if (localStorage.getItem('theme') === 'theme-dark'){
            setTheme('theme-light');
            e.target.innerHTML = ReactDOMServer.renderToString(<FaMoon />);
        } else {
            setTheme('theme-dark');
            e.target.innerHTML = ReactDOMServer.renderToString(<FaSun />);
        }
    }
// Immediately invoked function to set the theme on initial load
    (function () {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-dark');
        } else {
            setTheme('theme-light');
        }
    })();
    return (
        <div id="switch" onClick={toggleTheme}>Change theme!!</div>
    );
};

export default SwitchTheme;
