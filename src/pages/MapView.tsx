import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

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
    coordinates: { lat: 43.585472, lng: 39.723098 },
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
    coordinates: { lat: 43.679889, lng: 40.261667 },
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
    coordinates: { lat: 55.751244, lng: 37.618423 },
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
    coordinates: { lat: 44.895042, lng: 37.316522 },
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
    coordinates: { lat: 61.784435, lng: 34.347424 },
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
    coordinates: { lat: 59.939095, lng: 30.315868 },
  },
];

const MapView = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 55.751244, lng: 37.618423 });
  const [zoom, setZoom] = useState(5);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePropertyClick = (propertyId: number) => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      setSelectedProperty(propertyId);
      setMapCenter(property.coordinates);
      setZoom(12);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/80 border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="gap-2 hover:bg-purple-100"
            >
              <Icon name="ArrowLeft" size={20} />
              К списку
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Icon name="Home" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gradient">BooKing</h1>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/profile')}
                className="hover:bg-purple-100"
              >
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              placeholder="Поиск по названию или городу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-purple-200 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar with properties list */}
        <div className="w-96 bg-white/80 backdrop-blur-sm border-r border-purple-100 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Объекты на карте</h2>
            <Badge className="gradient-primary text-white">
              {filteredProperties.length}
            </Badge>
          </div>

          {filteredProperties.map((property) => (
            <Card 
              key={property.id}
              className={`cursor-pointer hover:shadow-xl transition-all ${
                selectedProperty === property.id ? 'ring-2 ring-purple-500 shadow-xl' : ''
              }`}
              onClick={() => handlePropertyClick(property.id)}
            >
              <div className="relative h-40 overflow-hidden rounded-t-lg">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 gradient-primary text-white">
                  {property.type}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{property.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-sm">
                  <Icon name="MapPin" size={14} />
                  {property.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{property.rating}</span>
                    <span className="text-xs text-gray-500">({property.reviews})</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gradient">
                      {property.price.toLocaleString()} ₽
                    </div>
                    <div className="text-xs text-gray-500">за ночь</div>
                  </div>
                </div>
                <Button 
                  className="w-full mt-3 gradient-primary text-white hover:opacity-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/property/${property.id}`);
                  }}
                >
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          {/* Decorative Map Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
            {/* Map Grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>

            {/* Map Markers */}
            <div className="absolute inset-0">
              {filteredProperties.map((property, index) => {
                const top = 20 + (index * 15) % 60;
                const left = 20 + (index * 20) % 60;
                const isSelected = selectedProperty === property.id;

                return (
                  <div
                    key={property.id}
                    className={`absolute cursor-pointer transition-all duration-300 ${
                      isSelected ? 'z-20 scale-125' : 'z-10'
                    }`}
                    style={{ top: `${top}%`, left: `${left}%` }}
                    onClick={() => handlePropertyClick(property.id)}
                  >
                    {/* Marker Pin */}
                    <div className="relative">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center shadow-2xl
                        ${isSelected ? 'gradient-primary animate-pulse' : 'bg-white border-4 border-purple-500'}
                      `}>
                        <Icon 
                          name="MapPin" 
                          size={24} 
                          className={isSelected ? 'text-white' : 'text-purple-600'}
                        />
                      </div>
                      
                      {/* Price Tag */}
                      <div className={`
                        absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                        px-3 py-1 rounded-full shadow-lg font-bold text-sm
                        ${isSelected ? 'gradient-primary text-white' : 'bg-white text-purple-600'}
                      `}>
                        {property.price.toLocaleString()} ₽
                      </div>

                      {/* Info Card on Hover */}
                      {isSelected && (
                        <Card className="absolute top-14 left-1/2 -translate-x-1/2 w-64 shadow-2xl animate-scale-in z-30">
                          <div className="relative h-32 overflow-hidden rounded-t-lg">
                            <img 
                              src={property.image} 
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">{property.title}</CardTitle>
                            <CardDescription className="text-xs flex items-center gap-1">
                              <Icon name="MapPin" size={12} />
                              {property.location}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-semibold">{property.rating}</span>
                              </div>
                              <span className="text-sm font-bold text-gradient">
                                {property.price.toLocaleString()} ₽
                              </span>
                            </div>
                            <Button 
                              size="sm"
                              className="w-full gradient-primary text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/property/${property.id}`);
                              }}
                            >
                              Посмотреть
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button 
                size="icon" 
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                onClick={() => setZoom(Math.min(zoom + 1, 15))}
              >
                <Icon name="Plus" size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                onClick={() => setZoom(Math.max(zoom - 1, 3))}
              >
                <Icon name="Minus" size={20} />
              </Button>
              <Button 
                size="icon" 
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                onClick={() => {
                  setMapCenter({ lat: 55.751244, lng: 37.618423 });
                  setZoom(5);
                  setSelectedProperty(null);
                }}
              >
                <Icon name="Maximize2" size={20} />
              </Button>
            </div>

            {/* Legend */}
            <Card className="absolute bottom-4 left-4 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <span className="text-sm">Доступно</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full gradient-primary"></div>
                    <span className="text-sm">Выбрано</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zoom Level Indicator */}
            <div className="absolute bottom-4 right-4">
              <Badge className="bg-white/90 backdrop-blur-sm text-gray-700">
                Масштаб: {zoom}x
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
