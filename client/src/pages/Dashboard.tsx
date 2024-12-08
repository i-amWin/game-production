import { For } from '@/Components/For';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

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

export default function Dashboard() {
  const [emblaRef] = useEmblaCarousel({ loop: true, active: true }, [
    Autoplay({ delay: 4000 }),
  ]);

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
      className="px-4"
    >
      <Head title="Dashboard" />

      {/* <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">You're logged in!</div>
          </div>
        </div>
      </div> */}
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
    </AuthenticatedLayout>
  );
}
