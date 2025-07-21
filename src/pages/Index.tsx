import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface FlowerProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  freshness: 'high' | 'medium' | 'low';
  expiryDays: number;
  description: string;
}

const products: FlowerProduct[] = [
  {
    id: 1,
    name: 'Белые розы',
    price: 2500,
    image: '/img/eb82c816-d671-4a82-9e53-2968a8f7a6b0.jpg',
    freshness: 'high',
    expiryDays: 7,
    description: 'Элегантные белые розы премиум класса'
  },
  {
    id: 2,
    name: 'Солнечные подсолнухи',
    price: 1800,
    image: '/img/753188ca-4630-4661-9176-788c13ec41a1.jpg',
    freshness: 'medium',
    expiryDays: 5,
    description: 'Яркие подсолнухи для хорошего настроения'
  },
  {
    id: 3,
    name: 'Розовые тюльпаны',
    price: 2200,
    image: '/img/e9ef69eb-01bf-42aa-8500-5fc5a49523ac.jpg',
    freshness: 'high',
    expiryDays: 8,
    description: 'Нежные весенние тюльпаны'
  }
];

const getFreshnessColor = (freshness: string) => {
  switch (freshness) {
    case 'high': return 'bg-fresh-high';
    case 'medium': return 'bg-fresh-medium';
    case 'low': return 'bg-fresh-low';
    default: return 'bg-gray-400';
  }
};

const getFreshnessText = (freshness: string) => {
  switch (freshness) {
    case 'high': return 'Очень свежие';
    case 'medium': return 'Свежие';
    case 'low': return 'Ограниченный срок';
    default: return 'Неизвестно';
  }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-flower-50">
      {/* Навигация */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-flower-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Icon name="Flower" size={28} className="text-flower-600" />
              <h1 className="text-2xl font-bold text-flower-800">Цветочная лавка</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-flower-700 hover:text-flower-800 font-medium transition-colors">Главная</a>
              <a href="#catalog" className="text-flower-700 hover:text-flower-800 font-medium transition-colors">Каталог</a>
              <a href="#about" className="text-flower-700 hover:text-flower-800 font-medium transition-colors">О нас</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Search" size={16} />
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="ShoppingCart" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Герой секция */}
      <section className="relative bg-gradient-to-br from-flower-100 via-flower-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-flower-800 mb-6">
              Свежие цветы<br />
              <span className="text-flower-600">каждый день</span>
            </h2>
            <p className="text-xl text-flower-700 mb-8 max-w-2xl mx-auto">
              Доставляем только самые свежие букеты с индикатором качества. 
              Гарантия свежести до 10 дней.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-flower-600 hover:bg-flower-700">
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Заказать букет
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Phone" size={20} className="mr-2" />
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Каталог товаров */}
      <section id="catalog" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-flower-800 mb-4">Наш каталог</h3>
            <p className="text-flower-600 max-w-2xl mx-auto">
              Каждый букет проходит контроль качества и получает индикатор свежести
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-flower-200 bg-white/70 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getFreshnessColor(product.freshness)} text-white border-0`}>
                      <Icon name="Leaf" size={14} className="mr-1" />
                      {getFreshnessText(product.freshness)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center text-sm text-flower-800">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {product.expiryDays} дней
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-flower-800">{product.name}</CardTitle>
                  <CardDescription className="text-flower-600">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-flower-800">
                      {product.price.toLocaleString()} ₽
                    </div>
                    <Button className="bg-flower-600 hover:bg-flower-700">
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* О нас */}
      <section id="about" className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-flower-800 mb-6">О нашей лавке</h3>
              <p className="text-flower-700 mb-6 text-lg">
                Уже более 15 лет мы радуем своих клиентов свежими цветами и оригинальными букетами. 
                Наша уникальная система контроля качества гарантирует максимальную свежесть каждого цветка.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-flower-600 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-white" />
                  </div>
                  <span className="text-flower-700">Гарантия свежести до 10 дней</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-flower-600 rounded-full flex items-center justify-center">
                    <Icon name="Truck" size={16} className="text-white" />
                  </div>
                  <span className="text-flower-700">Быстрая доставка по городу</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-flower-600 rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={16} className="text-white" />
                  </div>
                  <span className="text-flower-700">Индивидуальный подход к каждому заказу</span>
                </div>
              </div>
            </div>
            
            <div className="bg-flower-100 rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-flower-800 mb-4">Наши преимущества:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-flower-600">1000+</div>
                  <div className="text-flower-700">Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-flower-600">50+</div>
                  <div className="text-flower-700">Видов цветов</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-flower-600">24/7</div>
                  <div className="text-flower-700">Круглосуточно</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-flower-600">99%</div>
                  <div className="text-flower-700">Довольных отзывов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Страница 404 в модальном стиле для демонстрации */}
      <section className="py-16 bg-flower-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg">
            <div className="text-6xl mb-6">🌸</div>
            <h4 className="text-6xl font-bold text-flower-600 mb-4">404</h4>
            <h5 className="text-2xl font-semibold text-flower-800 mb-6">Ой! Цветочек потерялся</h5>
            <p className="text-flower-700 mb-8 max-w-md mx-auto">
              Кажется, эта страница завяла и улетела с ветром. 
              Давайте найдем что-то более свежее!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-flower-600 hover:bg-flower-700">
                <Icon name="Home" size={16} className="mr-2" />
                На главную
              </Button>
              <Button variant="outline">
                <Icon name="Search" size={16} className="mr-2" />
                Поиск по каталогу
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-flower-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Flower" size={24} />
                <h6 className="text-xl font-bold">Цветочная лавка</h6>
              </div>
              <p className="text-flower-200">
                Свежие цветы с гарантией качества каждый день
              </p>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Контакты</h6>
              <div className="space-y-2 text-flower-200">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>info@flowers.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>ул. Цветочная, 15</span>
                </div>
              </div>
            </div>
            
            <div>
              <h6 className="font-semibold mb-4">Режим работы</h6>
              <div className="space-y-1 text-flower-200">
                <div>Пн-Пт: 9:00 - 21:00</div>
                <div>Сб-Вс: 10:00 - 20:00</div>
                <div className="text-flower-300 text-sm mt-2">
                  Доставка 24/7
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-flower-700" />
          
          <div className="text-center text-flower-300">
            <p>&copy; 2024 Цветочная лавка. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;