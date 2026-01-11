import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const notifications = [
  {
    id: 1,
    type: 'promo',
    title: 'Специальное предложение!',
    message: 'Скидка 25% на отели в Сочи до конца месяца. Используйте промокод SOCHI25',
    date: new Date(2024, 0, 10, 14, 30),
    read: false,
    icon: 'Percent',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    id: 2,
    type: 'booking',
    title: 'Бронирование подтверждено',
    message: 'Ваше бронирование "Роскошный отель у моря" успешно оплачено. Приятного отдыха!',
    date: new Date(2024, 0, 10, 12, 15),
    read: false,
    icon: 'CheckCircle',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    id: 3,
    type: 'promo',
    title: 'Новогодняя распродажа!',
    message: 'Забронируйте жилье на новогодние праздники со скидкой до 40%. Промокод: NY2024',
    date: new Date(2024, 0, 9, 10, 0),
    read: true,
    icon: 'Gift',
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  {
    id: 4,
    type: 'reminder',
    title: 'Напоминание о поездке',
    message: 'До вашей поездки в "Уютный домик в горах" осталось 3 дня. Не забудьте проверить документы!',
    date: new Date(2024, 0, 8, 18, 45),
    read: true,
    icon: 'Bell',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    id: 5,
    type: 'system',
    title: 'Обновление профиля',
    message: 'Ваш профиль успешно верифицирован. Теперь вы можете получать эксклюзивные предложения!',
    date: new Date(2024, 0, 7, 15, 20),
    read: true,
    icon: 'BadgeCheck',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  {
    id: 6,
    type: 'promo',
    title: 'Горящие предложения',
    message: 'Апартаменты в Москве от 3500₽/ночь! Успейте забронировать со скидкой 30%',
    date: new Date(2024, 0, 6, 9, 30),
    read: true,
    icon: 'Flame',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    id: 7,
    type: 'booking',
    title: 'Отзыв о поездке',
    message: 'Как вам понравилось в "Пляжный курорт премиум"? Поделитесь впечатлениями!',
    date: new Date(2024, 0, 5, 11, 0),
    read: true,
    icon: 'Star',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  }
];

const promoCodes = [
  {
    code: 'SOCHI25',
    discount: 25,
    description: 'Скидка 25% на отели в Сочи',
    validUntil: new Date(2024, 0, 31),
    active: true,
    category: 'Сочи'
  },
  {
    code: 'NY2024',
    discount: 40,
    description: 'Новогодняя распродажа',
    validUntil: new Date(2024, 0, 15),
    active: true,
    category: 'Все объекты'
  },
  {
    code: 'WINTER20',
    discount: 20,
    description: 'Зимний отдых со скидкой',
    validUntil: new Date(2024, 1, 28),
    active: true,
    category: 'Горнолыжные курорты'
  },
  {
    code: 'FIRSTBOOK',
    discount: 15,
    description: 'Скидка на первое бронирование',
    validUntil: new Date(2024, 11, 31),
    active: true,
    category: 'Все объекты'
  },
  {
    code: 'SUMMER2023',
    discount: 30,
    description: 'Летние каникулы',
    validUntil: new Date(2023, 7, 31),
    active: false,
    category: 'Все объекты'
  }
];

const Notifications = () => {
  const navigate = useNavigate();
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    promoNotifications: true,
    bookingNotifications: true,
    reminderNotifications: true
  });

  const unreadCount = notificationsList.filter(n => !n.read).length;
  const activePromoCodes = promoCodes.filter(p => p.active);

  const markAsRead = (id: number) => {
    setNotificationsList(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id));
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Промокод ${code} скопирован!`);
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
              Назад
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
        {/* Page Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Уведомления</h1>
              <p className="text-gray-600">Следите за новостями и специальными предложениями</p>
            </div>
            {unreadCount > 0 && (
              <Button 
                variant="outline"
                onClick={markAllAsRead}
                className="gap-2"
              >
                <Icon name="CheckCheck" size={18} />
                Прочитать все
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="animate-slide-in">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="all" className="gap-2">
              <Icon name="Bell" size={18} />
              Все
              {unreadCount > 0 && (
                <Badge className="ml-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-purple-600 to-pink-600">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="promo" className="gap-2">
              <Icon name="Percent" size={18} />
              Промокоды
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Icon name="Settings" size={18} />
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* All Notifications */}
          <TabsContent value="all">
            <div className="space-y-4">
              {notificationsList.map((notification) => (
                <Card 
                  key={notification.id}
                  className={`shadow-lg border-purple-100 hover:shadow-xl transition-all cursor-pointer ${
                    !notification.read ? 'bg-gradient-to-r from-purple-50 to-pink-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon name={notification.icon as any} size={24} className={notification.color} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">{notification.title}</h3>
                              {!notification.read && (
                                <div className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></div>
                              )}
                            </div>
                            <p className="text-gray-600">{notification.message}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Icon name="X" size={18} />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            {format(notification.date, 'dd MMMM, HH:mm', { locale: ru })}
                          </span>
                          {notification.type === 'promo' && (
                            <Badge variant="secondary" className="text-xs">
                              Акция
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {notificationsList.length === 0 && (
                <Card className="shadow-lg border-purple-100">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                      <Icon name="Bell" size={40} className="text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Нет уведомлений</h3>
                    <p className="text-gray-600">Все уведомления прочитаны</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Promo Codes */}
          <TabsContent value="promo">
            <div className="space-y-6">
              <Card className="shadow-lg border-purple-100 gradient-card">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="Sparkles" size={24} className="text-purple-600" />
                    Активные промокоды
                  </CardTitle>
                  <CardDescription>
                    Используйте эти коды для получения скидок при бронировании
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activePromoCodes.map((promo) => (
                  <Card 
                    key={promo.code}
                    className="shadow-lg border-purple-100 hover:shadow-2xl transition-all overflow-hidden"
                  >
                    <div className="h-2 gradient-primary"></div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-mono font-bold text-lg">
                              {promo.code}
                            </div>
                            <Badge className="bg-green-100 text-green-700">
                              -{promo.discount}%
                            </Badge>
                          </div>
                          <p className="text-gray-700 font-medium">{promo.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Icon name="Tag" size={16} />
                          <span>{promo.category}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Icon name="Calendar" size={16} />
                          <span>Действует до {format(promo.validUntil, 'dd MMMM yyyy', { locale: ru })}</span>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      <Button 
                        className="w-full gradient-primary text-white hover:opacity-90"
                        onClick={() => copyPromoCode(promo.code)}
                      >
                        <Icon name="Copy" size={18} className="mr-2" />
                        Скопировать код
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {promoCodes.filter(p => !p.active).length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4 text-gray-500">Истекшие промокоды</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {promoCodes.filter(p => !p.active).map((promo) => (
                      <Card 
                        key={promo.code}
                        className="shadow-lg border-gray-200 opacity-60"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-mono font-bold text-gray-500 mb-1">{promo.code}</div>
                              <p className="text-sm text-gray-500">{promo.description}</p>
                            </div>
                            <Badge variant="secondary" className="text-gray-500">
                              Истек
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card className="shadow-lg border-purple-100">
              <CardHeader>
                <CardTitle className="text-2xl">Настройки уведомлений</CardTitle>
                <CardDescription>
                  Управляйте типами уведомлений, которые вы хотите получать
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-base font-semibold">
                      Email уведомления
                    </Label>
                    <p className="text-sm text-gray-500">
                      Получайте уведомления на электронную почту
                    </p>
                  </div>
                  <Switch 
                    id="email"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, emailNotifications: checked})
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="push" className="text-base font-semibold">
                      Push-уведомления
                    </Label>
                    <p className="text-sm text-gray-500">
                      Получайте мгновенные уведомления в браузере
                    </p>
                  </div>
                  <Switch 
                    id="push"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, pushNotifications: checked})
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="promo" className="text-base font-semibold">
                      Акции и специальные предложения
                    </Label>
                    <p className="text-sm text-gray-500">
                      Узнавайте первыми о скидках и промокодах
                    </p>
                  </div>
                  <Switch 
                    id="promo"
                    checked={settings.promoNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, promoNotifications: checked})
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="booking" className="text-base font-semibold">
                      Уведомления о бронированиях
                    </Label>
                    <p className="text-sm text-gray-500">
                      Статус бронирований и подтверждения
                    </p>
                  </div>
                  <Switch 
                    id="booking"
                    checked={settings.bookingNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, bookingNotifications: checked})
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="reminder" className="text-base font-semibold">
                      Напоминания о поездках
                    </Label>
                    <p className="text-sm text-gray-500">
                      Напоминания перед предстоящими поездками
                    </p>
                  </div>
                  <Switch 
                    id="reminder"
                    checked={settings.reminderNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({...settings, reminderNotifications: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;
