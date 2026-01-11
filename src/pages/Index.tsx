import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const properties = [
  {
    id: 1,
    title: 'Роскошный отель у моря',
    location: 'Сочи, Россия',
    price: 8500,
    rating: 4.9,
    reviews: 234,
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/8c87f30e-7171-4b89-af74-73f46bc91d66.jpg',
    type: 'Отель',
    amenities: ['Wi-Fi', 'Бассейн', 'Парковка', 'Ресторан']
  },
  {
    id: 2,
    title: 'Уютный домик в горах',
    location: 'Красная Поляна',
    price: 5200,
    rating: 4.8,
    reviews: 156,
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/852c110e-1960-436b-85c8-0334e2c7b3ec.jpg',
    type: 'Дом',
    amenities: ['Wi-Fi', 'Камин', 'Парковка', 'Кухня']
  },
  {
    id: 3,
    title: 'Апартаменты в центре города',
    location: 'Москва, Россия',
    price: 6800,
    rating: 4.7,
    reviews: 189,
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/860119fa-6479-40a0-a880-cb04baff5b33.jpg',
    type: 'Апартаменты',
    amenities: ['Wi-Fi', 'Кухня', 'Парковка', 'Лифт']
  },
  {
    id: 4,
    title: 'Пляжный курорт премиум',
    location: 'Анапа, Россия',
    price: 9500,
    rating: 5.0,
    reviews: 312,
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/8c87f30e-7171-4b89-af74-73f46bc91d66.jpg',
    type: 'Отель',
    amenities: ['Wi-Fi', 'Бассейн', 'Спа', 'Ресторан']
  },
  {
    id: 5,
    title: 'Коттедж у озера',
    location: 'Карелия, Россия',
    price: 4200,
    rating: 4.6,
    reviews: 98,
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/852c110e-1960-436b-85c8-0334e2c7b3ec.jpg',
    type: 'Дом',
    amenities: ['Wi-Fi', 'Баня', 'Парковка', 'Камин']
  },
  {
    id: 6,
    title: 'Студия бизнес-класса',
    location: 'Санкт-Петербург',
    price: 5800,
    rating: 4.8,
    reviews: 167,
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/860119fa-6479-40a0-a880-cb04baff5b33.jpg',
    type: 'Апартаменты',
    amenities: ['Wi-Fi', 'Кухня', 'Консьерж', 'Лифт']
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [favorites, setFavorites] = useState<number[]>([]);

  const propertyTypes = ['Отель', 'Дом', 'Апартаменты'];
  const amenities = ['Wi-Fi', 'Бассейн', 'Парковка', 'Ресторан', 'Камин', 'Кухня', 'Спа', 'Баня'];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(property.type);
    const matchesAmenities = selectedAmenities.length === 0 || 
                            selectedAmenities.every(amenity => property.amenities.includes(amenity));
    
    return matchesSearch && matchesPrice && matchesType && matchesAmenities;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Icon name="Home" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gradient">BooKing</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Главная</a>
              <a href="#catalog" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Каталог</a>
              <a href="#favorites" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Избранное</a>
              <a href="#reviews" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Отзывы</a>
              <a href="#contacts" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Контакты</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative hover:bg-purple-100">
                <Icon name="Heart" size={20} />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-purple-600 to-pink-600">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-purple-100">
                <Icon name="User" size={20} />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden hover:bg-purple-100">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Меню</SheetTitle>
                    <SheetDescription>Навигация по сайту</SheetDescription>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-6">
                    <a href="#" className="text-lg text-gray-700 hover:text-purple-600 transition-colors">Главная</a>
                    <a href="#catalog" className="text-lg text-gray-700 hover:text-purple-600 transition-colors">Каталог</a>
                    <a href="#favorites" className="text-lg text-gray-700 hover:text-purple-600 transition-colors">Избранное</a>
                    <a href="#reviews" className="text-lg text-gray-700 hover:text-purple-600 transition-colors">Отзывы</a>
                    <a href="#contacts" className="text-lg text-gray-700 hover:text-purple-600 transition-colors">Контакты</a>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
            Найди идеальное место для отдыха
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12">
            Более 10,000 отелей, домов и апартаментов по всему миру
          </p>

          {/* Search Box */}
          <Card className="shadow-2xl border-0 gradient-card backdrop-blur-sm animate-scale-in">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input 
                    placeholder="Куда вы хотите поехать?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 text-lg border-purple-200 focus:border-purple-400"
                  />
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-14 justify-start text-left font-normal border-purple-200">
                      <Icon name="Calendar" className="mr-2" size={20} />
                      {checkIn ? format(checkIn, 'dd MMM', { locale: ru }) : 'Заезд'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-14 justify-start text-left font-normal border-purple-200">
                      <Icon name="Calendar" className="mr-2" size={20} />
                      {checkOut ? format(checkOut, 'dd MMM', { locale: ru }) : 'Выезд'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} />
                  </PopoverContent>
                </Popover>
              </div>

              <Button className="w-full md:w-auto mt-4 h-14 px-12 text-lg gradient-primary text-white hover:opacity-90 transition-opacity">
                <Icon name="Search" className="mr-2" size={20} />
                Найти жильё
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Filters & Catalog */}
      <section id="catalog" className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg border-purple-100 animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={20} />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Цена за ночь: {priceRange[0]} - {priceRange[1]} ₽
                  </label>
                  <Slider 
                    value={priceRange} 
                    onValueChange={setPriceRange}
                    max={15000}
                    step={500}
                    className="mb-2"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Тип жилья</label>
                  <div className="space-y-2">
                    {propertyTypes.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTypes([...selectedTypes, type]);
                            } else {
                              setSelectedTypes(selectedTypes.filter(t => t !== type));
                            }
                          }}
                        />
                        <label htmlFor={type} className="text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Удобства</label>
                  <div className="space-y-2">
                    {amenities.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAmenities([...selectedAmenities, amenity]);
                            } else {
                              setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                            }
                          }}
                        />
                        <label htmlFor={amenity} className="text-sm cursor-pointer">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, 15000]);
                    setSelectedTypes([]);
                    setSelectedAmenities([]);
                  }}
                >
                  Сбросить фильтры
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Property Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                Найдено: {filteredProperties.length} вариантов
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map((property, index) => (
                <Card 
                  key={property.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-purple-100 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden h-56">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(property.id);
                      }}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                    >
                      <Icon 
                        name="Heart" 
                        size={20} 
                        className={favorites.includes(property.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                      />
                    </button>
                    <Badge className="absolute top-4 left-4 gradient-primary text-white">
                      {property.type}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{property.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-base">
                      <Icon name="MapPin" size={16} />
                      {property.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.amenities.slice(0, 4).map(amenity => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{property.rating}</span>
                        <span className="text-sm text-gray-500">({property.reviews})</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gradient">
                          {property.price.toLocaleString()} ₽
                        </div>
                        <div className="text-sm text-gray-500">за ночь</div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full gradient-primary text-white hover:opacity-90">
                      Забронировать
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">BooKing</h4>
              <p className="text-purple-200">Находим идеальное место для вашего отдыха</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Компания</h5>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Пресса</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#contacts" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Социальные сети</h5>
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-200">
            <p>© 2024 BooKing. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
