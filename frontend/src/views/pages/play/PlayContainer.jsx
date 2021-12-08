import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Emulator from '../../../components/Emulator';
import { Buffer } from 'buffer';

export default function(props) {
    const { romid } = props.location.state;

    const [romData, setRomData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false);
    const [paused, setPaused] = useState(true);

    const fetchRom = async romid => {
        return await axios.get(process.env.API_URL + `/rom/${romid}`);
    }
    
    useEffect(() => {
        if (!romid) {
            setLoading(false);
            setSuccess(false);
        }

        if (romid) {
            setLoading(true);
            fetchRom(romid).then(res => {
                const buffer = Buffer.from(res.data.romdata);
                setRomData(buffer.toString());
                setLoading(false);
                setSuccess(true);
            })
            .catch(err => {
                setLoading(false);
                setSuccess(false);
                console.error(err);
            });
        }
    }, [])
    
    if (!loading && !success) {
        return (
            <span>Unable to load rom</span>
        )
    }
    
    return (
        <div id="emulator-container">
            <div id="screen-container">
                {romData && (
                    <Emulator romData={romData} paused={paused} />
                )}
            </div>
            <Button id="pause-button" variant={paused ? 'primary' : 'danger'} onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</Button>
        </div>
    )
}