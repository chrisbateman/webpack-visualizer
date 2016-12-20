
export default function addDragDrop({el, onDragStart, onDragEnd, callback}) {
    el.addEventListener('dragenter', onDragStart);
    el.addEventListener('dragleave', onDragEnd);
    el.addEventListener('dragover', onDragOver);
    el.addEventListener('drop', onDrop);
    

    function onDragOver(ev) {
        ev.preventDefault();
    }
    
    function onDrop(ev) {
        ev.preventDefault();
        
        let file = ev.dataTransfer.files[0];
        
        onDragEnd();
        callback(file);
    }
}