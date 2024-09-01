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

/* Navbar alignment */
const ALIGN = "alignment";
const LEFT = "left";
const RIGHT = "right";

const LEFT_ICON = '<i class="fa-regular fa-hand-point-left" aria-hidden="true"></i>';
const RIGHT_ICON = '<i class="fa-regular fa-hand-point-right" aria-hidden="true"></i>';

let align = localStorage.getItem(ALIGN);
let alignToggle = document.getElementById(ALIGN);

let title = document.getElementById("site-title");
let menu = document.getElementById("menu");
let menuList = menu.getElementsByTagName("ul")[0];
let themeListItem = themeToggle.parentElement;
let alignListItem = alignToggle.parentElement;

function setAlignLeft() {
    alignToggle.innerHTML = RIGHT_ICON;
    title.style.float = RIGHT;
    menu.style.float = LEFT;
    menuList.prepend(themeListItem);
    menuList.append(alignListItem);
    menu.after(title);
}

function setAlignRight() {
    alignToggle.innerHTML = LEFT_ICON;
    title.style.float = LEFT;
    menu.style.float = RIGHT;
    menuList.append(themeListItem);
    menuList.prepend(alignListItem);
    menu.before(title);
}

function changeAlign(align) {
    switch (align) {
        case LEFT:
            setAlignLeft();
            break;
        case null:
            align = RIGHT;
        case RIGHT:
            setAlignRight();
            break;
    }
    localStorage.setItem(ALIGN, align);
}

changeAlign(align);

function toggleAlign(event) {
    if (align === LEFT) align = RIGHT;
    else if (align === RIGHT) align = LEFT;

    changeAlign(align);

    /* 0 clicks === keyboard user; make sure focus gets reset on right element */
    if (event.detail === 0) alignToggle.focus();
}

alignToggle.addEventListener("click", toggleAlign);
