import { Button, GradientTypography, Typography } from '@/shared/ui';
import Section from '../section';

export default function JoinUs() {
	return (
		<Section>
			<div className="w-full bg-[#F8F9FB] py-[34px] rounded-[15px] flex flex-col justify-center items-center text-center">
				<Typography variant="h2">
					Начни получать{' '}
					<GradientTypography variant="h2">доход</GradientTypography> уже
					сегодня
				</Typography>
				<Typography variant="h5" className="my-[16px]">
					Регистрируйся и покупай NFT с гарантированной доходностью
				</Typography>
				<Button size="sm">Регистрация</Button>
			</div>
		</Section>
	);
}
