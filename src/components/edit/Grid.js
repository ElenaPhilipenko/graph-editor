import React  from 'react'

const Grid = ()=> {
    return (<g>
            <defs>
                <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#d6d6d6" strokeWidth="0.5"/>
                </pattern>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <rect width="80" height="80" fill="url(#smallGrid)"/>
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#d6d6d6" strokeWidth="1"/>
                </pattern>
            </defs>
            <rect
                id='gridRect'
                width="100%"
                height="100%"
                fill="url(#grid)"
            />
        </g>
    )
};

export default Grid