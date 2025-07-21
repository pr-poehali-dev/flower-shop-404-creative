import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { CartItem } from '@/hooks/useCart';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClearCart: () => void;
  total: number;
}

const getFreshnessColor = (freshness: string) => {
  switch (freshness) {
    case 'high': return 'bg-fresh-high';
    case 'medium': return 'bg-fresh-medium'; 
    case 'low': return 'bg-fresh-low';
    default: return 'bg-gray-400';
  }
};

const Cart = ({ items, isOpen, onClose, onRemoveItem, onUpdateQuantity, onClearCart, total }: CartProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in-0" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 animate-in slide-in-from-right-0 duration-300">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-flower-200">
            <h3 className="text-xl font-semibold text-flower-800">Корзина</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🌸</div>
                <p className="text-flower-600 mb-4">Корзина пуста</p>
                <p className="text-sm text-flower-500">Добавьте цветы для создания букета</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-flower-50 rounded-lg animate-in slide-in-from-right-1">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-flower-800">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-flower-500 hover:text-flower-700"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getFreshnessColor(item.freshness)} text-white border-0 text-xs`}>
                          <Icon name="Leaf" size={12} className="mr-1" />
                          {item.expiryDays}д
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                        <div className="font-semibold text-flower-800">
                          {(item.price * item.quantity).toLocaleString()} ₽
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {items.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearCart}
                    className="w-full text-flower-600 border-flower-300 hover:bg-flower-50"
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Очистить корзину
                  </Button>
                )}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-flower-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-flower-800">Итого:</span>
                <span className="text-2xl font-bold text-flower-600">
                  {total.toLocaleString()} ₽
                </span>
              </div>
              
              <Button className="w-full bg-flower-600 hover:bg-flower-700 text-white">
                <Icon name="CreditCard" size={20} className="mr-2" />
                Оформить заказ
              </Button>
              
              <p className="text-xs text-flower-500 text-center mt-2">
                Доставка рассчитывается при оформлении
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;