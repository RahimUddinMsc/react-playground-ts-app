import React from 'react';  
import '../css/info.css';
import { useRadialMenuContext } from '../../../radialContextMenu/RadialMenuContext';
import { useListMenuContext } from '../../../listContextMenu/ListMenuContext';


const InfoPanel = () => {
     const { openMenu } = useListMenuContext();


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