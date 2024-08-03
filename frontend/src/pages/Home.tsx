import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NFTCard from '../components/NFTCard';
import { NFT } from '../types';

const Home: React.FC = () => {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const response = await axios.get('/api/nfts');
                setNfts(response.data);
            } catch (error) {
                setError('Error fetching NFTs');
            } finally {
                setLoading(false);
            }
        };

        fetchNFTs();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="nft-gallery">
            {nfts.map((nft) => (
                <NFTCard key={nft.id} nft={nft} />
            ))}
        </div>
    );
};

export default Home;
