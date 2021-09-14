export interface OpenSeaMetadata {
  name: string;
  description: string;
  tokenId: number;
  image: string;
  attributes: OpenSeaAttribute[];
}

export interface OpenSeaAttribute {
  trait_type: string;
  value: string;
}

export interface AeonBaseMetadata {
  realm: string;
  numberOfAeons: number;
  image: string;
  description: string;
}
