import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const property = {
  id: 1,
  title: 'Роскошный отель у моря',
  location: 'Сочи, Россия',
  price: 8500,
  rating: 4.9,
  reviews: 234,
  type: 'Отель',
  description: 'Насладитесь незабываемым отдыхом в нашем роскошном отеле с видом на Черное море. Современные номера, собственный пляж, спа-центр мирового класса и изысканная кухня - все для вашего комфорта.',
  images: [
    'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/8c87f30e-7171-4b89-af74-73f46bc91d66.jpg',
    'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/799caa1d-a1f7-44a6-ad37-f414db005013.jpg',
    'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/e6f19bde-5bc9-43c0-a4e8-27865bab21a7.jpg',
    'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/1dbbdbb6-7b9d-4672-bce3-efc143d5a624.jpg',
    'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/8c87f30e-7171-4b89-af74-73f46bc91d66.jpg',
  ],
  amenities: [
    { icon: 'Wifi', name: 'Wi-Fi' },
    { icon: 'Waves', name: 'Бассейн' },
    { icon: 'Car', name: 'Парковка' },
    { icon: 'UtensilsCrossed', name: 'Ресторан' },
    { icon: 'Dumbbell', name: 'Фитнес' },
    { icon: 'Sparkles', name: 'Спа' },
    { icon: 'Wind', name: 'Кондиционер' },
    { icon: 'Tv', name: 'ТВ' },
  ],
  host: {
    name: 'Елена Смирнова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    joinedDate: 'Май 2020',
    properties: 12
  }
};

const reviews = [
  {
    id: 1,
    author: 'Александр Петров',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    rating: 5,
    date: '15 декабря 2024',
    text: 'Потрясающий отель! Невероятный вид на море, отличный сервис и вкусная еда. Обязательно вернемся снова.',
    helpful: 24
  },
  {
    id: 2,
    author: 'Мария Иванова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    rating: 5,
    date: '8 декабря 2024',
    text: 'Идеальное место для романтического отдыха. Спа-процедуры на высшем уровне, а закаты с балкона просто волшебные!',
    helpful: 18
  },
  {
    id: 3,
    author: 'Дмитрий Соколов',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
    rating: 4,
    date: '2 декабря 2024',
    text: 'Отличный отель для семейного отдыха. Детям очень понравился бассейн. Единственный минус - иногда шумно вечером.',
    helpful: 12
  },
  {
    id: 4,
    author: 'Ольга Новикова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga',
    rating: 5,
    date: '28 ноября 2024',
    text: 'Все на высшем уровне! Персонал очень внимательный, номера чистые и уютные. Завтраки разнообразные и вкусные.',
    helpful: 31
  },
  {
    id: 5,
    author: 'Сергей Волков',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey',
    rating: 5,
    date: '20 ноября 2024',
    text: 'Лучший отель в Сочи! Собственный пляж, современные номера, отличная инфраструктура. Рекомендую всем!',
    helpful: 27
  }
];

