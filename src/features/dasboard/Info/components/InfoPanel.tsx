import React from 'react';  
import '../css/info.css';
import { useRadialMenuContext } from '../../../contextMenu/RadialMenuContext';

const InfoPanel = () => {
     const { openMenu } = useRadialMenuContext();


    return <>

        <div className="info-tile" 
            onContextMenu={(e) => {
                e.preventDefault();
                const card = e.currentTarget as HTMLElement;
                openMenu(e.clientX, e.clientY, `info`);
            }}>
            <h3>Info</h3>        
        </div>
        
    </>
}

export default InfoPanel;