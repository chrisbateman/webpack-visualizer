import React, {PropTypes} from 'react';


let Breadcrumbs = props => (
    <div className="breadcrumbs">
        {props.nodes.map((node, i) => {
            let result = ' > ';
            if (i === 0) {
                result = '';
            }
            return result + node.name;
        })}
    </div>
);

Breadcrumbs.propTypes = {
    nodes: PropTypes.array
};

export default Breadcrumbs;
