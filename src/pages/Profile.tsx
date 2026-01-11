import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const userProfile = {
  name: 'Иван Петров',
  email: 'ivan.petrov@example.com',
  phone: '+7 (999) 123-45-67',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
  memberSince: new Date(2023, 5, 15),
  verified: true,
};

const bookings = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: 'Роскошный отель у моря',
    location: 'Сочи, Россия',
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/8c87f30e-7171-4b89-af74-73f46bc91d66.jpg',
    checkIn: new Date(2024, 0, 20),
    checkOut: new Date(2024, 0, 25),
    guests: 2,
    totalPrice: 51000,
    status: 'upcoming',
    bookingDate: new Date(2024, 0, 5)
  },
  {
    id: 2,
    propertyId: 3,
    propertyTitle: 'Апартаменты в центре города',
    location: 'Москва, Россия',
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/860119fa-6479-40a0-a880-cb04baff5b33.jpg',
    checkIn: new Date(2023, 11, 10),
    checkOut: new Date(2023, 11, 15),
    guests: 3,
    totalPrice: 40800,
    status: 'completed',
    bookingDate: new Date(2023, 10, 25)
  },
  {
    id: 3,
    propertyId: 2,
    propertyTitle: 'Уютный домик в горах',
    location: 'Красная Поляна',
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/852c110e-1960-436b-85c8-0334e2c7b3ec.jpg',
    checkIn: new Date(2023, 9, 5),
    checkOut: new Date(2023, 9, 10),
    guests: 4,
    totalPrice: 31200,
    status: 'completed',
    bookingDate: new Date(2023, 8, 20)
  },
  {
    id: 4,
    propertyId: 4,
    propertyTitle: 'Пляжный курорт премиум',
    location: 'Анапа, Россия',
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/8c87f30e-7171-4b89-af74-73f46bc91d66.jpg',
    checkIn: new Date(2023, 7, 15),
    checkOut: new Date(2023, 7, 22),
    guests: 2,
    totalPrice: 79800,
    status: 'completed',
    bookingDate: new Date(2023, 6, 30)
  },
  {
    id: 5,
    propertyId: 1,
    propertyTitle: 'Роскошный отель у моря',
    location: 'Сочи, Россия',
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/8c87f30e-7171-4b89-af74-73f46bc91d66.jpg',
    checkIn: new Date(2024, 1, 14),
    checkOut: new Date(2024, 1, 17),
    guests: 2,
    totalPrice: 30600,
    status: 'cancelled',
    bookingDate: new Date(2024, 0, 20)
  }
];

