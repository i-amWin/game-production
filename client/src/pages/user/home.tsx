import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { Helmet } from 'react-helmet-async';

import ApplicationLogo from '@/components/application-logo';
import { For } from '@/components/flow/for';

import { IconNotification } from '@/assets/icons/icon-notification';

import { CONSTANTS } from '@/constants';

const carouselItems = [
  {
    id: 1,
    url: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: 2,
    url: 'https://picsum.photos/id/238/200/300',
  },
  {
    id: 3,
    url: 'https://picsum.photos/id/239/200/300',
  },
];

const Home = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, active: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  return (
    <>
      <Helmet>
        <title>{CONSTANTS.APP_NAME} | Home</title>
      </Helmet>

      <header className="flex justify-between pb-3">
        <ApplicationLogo className="h-8 fill-primary" />

        <div className="relative">
          <IconNotification className="h-8 text-primary" />

          <div className="absolute right-0 top-0 inline-block aspect-square w-2 animate-pulse-animation rounded-full bg-primary" />
        </div>
      </header>
      <main>
        <div className="overflow-hidden rounded-md" ref={emblaRef}>
          <div className="flex">
            <For items={carouselItems}>
              {(item) => (
                <div key={item.id} className="min-w-0 flex-[0_0_100%]">
                  <img
                    src={item.url}
                    alt={`Slide ${item.id}`}
                    className="aspect-video w-full bg-red-400 object-contain"
                  />
                </div>
              )}
            </For>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
