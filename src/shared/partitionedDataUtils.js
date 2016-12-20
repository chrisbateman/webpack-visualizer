
export function getAncestors(node) {
    let ancestors = [];
    let current = node;
    
    while (current.parent) {
        ancestors.unshift(current);
        current = current.parent;
    }
    
    return ancestors;
}


export function getAllChildren(rootNode) {
    let allChildren = [];
    
    let getChildren = function(node) {
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
    let fullNameList = {};
    
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
