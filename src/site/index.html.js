
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
</body>`
    );
}