const favorites = [
  {
    id: 1,
    title: 'Роскошный отель у моря',
    location: 'Сочи, Россия',
    price: 8500,
    rating: 4.9,
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/8c87f30e-7171-4b89-af74-73f46bc91d66.jpg',
  },
  {
    id: 2,
    title: 'Уютный домик в горах',
    location: 'Красная Поляна',
    price: 5200,
    rating: 4.8,
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/852c110e-1960-436b-85c8-0334e2c7b3ec.jpg',
  },
  {
    id: 6,
    title: 'Студия бизнес-класса',
    location: 'Санкт-Петербург',
    price: 5800,
    rating: 4.8,
    image: 'https://cdn.poehali.dev/projects/13a6aae3-ecd5-4976-83ac-97eedbe9a725/files/860119fa-6479-40a0-a880-cb04baff5b33.jpg',
  }
];

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { label: 'Предстоит', className: 'bg-blue-100 text-blue-700' },
      completed: { label: 'Завершено', className: 'bg-green-100 text-green-700' },
      cancelled: { label: 'Отменено', className: 'bg-red-100 text-red-700' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

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
              На главную
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Icon name="Home" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gradient">BooKing</h1>
            </div>

            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="shadow-2xl border-purple-100 mb-8 animate-fade-in">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-32 h-32 border-4 border-purple-200">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="text-3xl">{userProfile.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                  {userProfile.verified && (
                    <Badge className="gradient-primary text-white">
                      <Icon name="BadgeCheck" size={16} className="mr-1" />
                      Подтвержден
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{userProfile.email}</p>
                <p className="text-gray-600 mb-4">{userProfile.phone}</p>
                <p className="text-sm text-gray-500">
                  Участник с {format(userProfile.memberSince, 'MMMM yyyy', { locale: ru })}
                </p>
              </div>

              <Button 
                variant={isEditing ? "default" : "outline"}
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? "gradient-primary text-white" : ""}
              >
                <Icon name={isEditing ? "Check" : "Settings"} size={18} className="mr-2" />
                {isEditing ? 'Сохранить' : 'Редактировать'}
              </Button>
            </div>

            {isEditing && (
              <div className="mt-8 pt-8 border-t border-purple-100 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" defaultValue={userProfile.name} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={userProfile.email} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" defaultValue={userProfile.phone} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="password">Новый пароль</Label>
                  <Input id="password" type="password" placeholder="••••••••" className="mt-2" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-purple-100 hover:shadow-xl transition-shadow animate-scale-in">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3">
                <Icon name="Calendar" className="text-white" size={24} />
              </div>
              <div className="text-3xl font-bold text-gradient mb-1">{bookings.length}</div>
              <p className="text-sm text-gray-600">Всего бронирований</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-purple-100 hover:shadow-xl transition-shadow animate-scale-in">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <Icon name="Clock" className="text-blue-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{upcomingBookings.length}</div>
              <p className="text-sm text-gray-600">Предстоящие</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-purple-100 hover:shadow-xl transition-shadow animate-scale-in">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <Icon name="CheckCircle" className="text-green-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{pastBookings.length}</div>
              <p className="text-sm text-gray-600">Завершенные</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-purple-100 hover:shadow-xl transition-shadow animate-scale-in">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-3">
                <Icon name="Heart" className="text-pink-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-pink-600 mb-1">{favorites.length}</div>
              <p className="text-sm text-gray-600">В избранном</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="bookings" className="animate-slide-in">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="bookings" className="text-lg">
              <Icon name="Calendar" size={18} className="mr-2" />
              Бронирования
            </TabsTrigger>
            <TabsTrigger value="favorites" className="text-lg">
              <Icon name="Heart" size={18} className="mr-2" />
              Избранное
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <div className="space-y-6">
              {upcomingBookings.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Предстоящие поездки</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {upcomingBookings.map((booking) => (
                      <Card 
                        key={booking.id}
                        className="shadow-lg border-purple-100 hover:shadow-xl transition-all cursor-pointer"
                        onClick={() => navigate(`/property/${booking.propertyId}`)}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-64 h-48 md:h-auto">
                              <img 
                                src={booking.image} 
                                alt={booking.propertyTitle}
                                className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="text-xl font-bold mb-1">{booking.propertyTitle}</h4>
                                  <p className="text-gray-600 flex items-center gap-1">
                                    <Icon name="MapPin" size={16} />
                                    {booking.location}
                                  </p>
                                </div>
                                {getStatusBadge(booking.status)}
                              </div>
                              
                              <Separator className="my-4" />
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-500 mb-1">Заезд</p>
                                  <p className="font-semibold">
                                    {format(booking.checkIn, 'dd MMM yyyy', { locale: ru })}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">Выезд</p>
                                  <p className="font-semibold">
                                    {format(booking.checkOut, 'dd MMM yyyy', { locale: ru })}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">Гости</p>
                                  <p className="font-semibold">{booking.guests} человек</p>
                                </div>
                                <div>
                                  <p className="text-gray-500 mb-1">Сумма</p>
                                  <p className="font-semibold text-gradient">
                                    {booking.totalPrice.toLocaleString()} ₽
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-3 mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    alert('Детали бронирования отправлены на почту');
                                  }}
                                >
                                  <Icon name="FileText" size={16} className="mr-2" />
                                  Детали
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm('Вы уверены, что хотите отменить бронирование?')) {
                                      alert('Бронирование отменено');
                                    }
                                  }}
                                >
                                  <Icon name="X" size={16} className="mr-2" />
                                  Отменить
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {pastBookings.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4">История поездок</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {pastBookings.map((booking) => (
                      <Card 
                        key={booking.id}
                        className="shadow-lg border-purple-100 hover:shadow-xl transition-all cursor-pointer opacity-90"
                        onClick={() => navigate(`/property/${booking.propertyId}`)}
                      >
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-48 h-32 md:h-auto">
                              <img 
                                src={booking.image} 
                                alt={booking.propertyTitle}
                                className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-lg font-bold mb-1">{booking.propertyTitle}</h4>
                                  <p className="text-sm text-gray-600">{booking.location}</p>
                                </div>
                                {getStatusBadge(booking.status)}
                              </div>
                              
                              <div className="flex flex-wrap gap-4 text-xs text-gray-600 mt-3">
                                <span>
                                  {format(booking.checkIn, 'dd MMM', { locale: ru })} - {format(booking.checkOut, 'dd MMM yyyy', { locale: ru })}
                                </span>
                                <span>•</span>
                                <span>{booking.guests} гостей</span>
                                <span>•</span>
                                <span className="font-semibold">{booking.totalPrice.toLocaleString()} ₽</span>
                              </div>

                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="mt-3"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  alert('Форма отзыва открыта');
                                }}
                              >
                                <Icon name="Star" size={16} className="mr-2" />
                                Оставить отзыв
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <Card className="shadow-lg border-purple-100">
              <CardHeader>
                <CardTitle className="text-2xl">Избранное</CardTitle>
                <CardDescription>Объекты, которые вам понравились</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favorites.map((property) => (
                    <Card 
                      key={property.id}
                      className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert('Удалено из избранного');
                          }}
                          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white"
                        >
                          <Icon name="Heart" size={18} className="fill-red-500 text-red-500" />
                        </button>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{property.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Icon name="MapPin" size={14} />
                          {property.location}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{property.rating}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gradient">
                              {property.price.toLocaleString()} ₽
                            </div>
                            <div className="text-xs text-gray-500">за ночь</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
