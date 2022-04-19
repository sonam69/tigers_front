<header>
    <div class="container">
        <a id="logo" href="/">Hollywood Tigers</a>
        <div class="menu_nav">
            <button class="close" onclick="(toggle_menu(false))" style="right: 17px;"></button>
            <ul class="navigation">
                <li><a href="/">Home</a></li>
                <li><a onclick="moveTo('.banner')">About</a></li>
                <li><a onclick="moveTo('.meet')">Team</a></li>
                <li><a href="whitepaper">White Paper</a></li>
                <li><a onclick="moveTo('.roadmap')">Road Map</a></li>
            </ul>
        </div>
        <div class="header_right">
            <ul class="social">
                <li><a href="" class="discord" title="discord"><span>DISCORD</span></a></li>
            </ul>
            <div id="burger" onclick="toggle_menu(true)">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</header>
<div class="overlay"></div>