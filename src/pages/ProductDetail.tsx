import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ProductDetailProps {
  productId: number;
  onAddToCart: (product: any) => void;
  onBack: () => void;
}

const products = [
  {
    id: 1,
    name: 'Белые розы',
    price: 2500,
    images: [
      '/img/eb82c816-d671-4a82-9e53-2968a8f7a6b0.jpg',
      '/img/753188ca-4630-4661-9176-788c13ec41a1.jpg'
    ],
    freshness: 'high',
    expiryDays: 7,
    description: 'Элегантные белые розы премиум класса',
    fullDescription: 'Великолепные белые розы, выращенные в лучших оранжереях Голландии. Каждый бутон тщательно отобран нашими флористами для создания идеального букета. Розы отличаются долгим сроком жизни и изысканным ароматом.',
    care: [
      'Обрезать стебли под углом 45°',
      'Менять воду каждые 2-3 дня',
      'Избегать прямых солнечных лучей',
      'Добавлять подкормку для цветов'
    ],
    specs: {
      height: '60-70 см',
      stemLength: '50-60 см',
      buds: '15-20 штук',
      origin: 'Голландия'
    }
  },
  {
    id: 2,
    name: 'Солнечные подсолнухи',
    price: 1800,
    images: [
      '/img/753188ca-4630-4661-9176-788c13ec41a1.jpg',
      '/img/e9ef69eb-01bf-42aa-8500-5fc5a49523ac.jpg'
    ],
    freshness: 'medium',
    expiryDays: 5,
    description: 'Яркие подсолнухи для хорошего настроения',
    fullDescription: 'Солнечные подсолнухи, которые принесут радость и тепло в любой дом. Эти удивительные цветы символизируют преданность, радость и позитивную энергию. Идеально подходят для создания ярких летних букетов.',
    care: [
      'Поставить в прохладную воду',
      'Обрезать стебли каждые 3 дня',
      'Удалять увядшие листья',
      'Держать в прохладном месте'
    ],
    specs: {
      height: '80-90 см',
      stemLength: '70-80 см',
      buds: '5-7 штук',
      origin: 'Россия'
    }
  },
  {
    id: 3,
    name: 'Розовые тюльпаны',
    price: 2200,
    images: [
      '/img/e9ef69eb-01bf-42aa-8500-5fc5a49523ac.jpg',
      '/img/753188ca-4630-4661-9176-788c13ec41a1.jpg'
    ],
    freshness: 'high',
    expiryDays: 8,
    description: 'Нежные весенние тюльпаны',
    fullDescription: 'Нежные розовые тюльпаны, символ весны и новых начинаний. Эти цветы привносят в дом атмосферу свежести и романтики. Идеальный выбор для особых случаев и просто для поднятия настроения.',
    care: [
      'Использовать холодную воду',
      'Обрезать стебли ежедневно',
      'Убирать в прохладное место на ночь',
      'Избегать сквозняков'
    ],
    specs: {
      height: '40-50 см',
      stemLength: '30-40 см',
      buds: '25-30 штук',
      origin: 'Голландия'
    }
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

const ProductDetail = ({ productId, onAddToCart, onBack }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-flower-800 mb-4">Товар не найден</h2>
          <Button onClick={onBack}>
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться к каталогу
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        freshness: product.freshness,
        expiryDays: product.expiryDays
      });
    }
  };

  return (
    <div className="min-h-screen bg-flower-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-flower-600 hover:text-flower-800"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад к каталогу
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute top-4 right-4">
                <Badge className={`${getFreshnessColor(product.freshness)} text-white border-0`}>
                  <Icon name="Leaf" size={14} className="mr-1" />
                  {getFreshnessText(product.freshness)}
                </Badge>
              </div>
            </div>
            
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index 
                      ? 'border-flower-600' 
                      : 'border-flower-200 hover:border-flower-400'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-flower-800 mb-2">{product.name}</h1>
              <p className="text-flower-600 text-lg">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-flower-600">
                {product.price.toLocaleString()} ₽
              </div>
              <div className="flex items-center text-flower-700 bg-flower-100 px-3 py-1 rounded-full">
                <Icon name="Clock" size={16} className="mr-1" />
                {product.expiryDays} дней свежести
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-flower-800 font-medium">Количество:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 p-0"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 p-0"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            <Button 
              size="lg" 
              onClick={handleAddToCart}
              className="w-full bg-flower-600 hover:bg-flower-700 text-white"
            >
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Добавить в корзину - {(product.price * quantity).toLocaleString()} ₽
            </Button>

            <Separator className="bg-flower-200" />

            <div>
              <h3 className="text-xl font-semibold text-flower-800 mb-4">Описание</h3>
              <p className="text-flower-700 leading-relaxed">{product.fullDescription}</p>
            </div>

            <Card className="bg-flower-100 border-flower-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-flower-800 mb-4">Характеристики</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-flower-600">Высота:</span>
                    <div className="font-medium">{product.specs.height}</div>
                  </div>
                  <div>
                    <span className="text-flower-600">Длина стебля:</span>
                    <div className="font-medium">{product.specs.stemLength}</div>
                  </div>
                  <div>
                    <span className="text-flower-600">Количество:</span>
                    <div className="font-medium">{product.specs.buds}</div>
                  </div>
                  <div>
                    <span className="text-flower-600">Происхождение:</span>
                    <div className="font-medium">{product.specs.origin}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-flower-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-flower-800 mb-4 flex items-center">
                  <Icon name="Heart" size={18} className="mr-2 text-flower-600" />
                  Уход за цветами
                </h4>
                <ul className="space-y-2">
                  {product.care.map((tip, index) => (
                    <li key={index} className="flex items-start text-flower-700">
                      <Icon name="CheckCircle" size={16} className="mr-2 mt-0.5 text-flower-600 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;