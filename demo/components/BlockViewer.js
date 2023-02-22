import { Tooltip } from 'primereact/tooltip';
import { classNames } from 'primereact/utils';
import React, { useRef, useState } from 'react';
import { CodeHighlight } from './CodeHighlight';

const BlockViewer = (props) => {
    const [blockView, setBlockView] = useState('PREVIEW');
    const actionCopyRef = useRef(null);

    const copyCode = async (event) => {
        await navigator.clipboard.writeText(props.code);
        event.preventDefault();
    };

    return (
        <div className="block-viewer">
            <div className="block-section">
          
                <div className="block-content">
                    {blockView === 'PREVIEW' && (
                        <div className={props.containerClassName} style={props.previewStyle}>
                            {props.children}
                        </div>
                    )}

                    {blockView === 'CODE' && <CodeHighlight>{props.code}</CodeHighlight>}
                </div>
            </div>
        </div>
    );
};

export default BlockViewer;
