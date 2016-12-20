let colors = {
    '__file__': '#db7100',
    //'node_modules': '#599e59',
    //'node_modules': '#215E21',
    //'node_modules': '#326589', //#26587A',
    '__default__': '#487ea4'
};


export function getColor(obj) {
    let name = obj.name;
    let dotIndex = name.indexOf('.');
    
    if (dotIndex !== -1 && dotIndex !== 0 && dotIndex !== name.length - 1) {
        return colors.__file__;
    } else if (obj.parent && obj.parent.name === 'node_modules') {
        return '#599e59';
    }
    
    return colors[name] || colors.__default__;
}
