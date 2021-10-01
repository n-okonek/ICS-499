import React, { useEffect, useRef, useState } from 'react';
import { NES } from 'jsnes';
import Screen from './Screen';
import FrameTimer from './FrameTimer';
import PlayerController from './PlayerController';

export default function Emulator({romData, paused}) {
    const frameTimerRef = useRef();
    const screenRef = useRef();
    const nesRef = useRef();
    const fpsIntervalRef = useRef();
    
    const start = () => {
        // Map keyboard keys to controller
        const controller = new PlayerController({
            onButtonDown: nesRef.current.buttonDown,
            onButtonUp: nesRef.current.buttonUp
        });
        // Load the key mappings
        controller.loadKeys();
        document.addEventListener('keydown', controller.handleKeyDown);
        document.addEventListener('keyup', controller.handleKeyUp);
        document.addEventListener('keypress', controller.handleKeyPress);
        
        // Start frame timer
        const frameTimer = frameTimerRef.current;
        frameTimer.start();
        fpsIntervalRef.current = setInterval(() => {
            if(nesRef.current) {
                console.debug(`FPS: ${nesRef.current.getFPS()}`); 
            }
        }, 1000);
    }
    
    const stop = () => {
        const frameTimer = frameTimerRef.current;
        frameTimer.stop();
        clearInterval(fpsIntervalRef.current);
    }

    useEffect(() => {
        // Initial layout
        screenRef.current.fitInParent();
        screenRef.current.listenForResize();
        const nes = new NES({
            onFrame: screenRef.current.setBuffer
        })
        frameTimerRef.current = new FrameTimer(nes.frame, screenRef.current.writeBuffer); 
        console.log('loading rom data'); 
        nes.loadROM(romData);
        nesRef.current = nes;
        start(); 
    }, [])
    
    useEffect(() => {
        console.log('paused updated');
        const frameTimer = frameTimerRef.current;
        if (frameTimer && frameTimer.isRunning() && paused) {
            stop();
        }
        
        if (frameTimer && !frameTimer.isRunning() && !paused) {
            start();
        }
    }, [paused])
    
    return (
            <Screen ref={screenRef} />
    )
}