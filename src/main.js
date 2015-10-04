import buildHierarchy from './buildHierarchy';
import createVisualization from './createVisualization';


const draggingClass = 'chart--dragging';
const chartArea = document.getElementById('Chart');
const demoLink = document.getElementById('demo');
var fileInput;


// initialize
{
    let a = 5;
    a++;
    chartArea.addEventListener('dragover', onDragOver);
    chartArea.addEventListener('dragenter', onDragEnter);
    chartArea.addEventListener('dragleave', onDragLeave);
    chartArea.addEventListener('drop', onDrop);
    chartArea.addEventListener('click', uploadClickListener);
    
    
    fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.className = 'hiddenFileInput';
    fileInput.addEventListener('change', onFileChange);
    document.body.appendChild(fileInput);
    
    demoLink.addEventListener('click', loadDemo);
}


function onDragOver(ev) {
    ev.preventDefault();
}

function onDragEnter(ev) {
    chartArea.classList.add(draggingClass);
}

function onDragLeave(ev) {
    chartArea.classList.remove(draggingClass);
}

function onDrop(ev) {
    ev.preventDefault();
    
    var file = ev.dataTransfer.files[0];
    
    var reader = new FileReader();
    reader.onload = loadEv => {
        chartArea.classList.remove(draggingClass);
        handleFileUpload(reader.result);
    };
    
    reader.readAsText(file);
}


function onFileChange(ev) {
    var fr = new FileReader();
    fr.onloadend = evt => {
        if (evt.target.readyState === FileReader.DONE) {
            handleFileUpload(fr.result);
        }
    };
    
    fr.readAsText(ev.target.files[0]);
}

function handleFileUpload(jsonText) {
    var json = JSON.parse(jsonText);
    
    chartArea.classList.remove('chart--needsUpload');
    chartArea.removeEventListener('click', uploadClickListener);
    
    if (demoLink.parentNode) {
        demoLink.parentNode.removeChild(demoLink);
    }
    
    createVisualization(buildHierarchy(json), '#Chart');
}

function uploadClickListener(ev) {
    fileInput.click();
}


function loadDemo(ev) {
    var request = new XMLHttpRequest();
    request.open('GET', '/test/stats-demo.json', true);
    
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            handleFileUpload(request.response);
        }
    };
    
    request.send();
}