const PropertyDetail = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const applyPromoCode = () => {
    const promoCodes: { [key: string]: number } = {
      'SOCHI25': 25,
      'NY2024': 40,
      'WINTER20': 20,
      'FIRSTBOOK': 15
    };
    
    const discountPercent = promoCodes[promoCode.toUpperCase()];
    if (discountPercent) {
      setDiscount(discountPercent);
      alert(`Промокод применен! Скидка ${discountPercent}%`);
    } else {
      alert('Неверный промокод');
      setDiscount(0);
    }
  };

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const basePrice = nights * property.price;
    const discountAmount = basePrice * (discount / 100);
    return basePrice - discountAmount;
  };

  const handleBooking = () => {
    setBookingOpen(false);
    alert('Бронирование успешно оформлено! Мы отправили подтверждение на вашу почту.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="gap-2 hover:bg-purple-100"
            >
              <Icon name="ArrowLeft" size={20} />
              Назад к каталогу
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
                onClick={() => setIsFavorite(!isFavorite)}
                className="hover:bg-purple-100"
              >
                <Icon 
                  name="Heart" 
                  size={20}
                  className={isFavorite ? 'fill-red-500 text-red-500' : ''}
                />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-purple-100">
                <Icon name="Share2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Title & Rating */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{property.rating}</span>
                  <span>({property.reviews} отзывов)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={18} />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>
            <Badge className="gradient-primary text-white text-lg px-4 py-2">
              {property.type}
            </Badge>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8 animate-scale-in">
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl h-[500px] group">
              <img 
                src={property.images[selectedImage]} 
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                  disabled={selectedImage === 0}
                  className="bg-white/90 backdrop-blur-sm hover:bg-white"
                >
                  <Icon name="ChevronLeft" size={20} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setSelectedImage(Math.min(property.images.length - 1, selectedImage + 1))}
                  disabled={selectedImage === property.images.length - 1}
                  className="bg-white/90 backdrop-blur-sm hover:bg-white"
                >
                  <Icon name="ChevronRight" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <div 
                key={index}
                onClick={() => setSelectedImage(index + 1)}
                className={`relative overflow-hidden rounded-xl h-[118px] cursor-pointer transition-all ${
                  selectedImage === index + 1 ? 'ring-4 ring-purple-500' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img 
                  src={image} 
                  alt={`View ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="shadow-lg border-purple-100 animate-slide-in">
              <CardHeader>
                <CardTitle className="text-2xl">Описание</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-lg leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="shadow-lg border-purple-100 animate-slide-in">
              <CardHeader>
                <CardTitle className="text-2xl">Удобства</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div 
                      key={index}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl gradient-card hover:shadow-md transition-shadow"
                    >
                      <Icon name={amenity.icon as any} size={28} className="text-purple-600" />
                      <span className="text-sm font-medium text-center">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Host Info */}
            <Card className="shadow-lg border-purple-100 animate-slide-in">
              <CardHeader>
                <CardTitle className="text-2xl">Хозяин</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20 border-4 border-purple-200">
                    <AvatarImage src={property.host.avatar} />
                    <AvatarFallback>ЕС</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{property.host.name}</h3>
                    <p className="text-gray-600">На платформе с {property.host.joinedDate}</p>
                    <p className="text-sm text-gray-500">{property.host.properties} объектов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="shadow-lg border-purple-100 animate-slide-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Отзывы ({reviews.length})</CardTitle>
                  <div className="flex items-center gap-2">
                    <Icon name="Star" size={24} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{property.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id}>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{review.author}</h4>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.text}</p>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-purple-600">
                          <Icon name="ThumbsUp" size={16} className="mr-1" />
                          Полезно ({review.helpful})
                        </Button>
                      </div>
                    </div>
                    {review.id !== reviews[reviews.length - 1].id && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-2xl border-purple-100 animate-scale-in">
              <CardHeader>
                <div className="flex items-baseline gap-2">
                  <CardTitle className="text-3xl text-gradient">
                    {property.price.toLocaleString()} ₽
                  </CardTitle>
                  <span className="text-gray-600">/ ночь</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Дата заезда</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left border-purple-200">
                        <Icon name="Calendar" className="mr-2" size={18} />
                        {checkIn ? format(checkIn, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Дата выезда</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left border-purple-200">
                        <Icon name="Calendar" className="mr-2" size={18} />
                        {checkOut ? format(checkOut, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Количество гостей</Label>
                  <div className="flex items-center justify-between p-3 border rounded-lg border-purple-200">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="h-8 w-8"
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="font-semibold">{guests} гостей</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(guests + 1)}
                      className="h-8 w-8"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Промокод</Label>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Введите промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="border-purple-200"
                    />
                    <Button 
                      variant="outline"
                      onClick={applyPromoCode}
                      disabled={!promoCode}
                      className="whitespace-nowrap"
                    >
                      <Icon name="Tag" size={16} className="mr-1" />
                      Применить
                    </Button>
                  </div>
                  {discount > 0 && (
                    <div className="mt-2 p-2 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700 flex items-center gap-2">
                      <Icon name="Check" size={16} />
                      Скидка {discount}% применена
                    </div>
                  )}
                  <Button 
                    variant="link" 
                    className="mt-2 p-0 h-auto text-xs text-purple-600"
                    onClick={() => navigate('/notifications')}
                  >
                    Посмотреть доступные промокоды →
                  </Button>
                </div>

                {checkIn && checkOut && (
                  <div className="p-4 rounded-lg gradient-card space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        {property.price.toLocaleString()} ₽ × {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} ночей
                      </span>
                      <span className="font-semibold">
                        {(property.price * Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))).toLocaleString()} ₽
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-700">
                        <span>Скидка ({discount}%)</span>
                        <span className="font-semibold">
                          -{Math.round((property.price * Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))) * (discount / 100)).toLocaleString()} ₽
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Сервисный сбор</span>
                      <span className="font-semibold">{Math.round(calculateTotal() * 0.05).toLocaleString()} ₽</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Итого</span>
                      <span className="text-gradient">{Math.round(calculateTotal() * 1.05).toLocaleString()} ₽</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full gradient-primary text-white hover:opacity-90 h-12 text-lg"
                      disabled={!checkIn || !checkOut}
                    >
                      <Icon name="CreditCard" className="mr-2" size={20} />
                      Забронировать
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Оформление бронирования</DialogTitle>
                      <DialogDescription>
                        Выберите способ оплаты для завершения бронирования
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="p-4 rounded-lg gradient-card">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Сумма к оплате</span>
                          <span className="text-2xl font-bold text-gradient">
                            {Math.round(calculateTotal() * 1.05).toLocaleString()} ₽
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {checkIn && checkOut && `${Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} ночей • ${guests} гостей`}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold mb-3 block">Способ оплаты</Label>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                          <div className="flex items-center space-x-3 p-3 rounded-lg border border-purple-200 hover:bg-purple-50 cursor-pointer">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                              <Icon name="CreditCard" size={20} className="text-purple-600" />
                              <span>Банковская карта</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 rounded-lg border border-purple-200 hover:bg-purple-50 cursor-pointer">
                            <RadioGroupItem value="sbp" id="sbp" />
                            <Label htmlFor="sbp" className="flex items-center gap-2 cursor-pointer flex-1">
                              <Icon name="Smartphone" size={20} className="text-purple-600" />
                              <span>СБП</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-3 rounded-lg border border-purple-200 hover:bg-purple-50 cursor-pointer">
                            <RadioGroupItem value="later" id="later" />
                            <Label htmlFor="later" className="flex items-center gap-2 cursor-pointer flex-1">
                              <Icon name="Clock" size={20} className="text-purple-600" />
                              <span>Оплата при заселении</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setBookingOpen(false)}>
                        Отмена
                      </Button>
                      <Button 
                        onClick={handleBooking}
                        className="gradient-primary text-white hover:opacity-90"
                      >
                        <Icon name="Check" className="mr-2" size={18} />
                        Подтвердить
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;