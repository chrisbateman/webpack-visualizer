
export function getAncestors(node) {
    var ancestors = [];
    var current = node;
    
    while (current.parent) {
        ancestors.unshift(current);
        current = current.parent;
    }
    
    return ancestors;
}


export function getAllChildren(rootNode) {
    var allChildren = [];
    
    var getChildren = function(node) {
        allChildren.push(node);
        
        if (node.children) {
            node.children.forEach(child => {
                getChildren(child);
            });
        }
    };
    
    getChildren(rootNode);
    
    return allChildren;
}


export function markDuplicates(nodes) {
    var fullNameList = {};
    
    nodes.forEach(item => {
        if (!item.fullName) {
            return;
        }
        
        let lastIndex = item.fullName.lastIndexOf('~');
        if (lastIndex !== -1) {
            let fullName = item.fullName.substring(lastIndex);
            
            if (fullName in fullNameList) {
                item.duplicate = true;
                fullNameList[fullName].duplicate = true;
            } else {
                fullNameList[fullName] = item;
            }
        }
    });
}
