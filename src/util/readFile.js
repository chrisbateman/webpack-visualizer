
export default function readFile(file, callback) {
    var reader = new FileReader();
    
    reader.onloadend = ev => {
        if (ev.target.readyState === FileReader.DONE) {
            callback(reader.result);
        }
    };
    
    reader.readAsText(file);
}
