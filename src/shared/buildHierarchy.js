export default function buildHierarchy(modules) {
    let maxDepth = 1;
    
    let root = {
        children: [],
        name: 'root'
    };
    
    modules.forEach(function addToTree(module) {
        // remove this module if either:
        // - index is null
        // - issued by extract-text-plugin
        let extractInIdentifier = module.identifier.indexOf('extract-text-webpack-plugin') !== -1;
        let extractInIssuer = module.issuer && module.issuer.indexOf('extract-text-webpack-plugin') !== -1;
        if (extractInIdentifier || extractInIssuer || module.index === null) {
            return;
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
        if (!parentTree.children) {
            parentTree.children = [];
        }
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
