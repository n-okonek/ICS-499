import React from 'react';
import InnerScreenView from './InnerScreenView';

import Layout from '../Layout';
import tv from '../../../images/tv.png'

export default function OuterScreenView() {
  return (
    <Layout>
    <div className="outer-screen">
      <img src={tv} />
      <InnerScreenView />
    </div>
    </Layout>
  )
}