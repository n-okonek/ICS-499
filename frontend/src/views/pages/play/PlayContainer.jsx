import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Buffer } from 'buffer';

import Layout from '../layout';
import Emulator from '../../../components/Emulator';
import tv from '../../../images/tv.png';

export default function(props) {
    const history = useHistory();
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
    <Layout>
      <div className="outer-screen">
        <img src={tv} />
        <div id="emulator-container">
            <div id="screen-container">
                {romData && (
                    <Emulator romData={romData} paused={paused} />
                    )}
            </div>
            <div id="control-buttons-container">
                <Button id="control-pause" variant={paused ? 'primary' : 'danger'} onClick={() => setPaused(!paused)}>{paused ? 'Play' : 'Pause'}</Button>
                <Button id="control-previous" variant='secondary' onClick={() => history.push('/user/library')}>Go Back</Button>
            </div>
        </div>
        </div>
    </Layout>
    )
}