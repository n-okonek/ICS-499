import React from 'react';
import InnerScreenView from './InnerScreenView';

import tv from '../../../images/tv.png'

export default function OuterScreenView() {
  return (
    <div className="outer-screen">
      <img src={tv} />
      <InnerScreenView />
    </div>
  )
}