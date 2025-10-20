import Image from 'next/image';

export default function Footer() {
  const footerSections = [
    {
      title: 'Featured',
      links: ['Air Force 1', 'Huarache', 'Air Max 90', 'Air Max 95']
    },
    {
      title: 'Shoes',
      links: ['All Shoes', 'Custom Shoes', 'Jordan Shoes', 'Running Shoes']
    },
    {
      title: 'Clothing',
      links: ['All Clothing', 'Modest Wear', 'Hoodies & Pullovers', 'Shirts & Tops']
    },
    {
      title: 'Kids\'',
      links: ['Infant & Toddler Shoes', 'Kids\' Shoes', 'Kids\' Jordan Shoes', 'Kids\' Basketball Shoes']
    }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-1">
            <Image src="/logo.svg" alt="Nike" width={60} height={22} className="brightness-0 invert" />
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-white text-[16px] font-medium">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white text-[16px] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6 text-gray-400 text-[14px]">
              <span> Croatia</span>
              <span>© 2025 Nike, Inc. All Rights Reserved</span>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Image src="/x.svg" alt="X" width={24} height={24} className="brightness-0 invert opacity-60 hover:opacity-100" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Image src="/facebook.svg" alt="Facebook" width={24} height={24} className="brightness-0 invert opacity-60 hover:opacity-100" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Image src="/instagram.svg" alt="Instagram" width={24} height={24} className="brightness-0 invert opacity-60 hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 mt-6">
            {['Guides', 'Terms of Sale', 'Terms of Use', 'Nike Privacy Policy'].map((link) => (
              <a key={link} href="#" className="text-gray-400 hover:text-white text-[14px] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
