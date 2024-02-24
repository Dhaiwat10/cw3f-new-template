import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useReadContract } from 'wagmi'

import abi from '../abi.json';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const CONTRACT_ADDRESS = '0xcfCE58eDD09956eA2460F830feF5b82f0b5ce4ef';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  const result = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: 'greet',
  });
  console.log({
    result,
    data: result.data,
  })
  const greeting = (result.data as string) || 'Loading';

  // This is to get around the infamous 'Hydration failed' error. See: https://codingwithmanny.medium.com/understanding-hydration-errors-in-nextjs-13-with-a-web3-wallet-connection-8155c340fbd5
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <main className='py-20 px-32'>
      <h1 className='text-3xl font-bold'>🪄 create-web3-frontend</h1>
      <div className='mt-4'>
        <ConnectButton />
      </div>

      <hr className='mt-8 border border-slate-200' />

      <div className='mt-8'>
        <p>
          Just fetched the greeting: <b>{greeting}</b> from{' '}
          <Link
            href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
            className='underline'
          >
            {CONTRACT_ADDRESS}
          </Link>
        </p>

        <p className='mt-4'>
          This project has been bootstrapped with Next.js, TailwindCSS, wagmi,
          and Rainbowkit.
        </p>

        <p className='mt-4'>
          Refer the{' '}
          <Link className='underline' href='https://wagmi.sh'>
            wagmi docs
          </Link>{' '}
          to learn how to use wagmi to read and write information from the
          blockchain.
        </p>

        <p className='mt-4'>
          Start editing <code>src/pages/index.tsx</code> to get started!
        </p>
      </div>

      <hr className='mt-8 border border-slate-200' />

      <div className='mt-8 flex gap-6'>
        <Link
          className='underline'
          href='https://github.com/Dhaiwat10/create-web3-frontend'
        >
          Star this repo on GitHub ⭐️
        </Link>

        <Link className='underline' href='https://twitter/dhaiwat10'>
          Follow me on Twitter 🐦
        </Link>
      </div>
    </main>
  );
}
