import { FC } from 'react';

interface IProps {
	content: { title: string; value: string }[];
}

const NftInnerContent: FC<IProps> = ({ content }) => {
	return (
		<div
			className={
				'rounded-lg bg-white-transparent w-full p-[10px] shadow-custom-inset'
			}
		>
			{content?.map((row, index) => (
				<div key={index}>
					<div className={'w-full h-full flex justify-between items-center'}>
						<p className={'text-[10px] text-black font-bold'}>{row.title}</p>
						<p className={'text-[12px] text-black font-bold'}>{row.value}</p>
					</div>
					{index !== content.length - 1 && (
						<hr className={'mb-[8px] mt-[8px] opacity-50'} />
					)}
				</div>
			))}
		</div>
	);
};

export default NftInnerContent;
