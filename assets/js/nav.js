const THEME = "theme";
const LIGHT = "light";
const DARK = "dark";

let theme = localStorage.getItem(THEME);
let themeToggle = document.getElementById(THEME);

function changeTheme(theme) {
    if (theme != LIGHT && theme != DARK) {
        if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: light)").matches
        ) {
            theme = LIGHT;
        } else {
            theme = DARK;
        }
    }
    console.log("changing theme to", theme);
    document.body.className = theme;
    localStorage.setItem(THEME, theme);
}

changeTheme(theme);

function toggleTheme() {
    "hit theme toggle"
    if (theme === LIGHT) theme = DARK;
    else if (theme === DARK) theme = LIGHT;
    changeTheme(theme);
}
  
themeToggle.addEventListener("mouseup", toggleTheme);
