import { FC } from 'react';

interface IProps {
	
}

const NftInnerContent: FC<IProps> = () => {
	return (
		<div
			className={
				'rounded-lg bg-white-transparent w-full p-[10px] shadow-custom-inset'
			}
		>
			
				<div >
					<div className={'w-full h-full flex justify-between items-center'}>
						<p className={'text-[10px] text-black font-bold'}>Мой Параметры</p>
					</div>
					
				</div>
		</div>
	);
};

export default NftInnerContent;
