export default function buildHierarchy(json) {
    let modules = json.modules;
    let maxDepth = 1;
    
    let root = {
        children: [],
        name: 'root'
    };
    
    modules.forEach(function addToTree(module) {
        // remove this module if either:
        // - duplicate/incorrect style-loader item
        // - issued by extract-text-plugin, which means it was moved to a css file
        if (module.identifier.indexOf('css-loader') !== -1) {
            if (module.identifier.indexOf('style-loader') !== -1 || module.issuer.indexOf('extract-text-webpack-plugin') !== -1) {
                return;
            }
        }
        
        let mod = {
            id: module.id,
            fullName: module.name,
            size: module.size,
            reasons: module.reasons
        };
        
        let depth = mod.fullName.split('/').length - 1;
        if (depth > maxDepth) {
            maxDepth = depth;
        }
        
        let fileName = mod.fullName;
        
        let beginning = mod.fullName.slice(0, 2);
        if (beginning === './') {
            fileName = fileName.slice(2);
        }
        
        getFile(mod, fileName, root);
    });
    
    root.maxDepth = maxDepth;
    
    return root;
}


function getFile(module, fileName, parentTree) {
    let charIndex = fileName.indexOf('/');
    
    if (charIndex !== -1) {
        let folder = fileName.slice(0, charIndex);
        if (folder === '~') {
            folder = 'node_modules';
        }
        
        let childFolder = getChild(parentTree.children, folder);
        if (!childFolder) {
            childFolder = {
                name: folder,
                children: []
            };
            parentTree.children.push(childFolder);
        }
        
        getFile(module, fileName.slice(charIndex + 1), childFolder);
    } else {
        module.name = fileName;
        parentTree.children.push(module);
    }
}


function getChild(arr, name) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === name) {
            return arr[i];
        }
    }
}
