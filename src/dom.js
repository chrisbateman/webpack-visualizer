
export function setDomDetails({name, size, percentage}) {
    document.querySelector('.details-name').innerHTML = name;
    document.querySelector('.details-size').innerHTML = size;
    document.querySelector('.details-percentage').innerHTML = percentage;
    document.querySelector('.details').style.visibility = '';
}


export function updateBreadcrumbs(nodeArray) {
    var sequence = document.querySelector('.breadcrumbs');
    
    var html = '';
    nodeArray.forEach(node => {
        html += `${node.name} > `;
    });
    html = html.substring(0, html.length - 2);
    
    sequence.innerHTML = html;
    
    document.querySelector('.breadcrumbs').style.visibility = '';
}


export function hideDetails() {
    document.querySelector('.breadcrumbs').style.visibility = 'hidden';
    document.querySelector('.details').style.visibility = 'hidden';
}
