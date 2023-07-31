import React, { memo } from 'react';
import { BounceLoader } from 'react-spinners';
const Loading = () => {
    return <BounceLoader color='#ee3131' size={80} />;
};

export default memo(Loading);
