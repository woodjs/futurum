import GameSectionDescription from '@/screens/main/game-section/GameSectionDescription/GameSectionDescription';
import GameSectionImage from '@/screens/main/game-section/GameSectionImage/GameSectionImage';

const GameSection = () => {
	return (
		<div className={'lg:flex-row flex justify-between mt-[64px] flex-col'}>
			<GameSectionDescription />
			<div className={'relative lg:w-1/2 h-[354px] w-full'}>
				<GameSectionImage />
			</div>
		</div>
	);
};

export default GameSection;
