import { useState } from 'react';


function useShortenedAddress(fullAddress: string | '') {
  const [shortenedAddress, setShortenedAddress] = useState('');

  const shortenAddress = (address: string) => {
    if (address.length !== 42 || !address.startsWith('0x')) {
      throw new Error('Invalid Ethereum address');
    }

    const firstFive = address.slice(0, 6);
    const lastThree = address.slice(-3);

    return `${firstFive}...${lastThree}`;
  };

  const updateShortenedAddress = () => {
    try {
      const shortened = shortenAddress(fullAddress);
      setShortenedAddress(shortened);
    } catch (error: any) {
      console.error('Error shortening address:', error?.message);
    }
  };

  return { shortenedAddress, updateShortenedAddress };
}

export default useShortenedAddress;
