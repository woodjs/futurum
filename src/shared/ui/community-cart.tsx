import React, {FC} from 'react';

interface IProps {
    children: React.ReactNode;
}

const CommunityCart:FC<IProps> = ({children}) => {
    return <div className={'w-full border border-solid border-gray2 bg-gray flex justify-center items-center rounded-[10px] h-[80px]'}>
        {children}
    </div>
};

export default CommunityCart;