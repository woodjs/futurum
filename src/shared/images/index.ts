import gameImg from './game.png';
import nftdog from './nft-dog.png';
import nft2 from './nft-2.png';
import {StaticImageData} from "next/image";

export const landingImages: Record<string, StaticImageData> = {
    gameImg: gameImg as StaticImageData,
    nftdog: nftdog as StaticImageData,
    nft2: nft2 as StaticImageData
}