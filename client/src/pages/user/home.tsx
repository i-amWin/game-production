import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { Helmet } from 'react-helmet-async';

import { For } from '@/components/flow/for';

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

export const Home = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, active: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  return (
    <>
      <Helmet>
        <title>{CONSTANTS.APP_NAME} | Home</title>
      </Helmet>
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
    </>
  );
};
