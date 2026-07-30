import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for featured categories
const categories = [
  { name: 'RAM', image: '/placeholder-ram.jpg' },
  { name: 'Mechanical Keyboards', image: '/placeholder-keyboard.jpg' },
  { name: 'Gaming Mouse', image: '/placeholder-mouse.jpg' },
  { name: 'Wireless Mouse', image: '/placeholder-wireless-mouse.jpg' },
  { name: 'SSD', image: '/placeholder-ssd.jpg' },
  { name: 'Accessories', image: '/placeholder-accessories.jpg' },
];

// Mock data for featured products
const products = [
  {
    name: 'Kingston Fury Beast DDR5 32GB',
    brand: 'Kingston',
    price: 129.99,
    discount: 10,
    rating: 4.8,
    image: '/placeholder-ram.jpg',
  },
  {
    name: 'Logitech G Pro X Keyboard',
    brand: 'Logitech',
    price: 149.99,
    discount: 15,
    rating: 4.7,
    image: '/placeholder-keyboard.jpg',
  },
  {
    name: 'Razer DeathAdder V3',
    brand: 'Razer',
    price: 69.99,
    discount: 20,
    rating: 4.9,
    image: '/placeholder-mouse.jpg',
  },
  {
    name: 'Samsung 990 Pro SSD 1TB',
    brand: 'Samsung',
    price: 109.99,
    discount: 5,
    rating: 4.6,
    image: '/placeholder-ssd.jpg',
  },
];

// Mock data for popular brands
const brands = [
  { name: 'Logitech', logo: '/placeholder-logitech.png' },
  { name: 'Corsair', logo: '/placeholder-corsair.png' },
  { name: 'Kingston', logo: '/placeholder-kingston.png' },
  { name: 'HyperX', logo: '/placeholder-hyperx.png' },
  { name: 'Razer', logo: '/placeholder-razer.png' },
  { name: 'SteelSeries', logo: '/placeholder-steelseries.png' },
  { name: 'ASUS', logo: '/placeholder-asus.png' },
  { name: 'MSI', logo: '/placeholder-msi.png' },
  { name: 'Samsung', logo: '/placeholder-samsung.png' },
  { name: 'Crucial', logo: '/placeholder-crucial.png' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <Image
          src="/placeholder-hero.jpg"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Upgrade Your Gaming & Productivity Setup</h1>
            <p className="text-xl mb-8">Premium RAM, Mechanical Keyboards, Gaming Mouse & Accessories at unbeatable prices.</p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Explore Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Categories</h2>
            <Link href="/categories" className="flex items-center text-primary hover:underline">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link href={`/category/${category.name.toLowerCase().replace(' ', '-')}`} key={category.name}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative h-32 w-full mb-4">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-center font-semibold">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products" className="flex items-center text-primary hover:underline">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative h-48 w-full mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                    {product.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                    )}
                    {product.discount > 0 && (
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">-{product.discount}%</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">({product.rating})</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      Wishlist
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
            {brands.map((brand) => (
              <div key={brand.name} className="flex justify-center">
                <div className="relative h-16 w-32">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-8">Get the latest updates on new products, discounts, and more!</p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-light py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About TechHub Store</h3>
              <p className="text-muted-foreground text-sm">
                Your one-stop shop for premium computer accessories, gaming peripherals, and productivity tools.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/" className="hover:text-primary">Home</Link></li>
                <li><Link href="/products" className="hover:text-primary">Products</Link></li>
                <li><Link href="/categories" className="hover:text-primary">Categories</Link></li>
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Policies</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/shipping" className="hover:text-primary">Shipping Policy</Link></li>
                <li><Link href="/returns" className="hover:text-primary">Return Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@techhubstore.com</li>
                <li>Phone: +1 (123) 456-7890</li>
                <li>Address: 123 Tech Street, Silicon Valley, CA 94025</li>
              </ul>
              <div className="flex gap-4 mt-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TechHub Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}