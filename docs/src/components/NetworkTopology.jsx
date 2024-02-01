import React, { useRef, useState, useEffect, useCallback } from 'react';
import * as three from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
window.THREE = three;
// import ForceGraph3D from 'react-force-graph-3d';
import ForceGraph2D from 'react-force-graph-2d';

const extraRenderers = [new CSS2DRenderer()];

export function NetworkTopology(props) {
    const {
        orbitDuration = 0,
        distance = 100,
        height = 300,
        className,
        style,
        ...other
    } = props;
    const [ theme, setTheme ] = useState({
        name: null,
        font: null,
        bkColor: undefined,
        bgColor: undefined,
        txtColor: undefined
    })
    const [ size, setSize ] = useState(null);
    const cameraRef = useRef({ angle: 0, interval: null });
    const boundsRef = useRef(null);
    const graphRef = useRef(null);
    const updateTheme = useCallback((/* { matches } */) => {
        console.log('updateTheme')
        const name = document.documentElement.dataset?.theme || (
            window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
        );
        const computedStyle = getComputedStyle(document.documentElement);
        const font = computedStyle.getPropertyValue('--__sl-font'); // --__sl-font-mono
        const bgColor = computedStyle.getPropertyValue("--sl-color-bg");
        // const bkColor = computedStyle.getPropertyValue("--sl-color-backdrop-overlay");
        // const bkColor = computedStyle.getPropertyValue("--sl-shadow-md");
        const bkColor = null;
        const txtColor = computedStyle.getPropertyValue("--sl-color-text");
        if (
            name === theme.name
            && font === theme.font
            && bgColor === theme.bgColor
            && bkColor === theme.bkColor
            && txtColor === theme.txtColor
        ) return;
        // console.log('theme', { name, font, bgColor, bkColor, txtColor })
        setTheme({ name, font, bgColor, bkColor, txtColor });
    });
    
    useEffect(() => {
        if (!theme.name) {
            updateTheme()
        }
        if (!boundsRef.current) return;
        const resizeObserver = new ResizeObserver(() => {
            const rect = boundsRef.current.getBoundingClientRect();
            setSize({
                width: rect.width - 2,
                height: rect.height - 2,
            });
            graphRef.current.zoomToFit(500, 10);
        });
        // window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', updateTheme);
        const mutationObserver = new MutationObserver((/* list, obs */) => updateTheme());
        mutationObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
        resizeObserver.observe(boundsRef.current);
        // graphRef.current.zoomToFit(500, 10);
        if (orbitDuration !== 0) {
            cameraRef.current.interval = setInterval(() => {
                const angle = cameraRef.current.angle;
                graphRef.current.cameraPosition({
                    x: distance * Math.sin(angle),
                    y: distance * Math.cos(angle),
                    z: distance * Math.cos(angle)
                });
                cameraRef.current.angle = angle + (Math.PI / orbitDuration);
            }, 10);
        }
        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            clearInterval(cameraRef.current.interval);
            // window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateTheme);
        }
    }, []);
    useEffect(() => {
        setTimeout(() => {
            graphRef.current.zoomToFit(500, 10);
        }, 100);
    }, [size]);
    // if (!theme.name) return null;
    return (
        <div
            ref={boundsRef}
            className={`${className || ''} nettop`}
            style={{
                minHeight: height,
                ...style,
            }}
        >
            <ForceGraph2D
                ref={graphRef}
                key={theme.name}
                nodeAutoColorBy="group"
                extraRenderers={extraRenderers}
                enableNodeDrag={false}
                enableNavigationControls={orbitDuration === 0}
                showNavInfo={false}
                width={size ? size.width : null}
                height={size ? size.height : null}
                backgroundColor={theme.bgColor || 'white'}
                
                // cameraPosition={{ z: distance }}
                // ontrolType="orbit"
                // nodeThreeObjectExtend={true}
                // nodeThreeObject={node => {
                //     const nodeEl = document.createElement('div');
                //     nodeEl.textContent = node.label;
                //     nodeEl.style.color = node.color;
                //     nodeEl.className = 'node-label';
                //     return new CSS2DObject(nodeEl);
                // }}

                nodeCanvasObject={(node, ctx, globalScale) => {
                    const label = node.label;
                    const fontSize = 20 / globalScale;
                    ctx.font = `${fontSize}px ${theme.font || 'Sans-Serif'}`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [
                        textWidth + (10 / globalScale),
                        fontSize
                    ].map(n => n + fontSize * 0.5); // some padding

                    ctx.fillStyle = // node.color || // theme.bkColor ||
                        (theme.name === 'dark' ? 'rgba(0, 0, 0, 0.66)' : 'rgba(255, 255, 255, 0.66)');
                    ctx.beginPath();
                    ctx.roundRect(
                        node.x - (bckgDimensions[0]) / 2,
                        node.y - (bckgDimensions[1]) / 2,
                        bckgDimensions[0],
                        bckgDimensions[1],
                        4 / globalScale
                    );
                    ctx.fill();
                    ctx.strokeStyle = // node.color || // theme.txtColor ||
                        (theme.name === 'dark' ? 'rgba(255, 255, 255, 0.33)' : 'rgba(0, 0, 0, 0.33)');
                    ctx.lineWidth = 1 / globalScale;
                    ctx.stroke();

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = /* node.color || */ theme.txtColor // || 'black'
                    ctx.fillText(label, node.x, node.y);

                    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                }}
                nodePointerAreaPaint={(node, color, ctx) => {
                    ctx.fillStyle = color;
                    const bckgDimensions = node.__bckgDimensions;
                    bckgDimensions && ctx.fillRect(
                        node.x - bckgDimensions[0] / 2,
                        node.y - bckgDimensions[1] / 2,
                        ...bckgDimensions
                    );
                }}

                linkDirectionalParticleWidth={2}
                // linkDirectionalArrowOpacity={0.25}
                // linkDirectionalParticleOpacity={0.25}
                // linkDirectionalParticleColor={() => 'white'}
                // linkDirectionalParticleResolution={4}
                linkDirectionalParticleSpeed={0.0015}
                // linkDirectionalArrowLength={3.5}
                // linkDirectionalArrowRelPos={1}
                // linkDirectionalArrowResolution={8}
                // linkDirectionalArrowColor={() => 'white'}
                linkCurvature={0.25}
                // nodeLabel="label"
                // nodeLabel={(node) => node.label}
                nodeSize={15}
                nodeRelSize={5}
                // nodeOpacity={1}
                
                // nodeColor={(node) => (node.id === '1' ? 'red' : 'blue')}
                
                // linkColor={() => 'gray'}
                // linkCurvature="curvature"
                // linkCurveRotation="rotation"
                linkDirectionalParticles={20}
                linkAutoColorBy="type"
                // linkOpacity={0.5}
                linkWidth={2}
                linkResolution={6}
                {...other}
            />
        </div>
    );
}

export default NetworkTopology;