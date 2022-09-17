
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import LogoImg from './assets/logo-nlw-esports.svg';

import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { GameBanner } from './components/GameBanner';

import { api } from './utils/api';

import './styles/main.css'


interface GameProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: { ads: number }
}

function App() {

  const [games, setGames] = useState<GameProps[]>();
  useEffect(() => {
    const responseData = async () => {
      const response = await api.get('/games');
      return setGames(response.data)
    }
    responseData()

    // fetch('http://localhost:3333/games')
    //   .then(response => response.json())
    //   .then(data => setGames(data))

  }, []);


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center'>
      <img className='w-[200px] h-[140px]' src={LogoImg} alt="logo" />
      <h1 className='text-6xl text-white font-black mt-2'>
        Seu
        <span className='text-transparent bg-nlw-gradient bg-clip-text'>
          duo
        </span> está aqui.
      </h1>
      <div className='grid grid-cols-6 grid-rows-1 gap-6 mt-10 overflow-y-hidden'>
        {games?.map(data => {
          return (
            <GameBanner
              key={data.id}
              bannerUrl={data.bannerUrl}
              title={data.title}
              adsCount={data._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
