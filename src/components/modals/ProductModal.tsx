import React, { useState, useEffect } from 'react';
import { Package, X, Image, Barcode, DollarSign, Layers } from 'lucide-react';
import { Product, ProductCategory, LanguageCode } from '../../types';
import { t } from '../../data/translations';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageCode;
  productToEdit?: Product | null;
  onSaveProduct: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  lang,
  productToEdit,
  onSaveProduct,
}) => {
  const [name, setName] = useState(productToEdit?.name || '');
  const [standardQuantity, setStandardQuantity] = useState(productToEdit?.standardQuantity || '1 kg');
  const [buyPrice, setBuyPrice] = useState<number | ''>(productToEdit ? productToEdit.buyPrice : '');
  const [sellPrice, setSellPrice] = useState<number | ''>(productToEdit ? productToEdit.sellPrice : '');
  const [stock, setStock] = useState<number | ''>(productToEdit ? productToEdit.stock : 10);
  const [category, setCategory] = useState<ProductCategory>(productToEdit?.category || 'grocery');
  const [imageUrl, setImageUrl] = useState(productToEdit?.imageUrl || '');
  const [barcode, setBarcode] = useState(productToEdit?.barcode || '');
  const [gstRate, setGstRate] = useState<number>(productToEdit?.gstRate || 0);
  const [lowStockAlert, setLowStockAlert] = useState<number>(productToEdit?.lowStockAlert || 5);
  const [error, setError] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setStandardQuantity(productToEdit.standardQuantity);
      setBuyPrice(productToEdit.buyPrice);
      setSellPrice(productToEdit.sellPrice);
      setStock(productToEdit.stock);
      setCategory(productToEdit.category);
      setImageUrl(productToEdit.imageUrl || '');
      setBarcode(productToEdit.barcode || '');
      setGstRate(productToEdit.gstRate);
      setLowStockAlert(productToEdit.lowStockAlert);
    } else {
      setName('');
      setStandardQuantity('1 kg');
      setBuyPrice('');
      setSellPrice('');
      setStock(10);
      setCategory('grocery');
      setImageUrl('');
      setBarcode('');
      setGstRate(0);
      setLowStockAlert(5);
    }
    setError('');
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t('enterValidDetails', lang));
      return;
    }

    const buy = Number(buyPrice) || 0;
    const sell = Number(sellPrice) || 0;
    const stk = stock === '' ? 0 : Number(stock);

    const updated: Product = {
      id: productToEdit?.id || `prod-${Date.now()}`,
      name: name.trim(),
      standardQuantity: standardQuantity.trim(),
      buyPrice: buy,
      sellPrice: sell,
      stock: stk,
      category,
      imageUrl: imageUrl.trim() || undefined,
      barcode: barcode.trim() || `890103${Math.floor(100000 + Math.random() * 900000)}`,
      gstRate,
      lowStockAlert: Number(lowStockAlert) || 5,
    };

    onSaveProduct(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050608]/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#101419] border border-[#26313B] w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#26313B] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#17D5B3]/20 border border-[#17D5B3]/40 text-[#17D5B3] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#F4F8FB]">
                {productToEdit ? t('editProduct', lang) : t('addProduct', lang)}
              </h3>
              <p className="text-xs text-[#A8B5C2]">Configure catalog pricing and inventory units</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#161C23] hover:bg-[#26313B] text-[#A8B5C2] hover:text-[#F4F8FB]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-[#FF6F91]/20 text-[#FF6F91] text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-[#A8B5C2] block mb-1">
              Product Title / Brand Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Basmati Rice (Premium)"
              className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg px-3.5 py-2.5 text-sm text-[#F4F8FB] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[#A8B5C2] block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg px-3.5 py-2.5 text-sm text-[#F4F8FB] focus:outline-none"
              >
                <option value="grocery">{t('groceryItem', lang)}</option>
                <option value="stationery">{t('stationeryItem', lang)}</option>
                <option value="cosmetic">{t('cosmeticItem', lang)}</option>
                <option value="beverages">{t('beveragesItem', lang)}</option>
                <option value="household">{t('householdItem', lang)}</option>
                <option value="personalCare">{t('personalCareItem', lang)}</option>
                <option value="electronics">{t('electronicsItem', lang)}</option>
                <option value="other">{t('otherItem', lang)}</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#A8B5C2] block mb-1">
                Standard Packing / Weight
              </label>
              <input
                type="text"
                value={standardQuantity}
                onChange={(e) => setStandardQuantity(e.target.value)}
                placeholder="e.g. 1 kg, 500 ml, Pack of 3"
                className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg px-3.5 py-2.5 text-sm text-[#F4F8FB] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[#A8B5C2] block mb-1">
                Purchase / Buy Cost (₹)
              </label>
              <input
                type="number"
                min="0"
                required
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                placeholder="90.00"
                className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#F4F8FB] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#17D5B3] block mb-1">
                Selling Retail Price (₹)
              </label>
              <input
                type="number"
                min="0"
                required
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value === '' ? '' : parseFloat(e.target.value) || 0)}
                placeholder="110.00"
                className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#17D5B3] font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-[#A8B5C2] block mb-1">Opening Stock</label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value === '' ? '' : parseInt(e.target.value) || 0)}
                className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg px-3 py-2 text-sm font-mono text-[#F4F8FB] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#A8B5C2] block mb-1">GST Rate (%)</label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg px-3 py-2 text-sm text-[#F4F8FB] focus:outline-none"
              >
                <option value={0}>0% (Exempt)</option>
                <option value={5}>5%</option>
                <option value={12}>12%</option>
                <option value={18}>18%</option>
                <option value={28}>28%</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-[#A8B5C2] block mb-1">Low Stock Alert</label>
              <input
                type="number"
                min="1"
                value={lowStockAlert}
                onChange={(e) => setLowStockAlert(parseInt(e.target.value) || 5)}
                className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg px-3 py-2 text-sm font-mono text-[#F4F8FB] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-[#A8B5C2] block mb-1">Barcode / SKU</label>
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="e.g. 890103001001"
                className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg px-3 py-2 text-sm font-mono text-[#F4F8FB] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-[#A8B5C2] block mb-1">Image URL (Optional)</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#161C23] border border-[#26313B] focus:border-[#17D5B3] rounded-lg px-3 py-2 text-sm text-[#F4F8FB] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-[#161C23] hover:bg-[#26313B] text-[#A8B5C2] hover:text-[#F4F8FB] rounded-xl font-bold"
            >
              {t('cancel', lang)}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#17D5B3] hover:bg-[#15C2A3] text-[#050608] font-black rounded-xl shadow-lg shadow-[#17D5B3]/20 transition-all"
            >
              {t('save', lang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
