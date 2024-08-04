
// Define the structure of an NFT object based on OpenSea
export interface NFT {
    id: string;
    name: string;
    description: string;
    image_url: string;
    //[key: string]: any; // To allow additional properties if necessary
}
