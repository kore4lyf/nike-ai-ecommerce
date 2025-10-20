import Image from 'next/image';

interface CardProps {
  title: string;
  category: string;
  price: string;
  image: string;
  badge?: string;
  badgeType?: 'bestseller' | 'discount' | 'sustainable';
  className?: string;
}

export default function Card({ 
  title, 
  category, 
  price, 
  image, 
  badge,
  badgeType = 'bestseller',
  className = '' 
}: CardProps) {
  const getBadgeStyles = () => {
    switch (badgeType) {
      case 'discount':
        return 'bg-green text-white';
      case 'sustainable':
        return 'bg-green text-white';
      default:
        return 'bg-red text-white';
    }
  };

  return (
    <article className={`bg-light-200 overflow-hidden group cursor-pointer rounded-lg ${className}`}>
      <div className="relative bg-light-200 overflow-hidden aspect-square">
        {badge && (
          <div className="absolute top-6 left-6 z-10">
            <span className={`${getBadgeStyles()} px-4 py-2 text-[16px] font-medium`}>
              {badge}
            </span>
          </div>
        )}
        <a href="#" className="block h-full">
          <Image
            src={image}
            alt={`${title} ${category}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </a>
      </div>
      
      <div className="bg-light-200 text-white p-6 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-gray-900 text-[24px] font-medium leading-tight flex-1 pr-4">
            {title}
          </h3>
          <p className="text-gray-900 text-[24px] font-medium">
            {price}
          </p>
        </div>
        <p className="text-gray-900 text-[16px]">
          {category}
        </p>
      </div>
    </article>
  );
}
