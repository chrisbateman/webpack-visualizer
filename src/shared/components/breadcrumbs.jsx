import React from 'react';


export default props => (
    <div className="breadcrumbs">
        {props.nodes.map((node, i) => {
            var result = ' > ';
            if (i === 0) {
                result = '';
            }
            return result + node.name;
        })}
    </div>
);
