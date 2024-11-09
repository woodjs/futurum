import Image from 'next/image';
import { FC } from 'react';

interface IProps {
	imageSrc: string;
}

const NftImage: FC<IProps> = ({ imageSrc }) => {
	return (
		<div
			className={
				'w-[220px] h-[260px] relative -top-[20px] -z-10 rounded-t-[14px] overflow-hidden'
			}
		>
			<Image fill src={imageSrc} alt={'nft card image'} />
		</div>
	);
};

export default NftImage;
