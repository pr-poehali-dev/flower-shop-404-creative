import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Filters {
  freshness: string[];
  priceRange: number[];
  sortBy: string;
}

interface ProductFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const freshnessOptions = [
  { value: 'high', label: 'Очень свежие', color: 'bg-fresh-high' },
  { value: 'medium', label: 'Свежие', color: 'bg-fresh-medium' },
  { value: 'low', label: 'Ограниченный срок', color: 'bg-fresh-low' }
];

const sortOptions = [
  { value: 'default', label: 'По умолчанию' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'freshness', label: 'По свежести' }
];

const ProductFilters = ({ filters, onFiltersChange, isOpen, onToggle }: ProductFiltersProps) => {
  const handleFreshnessChange = (freshness: string, checked: boolean) => {
    const newFreshness = checked
      ? [...filters.freshness, freshness]
      : filters.freshness.filter(f => f !== freshness);
    
    onFiltersChange({
      ...filters,
      freshness: newFreshness
    });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: value
    });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({
      ...filters,
      sortBy
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      freshness: [],
      priceRange: [0, 5000],
      sortBy: 'default'
    });
  };

  const activeFiltersCount = filters.freshness.length + 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000 ? 1 : 0) +
    (filters.sortBy !== 'default' ? 1 : 0);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={onToggle}
          className="lg:hidden"
        >
          <Icon name="SlidersHorizontal" size={16} className="mr-2" />
          Фильтры
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-flower-600 text-white">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        <div className="hidden lg:flex items-center gap-4">
          <span className="text-flower-700">Сортировка:</span>
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.sortBy === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleSortChange(option.value)}
                className={filters.sortBy === option.value ? "bg-flower-600 hover:bg-flower-700" : ""}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />
      )}

      <div className={`
        fixed lg:static top-0 right-0 h-full lg:h-auto w-80 lg:w-auto
        bg-white lg:bg-transparent shadow-2xl lg:shadow-none z-50 lg:z-auto
        transform transition-transform duration-300 lg:transform-none
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6 lg:p-0">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="text-lg font-semibold text-flower-800">Фильтры</h3>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="border-flower-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-flower-800 flex items-center justify-between">
                  Свежесть
                  {filters.freshness.length > 0 && (
                    <Badge className="bg-flower-100 text-flower-600">
                      {filters.freshness.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {freshnessOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={filters.freshness.includes(option.value)}
                      onCheckedChange={(checked) => 
                        handleFreshnessChange(option.value, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={option.value}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <div className={`w-3 h-3 rounded-full ${option.color}`} />
                      <span className="text-flower-700">{option.label}</span>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-flower-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-flower-800">Цена</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  max={5000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-flower-600">
                  <span>{filters.priceRange[0].toLocaleString()} ₽</span>
                  <span>{filters.priceRange[1].toLocaleString()} ₽</span>
                </div>
              </CardContent>
            </Card>

            <div className="lg:hidden space-y-3">
              <h4 className="font-medium text-flower-800">Сортировка</h4>
              {sortOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filters.sortBy === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full justify-start ${
                    filters.sortBy === option.value ? "bg-flower-600 hover:bg-flower-700" : ""
                  }`}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full text-flower-600 border-flower-300 hover:bg-flower-50"
              >
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Сбросить фильтры
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;