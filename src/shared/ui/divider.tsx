

import React from 'react';

type DividerProps = {
    thickness?: string;
    color?: string;
};

const Divider: React.FC<DividerProps> = ({ color = '#ccc' }) => {
    return (
        <div className='w-full border-b border-gray-300 my-4' ></div>
    )
};

export default Divider;
