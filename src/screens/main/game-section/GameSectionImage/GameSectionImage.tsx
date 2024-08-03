import Image from "next/image";
import {landingImages} from "@/shared/images";

const GameSectionImage = () => {
    return <Image src={landingImages.gameImg} alt={'game'} fill />
};

export default GameSectionImage;