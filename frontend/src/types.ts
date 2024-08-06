
// Define the structure of an NFT object based on OpenSea
export interface NFT {
    id: string;
    name: string;
    description: string;
    image_url: string;
    //[key: string]: any; // To allow additional properties if necessary
}

export interface CartItem {
    id: number;
    session_id: string;
    item_id: string;
    item_name: string;
    item_description: string;
    item_image_url: string;
    created_at: Date;
    updated_at: Date;
    //[key: string]: any; // To allow additional properties if necessary
}
