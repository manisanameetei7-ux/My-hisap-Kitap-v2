import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  AlertTriangle,
  Barcode,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Product, ProductCategory, LanguageCode, UserRole } from '../types';
import { t } from '../data/translations';
import { formatCurrency } from '../utils/formatters';

interface ProductsProps {
  lang: LanguageCode;
  products: Product[];
  canManage: boolean;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const Products: React.FC<ProductsProps> = ({
  lang,
  products,
  canManage,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: t('all', lang) },
    { id: 'grocery', label: t('groceryItem', lang) },
    { id: 'stationery', label: t('stationeryItem', lang) },
    { id: 'cosmetic', label: t('cosmeticItem', lang) },
    { id: 'beverages', label: t('beveragesItem', lang) },
    { id: 'household', label: t('householdItem', lang) },
    { id: 'personalCare', label: t('personalCareItem', lang) },
    { id: 'electronics', label: t('electronicsItem', lang) },
    { id: 'other', label: t('otherItem', lang) },
  ];

  const filtered = products.filter((product) => {
    const matchesCat = selectedCategory === 'all' || product.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      product.name.toLowerCase().includes(q) ||
      (product.barcode && product.barcode.toLowerCase().includes(q)) ||
      product.standardQuantity.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#F4F8FB] flex items-center gap-2.5">
            <Package className="w-6 h-6 text-[#17D5B3]" />
            <span>{t('products', lang)}</span>
            <span className="text-xs bg-[#161C23] border border-[#26313B] text-[#A8B5C2] px-2 py-0.5 rounded-full font-mono">
              {filtered.length}
            </span>
          </h2>
          <p className="text-xs text-[#A8B5C2] mt-0.5">
            Manage your shop catalog, purchase costs, selling rates, and stock alerts.
          </p>
        </div>

        <button
          onClick={onAddProduct}
          className="flex items-center justify-center gap-2 bg-[#17D5B3] hover:bg-[#15C2A3] text-[#050608] font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-[#17D5B3]/20 transition-all text-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addProduct', lang)}</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#101419] border border-[#26313B] rounded-xl p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A8B5C2] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchProducts', lang)}
            className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg pl-10 pr-4 py-2 text-sm text-[#F4F8FB] placeholder-[#A8B5C2]/60 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A8B5C2] hover:text-[#F4F8FB]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#17D5B3] text-[#050608] shadow-sm'
                  : 'bg-[#161C23] text-[#A8B5C2] hover:text-[#F4F8FB] border border-[#26313B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#101419] border border-dashed border-[#26313B] rounded-2xl">
          <Package className="w-12 h-12 text-[#A8B5C2]/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#F4F8FB]">No products found</h3>
          <p className="text-xs text-[#A8B5C2] mt-1 max-w-sm mx-auto">
            {searchQuery ? 'No product matches your search keyword.' : t('emptyProducts', lang)}
          </p>
          <button
            onClick={onAddProduct}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#17D5B3] text-[#050608] font-bold text-xs rounded-lg hover:bg-[#15C2A3] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addProduct', lang)}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product) => {
            const isLowStock = product.stock <= product.lowStockAlert;
            const unitMargin = product.sellPrice - product.buyPrice;
            const marginPct = product.buyPrice > 0 ? ((unitMargin / product.buyPrice) * 100).toFixed(0) : 0;

            return (
              <div
                key={product.id}
                className="bg-[#101419] border border-[#26313B] hover:border-[#17D5B3]/50 rounded-xl overflow-hidden flex flex-col justify-between group transition-all"
              >
                <div>
                  {/* Image & Badges Header */}
                  <div className="relative h-40 bg-[#161C23] overflow-hidden border-b border-[#26313B]">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#A8B5C2]/40">
                        <Package className="w-12 h-12" />
                      </div>
                    )}

                    {/* Category Chip */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#050608]/80 backdrop-blur-md text-[#17D5B3] border border-[#17D5B3]/30">
                        {product.category}
                      </span>
                    </div>

                    {/* Stock Alert Badge */}
                    <div className="absolute top-2.5 right-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-1 backdrop-blur-md ${
                          isLowStock
                            ? 'bg-[#FF6F91]/90 text-[#050608] shadow-md shadow-[#FF6F91]/30'
                            : 'bg-[#050608]/80 text-[#F4F8FB] border border-[#26313B]'
                        }`}
                      >
                        {isLowStock && <AlertTriangle className="w-3 h-3" />}
                        <span>Stock: {product.stock}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-bold text-sm text-[#F4F8FB] line-clamp-2 min-h-[2.5rem]" title={product.name}>
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-[#A8B5C2] mt-1">
                        <span>{product.standardQuantity || 'Single unit'}</span>
                        {product.barcode && (
                          <span className="font-mono text-[11px] flex items-center gap-1 text-[#A8B5C2]/80">
                            <Barcode className="w-3 h-3" /> {product.barcode}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pricing Matrix */}
                    <div className="bg-[#161C23] border border-[#26313B] rounded-lg p-2.5 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-[#A8B5C2] text-[10px]">Buy Price</div>
                        <div className="font-bold font-mono text-[#F4F8FB]">
                          {formatCurrency(product.buyPrice)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#A8B5C2] text-[10px]">Sell Price</div>
                        <div className="font-extrabold font-mono text-[#17D5B3]">
                          {formatCurrency(product.sellPrice)}
                        </div>
                      </div>
                    </div>

                    {/* GST & Margin Information */}
                    <div className="flex items-center justify-between text-[11px] text-[#A8B5C2]">
                      <span>GST: {product.gstRate}%</span>
                      <span className="text-[#FFC857] font-semibold">
                        Margin: +{formatCurrency(unitMargin)} ({marginPct}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-3 bg-[#161C23]/60 border-t border-[#26313B] flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEditProduct(product)}
                    className="p-1.5 rounded-lg bg-[#101419] hover:bg-[#26313B] text-[#A8B5C2] hover:text-[#17D5B3] border border-[#26313B] transition-colors text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>{t('edit', lang)}</span>
                  </button>

                  {canManage && (
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
                          onDeleteProduct(product.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-[#101419] hover:bg-[#FF6F91]/20 text-[#A8B5C2] hover:text-[#FF6F91] border border-[#26313B] hover:border-[#FF6F91]/40 transition-colors"
                      title={t('delete', lang)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
