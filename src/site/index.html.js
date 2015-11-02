
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
    <script src="build.js"></script>
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-25267401-2', 'auto');
    ga('send', 'pageview');
    </script>
</body>`
    );
}
