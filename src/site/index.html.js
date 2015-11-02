
export default function(cfg) {
    return (
`<!doctype html>
<head>
    <meta charset="utf-8">
    <title>Webpack Visualizer</title>
    <meta name="description" content="Visualize and analyze your Webpack bundle to see which modules are taking up space and which might be duplicates." />
    <meta name="viewport" content="width=750, initial-scale=1"/>
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <div id="App">${cfg.appHTML}</div>
    <script>
    (function() {
        var warned = false;
        var warning;
        
        document.addEventListener('click', handleClick);
        
        function handleClick(ev) {
            var nodeName = ev.target.nodeName;
            if (nodeName === 'a' || nodeName === 'button' || ev.target.getAttribute('role') === 'button') {
                showWarning();
                removeClickHandler();
            }
        }
        function removeClickHandler() {
            document.removeEventListener('click', handleClick);
        }
        function showWarning() {
            warning = document.createElement('div');
            warning.innerHTML = 'not yet!';
            warning.style.position = 'fixed';
            warning.style.background = 'rgba(0,0,0,0.5)';
            warning.style.left = 0;
            warning.style.right = 0;
            warning.style.top = 0;
            warning.style.bottom = 0;
            document.body.appendChild(warning);
            
            warned = true;
        }
        function removeWarning() {
            document.body.removeChild(warning);
        }
        window.appIsReadyNow = function() {
            removeWarning();
            removeClickHandler();
            delete window.appIsReadyNow;
        }
    })();
    </script>
    <script src="build.js"></script>
    
</body>`
    );
}
