//import UglifyJS from '../uglifyjs';
//import 'imports?this=>window!../uglifyjs';


export default function buildHierarchy(json) {
    var modules = json.modules;
    var maxDepth = 1;
    
    var root = {
        children: [],
        name: 'root'
    };
    
    modules.forEach(function addToTree(module) {
        var size;
        
        //if (module.source) {
            //size = module.source.length;
            /*
            var toplevel_ast = window.UglifyJS.parse(module.source);
            toplevel_ast.figure_out_scope();
            var compressor = window.UglifyJS.Compressor();
            var compressed_ast = toplevel_ast.transform(compressor);
            compressed_ast.figure_out_scope();
            compressed_ast.compute_char_frequency();
            compressed_ast.mangle_names();
            var code = compressed_ast.print_to_string();
            
            size = code.length;*/
            
        //} else {
        size = module.size;
        //}
        
        var mod = {
            id: module.id,
            fullName: module.name,
            size: size,
            reasons: module.reasons,
            source: module.source
        };
        
        var depth = mod.fullName.split('/').length - 1;
        if (depth > maxDepth) {
            maxDepth = depth;
        }
        
        var fileName = mod.fullName;
        
        var beginning = mod.fullName.slice(0, 2);
        if (beginning === './') {
            fileName = fileName.slice(2);
        }
        
        getFile(mod, fileName, root);
    });
    
    root.maxDepth = maxDepth;
    
    return root;
}


function getFile(module, fileName, parentTree) {
    var charIndex = fileName.indexOf('/');
    
    if (charIndex !== -1) {
        var folder = fileName.slice(0, charIndex);
        if (folder === '~') {
            folder = 'node_modules';
        }
        
        var childFolder = getChild(parentTree.children, folder);
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
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === name) {
            return arr[i];
        }
    }
}
