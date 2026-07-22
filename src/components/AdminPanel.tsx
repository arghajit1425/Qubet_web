import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Banner, ProductAsset, Product } from '../types';
import { QubetLogo } from './QubetLogo';

export const AdminPanel: React.FC = () => {
  const {
    banners,
    assets,
    products,
    replaceBanner,
    replaceAsset,
    addProduct,
    updateProduct,
    deleteProduct,
    customLogoUrl,
    updateCustomLogo,
    setCurrentView,
    setUser,
    user,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'content' | 'customers' | 'analytics' | 'settings'>('content');

  // Search state
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('All');

  // Notifications popup state
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'New VIP Order #RE-9012 ($1,250)', time: '10m ago', read: false },
    { id: '2', title: 'Top-left Qubet Logo Synchronized', time: '1h ago', read: false },
    { id: '3', title: 'Low Stock Alert: Royal Oud (3 left)', time: '3h ago', read: true },
    { id: '4', title: 'Daily Analytics Backup Completed', time: '5h ago', read: true },
  ]);

  // Admin Avatar Edit Modal state
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatarInputUrl, setAvatarInputUrl] = useState('');

  // Replace Modal state (for banners/assets)
  const [replacingItem, setReplacingItem] = useState<{ type: 'banner' | 'asset'; id: string; name: string } | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Logo URL Input state inside Logo card
  const [logoInputUrl, setLogoInputUrl] = useState('');

  // Store Content Settings State (Interactive)
  const [announcementText, setAnnouncementText] = useState('Complimentary Royal Express Delivery on all orders over $250');
  const [heroTagline, setHeroTagline] = useState('Crafted for Royalty, Distilled for Elegance');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [storeTaxRate, setStoreTaxRate] = useState(12);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(250);

  // Customer List State (Interactive CRM)
  const [customerSearch, setCustomerSearch] = useState('');
  const [customers, setCustomers] = useState([
    { id: 'c1', name: 'Sophia Sterling', email: 'sophia@sterling.com', orders: 14, totalSpent: '$4,280', isVip: true },
    { id: 'c2', name: 'Alexander Wright', email: 'alex.wright@luxury.io', orders: 8, totalSpent: '$2,150', isVip: true },
    { id: 'c3', name: 'Elena Rostova', email: 'elena@rostova.co', orders: 3, totalSpent: '$890', isVip: false },
    { id: 'c4', name: 'Julian Vance', email: 'vance@parfums.fr', orders: 5, totalSpent: '$1,420', isVip: false },
    { id: 'c5', name: 'Aaria Mehta', email: 'aaria.m@mumbai.in', orders: 11, totalSpent: '$3,600', isVip: true },
  ]);

  // Timeframe selector for analytics
  const [analyticsRange, setAnalyticsRange] = useState<'7d' | '30d' | '1y'>('30d');

  // Add Product Modal state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProd, setNewProd] = useState<Omit<Product, 'id'>>({
    name: '',
    subtitle: '',
    price: 499,
    currency: '$',
    category: 'Perfume',
    sku: `RE-2026-${Math.floor(Math.random() * 900 + 100)}`,
    description: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN2TgXBSqj0fekSxXGaOaJVOSwA4ssfgoUt_IQOoFDgvDQPUftZh8UICHi6dcUO3bxXWJCwEEGfsqco1GYF2OZYJGbi_qp9JmnJ44GxZouYmFg-FztjaINLID5LjtAQbsJxHm01MWzg6P39DQ4Meui6qaagrahz5cgIm8ErCL4xrymkw6QD5r7SfUcVIeS3DFz_IVM1PdnaG0qYRY8zTn7gUIapAgWXf8hM8V_9qZEIb7JKeou6UiXq-vpNVdOa9a4avvU8Nlq8T4',
    isBestSeller: false,
    isFeatured: true,
    rating: 4.9,
    notes: ['Bergamot', 'Bulgarian Rose', 'White Oud'],
  });
  const [newProdNotesInput, setNewProdNotesInput] = useState('Bergamot, Bulgarian Rose, White Oud');

  // Edit Product Modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editNotesInput, setEditNotesInput] = useState('');

  // Logo file upload handler
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file (PNG, JPG, SVG, WebP, etc.)');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updateCustomLogo(reader.result);
          setLogoInputUrl('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Avatar file upload handler
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUser((prev) => ({ ...prev, avatarUrl: reader.result }));
          setShowAvatarModal(false);
          showToast('Admin Profile Picture Updated');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Modal image file upload handler for Replace Modal
  const handleModalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Product Image File Upload Handler
  const handleNewProductImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewProd((prev) => ({ ...prev, image: reader.result as string }));
          showToast('Image uploaded for new product');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Edit Product Image File Upload Handler
  const handleEditProductImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (editingProduct) {
            setEditingProduct((prev) => prev ? { ...prev, image: reader.result as string } : null);
            showToast('New image file attached');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExecuteReplace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) {
      showToast('Please enter or select an image URL');
      return;
    }

    if (replacingItem) {
      if (replacingItem.type === 'banner') {
        replaceBanner(replacingItem.id, newImageUrl.trim());
      } else {
        replaceAsset(replacingItem.id, newImageUrl.trim());
      }
      setReplacingItem(null);
      setNewImageUrl('');
    }
  };

  // Add Product Submit Handler
  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name.trim() || !newProd.price) {
      showToast('Please enter a valid product name and price');
      return;
    }

    const notesArray = newProdNotesInput
      .split(',')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    addProduct({
      ...newProd,
      notes: notesArray.length > 0 ? notesArray : ['Bergamot', 'Ambrette', 'Sandstone'],
    });

    setShowAddProductModal(false);
    // Reset form
    setNewProd({
      name: '',
      subtitle: '',
      price: 499,
      currency: '$',
      category: 'Perfume',
      sku: `RE-2026-${Math.floor(Math.random() * 900 + 100)}`,
      description: '',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN2TgXBSqj0fekSxXGaOaJVOSwA4ssfgoUt_IQOoFDgvDQPUftZh8UICHi6dcUO3bxXWJCwEEGfsqco1GYF2OZYJGbi_qp9JmnJ44GxZouYmFg-FztjaINLID5LjtAQbsJxHm01MWzg6P39DQ4Meui6qaagrahz5cgIm8ErCL4xrymkw6QD5r7SfUcVIeS3DFz_IVM1PdnaG0qYRY8zTn7gUIapAgWXf8hM8V_9qZEIb7JKeou6UiXq-vpNVdOa9a4avvU8Nlq8T4',
      isBestSeller: false,
      isFeatured: true,
      rating: 4.9,
    });
    setNewProdNotesInput('Bergamot, Bulgarian Rose, White Oud');
  };

  // Edit Product Submit Handler
  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name.trim()) {
      showToast('Product name cannot be empty');
      return;
    }

    const notesArray = editNotesInput
      .split(',')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    const updated: Product = {
      ...editingProduct,
      notes: notesArray.length > 0 ? notesArray : editingProduct.notes,
    };

    updateProduct(updated);
    setEditingProduct(null);
  };

  // Open Edit Product Modal
  const openEditModalForProduct = (p: Product) => {
    setEditingProduct(p);
    setEditNotesInput(p.notes ? p.notes.join(', ') : '');
  };

  const handleLogout = () => {
    setUser({
      name: 'Guest User',
      email: '',
      isLoggedIn: false,
      isAdmin: false,
      avatarUrl: null,
    });
    showToast('Logged out of Admin Portal');
    setCurrentView('home');
  };

  // Toggle Customer VIP
  const toggleCustomerVip = (id: string) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextVip = !c.isVip;
          showToast(`${c.name} ${nextVip ? 'promoted to VIP Tier' : 'status updated'}`);
          return { ...c, isVip: nextVip };
        }
        return c;
      })
    );
  };

  // Filtered lists
  const filteredAssets = assets.filter(
    (a) =>
      a.productName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.sku.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.type.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredBanners = banners.filter(
    (b) =>
      b.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.status.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesCategory =
      selectedCategoryTab === 'All' || p.category === selectedCategoryTab;

    return matchesSearch && matchesCategory;
  });

  const filteredCustomersList = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const adminDisplayName = user.name || 'Pranay Chakraborty';

  return (
    <div className="min-h-screen bg-[#f6f3f2] flex flex-col lg:flex-row text-[#1c1b1b]">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#420054] text-white p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Header Branding */}
          <div
            className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10 cursor-pointer"
            onClick={() => setCurrentView('home')}
            title="Go to Home Storefront"
          >
            <QubetLogo variant="gold" className="h-10" />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Overview', icon: 'dashboard' },
              { id: 'content', label: 'Products & Catalog', icon: 'inventory_2' },
              { id: 'media', label: 'Media & Branding', icon: 'perm_media' },
              { id: 'customers', label: 'Customers CRM', icon: 'group' },
              { id: 'analytics', label: 'Analytics', icon: 'analytics' },
              { id: 'settings', label: 'System Settings', icon: 'settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#ffdf9d] text-[#251a00] font-bold shadow-md'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <button
            onClick={() => setShowAddProductModal(true)}
            className="w-full py-3 rounded-2xl bg-[#ffdf9d] text-[#251a00] text-xs font-bold uppercase tracking-wider hover:bg-[#e6c274] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Add New Product</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-rose-900/40 text-rose-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-4 sm:p-6 rounded-2xl border border-[#d1c2d0]/40 shadow-2xs relative">
          <div>
            <h1 className="font-display-lg text-2xl sm:text-3xl font-bold text-[#420054]">
              Qubet Executive Console
            </h1>
            <p className="text-xs text-[#807380] mt-0.5">
              Logged in as <strong className="text-[#420054]">{adminDisplayName}</strong> • System Admin Portal
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search filter input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, SKUs, assets..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="bg-[#f6f3f2] border border-[#d1c2d0] rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-[#420054] w-48 sm:w-60"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#807380]">
                search
              </span>
            </div>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2.5 rounded-full bg-[#f6f3f2] text-[#420054] relative hover:bg-[#eae7e7] transition-colors cursor-pointer"
                title="System Notifications"
              >
                <span className="material-symbols-outlined text-lg">notifications</span>
                {notifications.some((n) => !n.read) && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white animate-pulse"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-[#d1c2d0] p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-[#f0eded] mb-3">
                    <span className="font-bold text-xs text-[#420054] uppercase tracking-wider">
                      System Notifications
                    </span>
                    <button
                      onClick={() => {
                        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                        showToast('All notifications marked as read');
                      }}
                      className="text-[10px] text-[#765a16] hover:underline font-bold cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs flex items-start justify-between ${
                          n.read ? 'bg-white border-[#f0eded]' : 'bg-[#fcf9f8] border-[#ffdf9d]'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-[#420054]">{n.title}</p>
                          <span className="text-[10px] text-[#807380]">{n.time}</span>
                        </div>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1"></span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin User Profile Badge with Default "P" Profile Picture */}
            <div
              onClick={() => setShowAvatarModal(true)}
              className="flex items-center gap-2.5 pl-3 border-l border-[#d1c2d0] cursor-pointer group"
              title="Click to edit Admin Profile Picture"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={adminDisplayName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#420054] group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#420054] text-[#ffdf9d] border-2 border-[#ffdf9d] flex items-center justify-center font-display-lg font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
                  P
                </div>
              )}

              <div className="hidden xl:block">
                <span className="font-bold text-xs text-[#420054] block leading-none group-hover:text-[#765a16] transition-colors">
                  Pranay Chakraborty
                </span>
                <span className="text-[10px] text-[#765a16] font-semibold block mt-0.5">
                  Executive Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* OVERVIEW TAB CONTENT */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Bento Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#d1c2d0]/40 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#807380]">
                    Total Store Revenue
                  </span>
                  <span className="material-symbols-outlined text-[#420054]">payments</span>
                </div>
                <div className="font-display-lg text-2xl font-bold text-[#420054]">$128,450</div>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">trending_up</span>
                  <span>+18.4% vs last month</span>
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#d1c2d0]/40 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#807380]">
                    Active Products
                  </span>
                  <span className="material-symbols-outlined text-[#765a16]">inventory_2</span>
                </div>
                <div className="font-display-lg text-2xl font-bold text-[#420054]">
                  {products.length} Products
                </div>
                <p className="text-[11px] text-[#807380] mt-1">Catalog synchronized live</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#d1c2d0]/40 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#807380]">
                    Cloud Storage Space
                  </span>
                  <span className="material-symbols-outlined text-[#420054]">cloud</span>
                </div>
                <div className="font-display-lg text-2xl font-bold text-[#420054]">1.2 TB / 2.0 TB</div>
                <div className="w-full bg-[#f0eded] h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-[#420054] h-full w-[60%] rounded-full"></div>
                </div>
                <span className="text-[10px] text-[#807380] mt-1 block">60% space utilized</span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#d1c2d0]/40 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#807380]">
                    CDN Uptime
                  </span>
                  <span className="material-symbols-outlined text-emerald-600">bolt</span>
                </div>
                <div className="font-display-lg text-2xl font-bold text-[#420054]">99.98%</div>
                <p className="text-[11px] text-[#807380] mt-1">High speed edge caching active</p>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white rounded-2xl p-6 border border-[#d1c2d0]/40 shadow-2xs">
              <h2 className="font-display-lg text-xl font-bold text-[#420054] mb-4">
                Executive Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button
                  onClick={() => showToast('CDN Cache flushed successfully across global nodes')}
                  className="p-4 rounded-xl bg-[#fcf9f8] border border-[#d1c2d0] hover:bg-[#420054] hover:text-[#ffdf9d] text-xs font-bold text-[#420054] transition-all cursor-pointer flex flex-col items-center gap-2 text-center group"
                >
                  <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                    cached
                  </span>
                  <span>Flush CDN Cache</span>
                </button>

                <button
                  onClick={() => showToast('Sales Report CSV generated & downloaded')}
                  className="p-4 rounded-xl bg-[#fcf9f8] border border-[#d1c2d0] hover:bg-[#420054] hover:text-[#ffdf9d] text-xs font-bold text-[#420054] transition-all cursor-pointer flex flex-col items-center gap-2 text-center group"
                >
                  <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                    download
                  </span>
                  <span>Export Sales Report</span>
                </button>

                <button
                  onClick={() => showToast('Store Inventory re-indexed successfully')}
                  className="p-4 rounded-xl bg-[#fcf9f8] border border-[#d1c2d0] hover:bg-[#420054] hover:text-[#ffdf9d] text-xs font-bold text-[#420054] transition-all cursor-pointer flex flex-col items-center gap-2 text-center group"
                >
                  <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                    sync
                  </span>
                  <span>Sync Product SKUs</span>
                </button>

                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="p-4 rounded-xl bg-[#420054] text-[#ffdf9d] border border-[#420054] hover:bg-[#5d1a6f] text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-2 text-center group"
                >
                  <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                    add_circle
                  </span>
                  <span>Publish New Fragrance</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS & CATALOG TAB (STORE CONTENT) */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            {/* Top Toolbar for Products */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d1c2d0]/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#420054]">inventory_2</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#765a16]">
                    Product Catalog Management
                  </span>
                </div>
                <h2 className="font-display-lg text-2xl font-bold text-[#420054]">
                  Edit & Manage Store Products ({products.length})
                </h2>
                <p className="text-xs text-[#807380] mt-1">
                  Click <strong>"Edit Product"</strong> on any perfume or item to modify its name, price, description, images, notes, or categories in real-time.
                </p>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-6 py-3.5 rounded-2xl bg-[#420054] text-[#ffdf9d] font-bold text-xs uppercase tracking-wider hover:bg-[#5d1a6f] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                <span>Add New Product</span>
              </button>
            </div>

            {/* Category Filter Pills & Search Bar */}
            <div className="bg-white rounded-2xl p-4 border border-[#d1c2d0]/40 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {['All', 'Perfume', 'Collection', 'Accessories', 'News'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryTab(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      selectedCategoryTab === cat
                        ? 'bg-[#420054] text-[#ffdf9d] shadow-2xs'
                        : 'bg-[#f6f3f2] text-[#807380] hover:bg-[#e8e4e3] hover:text-[#420054]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <span className="text-xs text-[#807380] font-semibold">
                Showing {filteredProducts.length} items
              </span>
            </div>

            {/* Products Interactive Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-[#d1c2d0]/50 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-[#420054] transition-all group"
                >
                  <div className="p-5 flex items-start gap-4">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#f6f3f2] border border-[#d1c2d0] shrink-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {p.isBestSeller && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-amber-500 text-white text-[9px] font-bold uppercase">
                          ★ Best
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#f0eded] text-[#765a16] text-[10px] font-bold uppercase">
                          {p.category}
                        </span>
                        <span className="text-[10px] text-[#807380] font-mono">{p.sku}</span>
                      </div>

                      <h3 className="font-display-lg text-lg font-bold text-[#420054] truncate">
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#765a16] italic truncate">{p.subtitle}</p>

                      <div className="font-bold text-sm text-[#251a00] pt-1">
                        {p.currency}{p.price}
                      </div>
                    </div>
                  </div>

                  {/* Card Description & Notes preview */}
                  <div className="px-5 pb-3 text-xs text-[#807380] line-clamp-2">
                    {p.description || 'Exclusive luxury formulation handcrafted with precious notes.'}
                  </div>

                  {p.notes && p.notes.length > 0 && (
                    <div className="px-5 pb-3 flex flex-wrap gap-1">
                      {p.notes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full bg-[#f6f3f2] text-[10px] text-[#4e434f]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions Footer */}
                  <div className="p-4 bg-[#fcf9f8] border-t border-[#f0eded] flex items-center justify-between gap-2">
                    <button
                      onClick={() => openEditModalForProduct(p)}
                      className="flex-1 py-2 rounded-xl bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      <span>Edit Product</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Store Copy Management */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white rounded-2xl p-6 border border-[#d1c2d0]/40 shadow-2xs">
                <h3 className="font-display-lg text-lg font-bold text-[#420054] mb-3">
                  Announcement Bar Copy Editor
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-3 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#420054]"
                  />
                  <button
                    onClick={() => showToast('Announcement bar message published live')}
                    className="px-5 py-2.5 rounded-xl bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] cursor-pointer"
                  >
                    Save & Publish Copy
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#d1c2d0]/40 shadow-2xs">
                <h3 className="font-display-lg text-lg font-bold text-[#420054] mb-3">
                  Homepage Hero Headline Tagline
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={heroTagline}
                    onChange={(e) => setHeroTagline(e.target.value)}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-3 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#420054]"
                  />
                  <button
                    onClick={() => showToast('Hero tagline updated on store homepage')}
                    className="px-5 py-2.5 rounded-xl bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] cursor-pointer"
                  >
                    Save Tagline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MEDIA & BRANDING TAB CONTENT */}
        {activeTab === 'media' && (
          <div className="space-y-10">
            {/* BRAND IDENTITY & TOP LEFT LOGO MANAGEMENT */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d1c2d0]/60 shadow-xs relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 pb-6 border-b border-[#f0eded]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[#420054]">photo_camera</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#765a16]">
                      Header & App Branding
                    </span>
                  </div>
                  <h2 className="font-display-lg text-2xl font-bold text-[#420054]">
                    Top Left Qubet Logo Customization
                  </h2>
                  <p className="text-xs text-[#807380] mt-1 max-w-xl">
                    As Admin (Pranay Chakraborty), upload an image file (PNG, SVG, JPG) or specify an image URL to replace the top-left Qubet brand logo across the header, navigation menu, and footer.
                  </p>
                </div>

                {/* Current Logo Live Status */}
                <div className="flex items-center gap-3 bg-[#fcf9f8] p-3 rounded-2xl border border-[#d1c2d0]/50 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-[#807380] uppercase block">
                      Current Live Logo
                    </span>
                    <span className="text-xs font-bold text-[#420054] block">
                      {customLogoUrl ? 'Custom Image Active' : 'Default Qubet Emblem'}
                    </span>
                  </div>
                  <div className="px-3 py-2 bg-white rounded-xl border border-[#d1c2d0]/40 flex items-center justify-center">
                    <QubetLogo variant="light" className="h-8" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* File Upload & Input Controls */}
                <div className="space-y-5">
                  {/* Option 1: File Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#420054] mb-2 flex items-center justify-between">
                      <span>Option 1: Upload Image File</span>
                      <span className="text-[10px] text-[#807380] font-normal">PNG, SVG, JPG, WebP</span>
                    </label>
                    <div className="relative border-2 border-dashed border-[#420054]/30 hover:border-[#420054] rounded-2xl p-6 bg-[#fcf9f8] hover:bg-[#420054]/5 transition-all text-center group cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-[#420054]/10 text-[#420054] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-2xl">upload_file</span>
                        </div>
                        <p className="text-xs font-bold text-[#420054]">
                          Click or drag an image file here to upload logo
                        </p>
                        <p className="text-[11px] text-[#807380]">
                          Replaces top-left Qubet logo instantly across the store
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Option 2: Image URL */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#420054] mb-2">
                      Option 2: Enter Image URL
                    </label>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (logoInputUrl.trim()) {
                          updateCustomLogo(logoInputUrl.trim());
                          setLogoInputUrl('');
                        } else {
                          showToast('Please enter an image URL');
                        }
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="url"
                        placeholder="https://example.com/my-custom-logo.png"
                        value={logoInputUrl}
                        onChange={(e) => setLogoInputUrl(e.target.value)}
                        className="flex-1 bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1b1b] focus:outline-none focus:border-[#420054]"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] transition-all cursor-pointer shrink-0"
                      >
                        Apply URL
                      </button>
                    </form>
                  </div>

                  {/* Reset to Default Button */}
                  {customLogoUrl && (
                    <div className="pt-2 border-t border-[#f0eded]">
                      <button
                        onClick={() => updateCustomLogo(null)}
                        className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-base">restart_alt</span>
                        <span>Reset Logo to Default Qubet SVG Emblem</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Live Preview Box & Preset Sample Options */}
                <div className="bg-[#fcf9f8] p-6 rounded-2xl border border-[#d1c2d0]/50 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#765a16] block mb-3">
                      Live Header Logo Preview (Light & Dark Themes)
                    </span>

                    {/* Light Header Background Preview */}
                    <div className="bg-[#fcf9f8] p-4 rounded-xl border border-[#d1c2d0] mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#807380] uppercase">Light Header:</span>
                      <div className="bg-white px-4 py-2 rounded-lg border border-[#f0eded] shadow-2xs">
                        <QubetLogo variant="light" className="h-9" />
                      </div>
                    </div>

                    {/* Dark Header Background Preview */}
                    <div className="bg-[#1c1b1b] p-4 rounded-xl border border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white/50 uppercase">Dark Drawer / Footer:</span>
                      <div className="px-4 py-2 rounded-lg">
                        <QubetLogo variant="gold" className="h-9" />
                      </div>
                    </div>
                  </div>

                  {/* Sample Preset Logos */}
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#807380] block mb-2">
                      Or pick a sample luxury perfume logo preset:
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          label: 'Crown Emblem',
                          url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&auto=format&fit=crop&q=80',
                        },
                        {
                          label: 'Royal Gold',
                          url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&auto=format&fit=crop&q=80',
                        },
                        {
                          label: 'Monogram',
                          url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&auto=format&fit=crop&q=80',
                        },
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => updateCustomLogo(preset.url)}
                          className="p-2 rounded-xl bg-white border border-[#d1c2d0] hover:border-[#420054] transition-all cursor-pointer text-center group flex flex-col items-center gap-1"
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-10 h-10 object-cover rounded-lg group-hover:scale-105 transition-transform"
                          />
                          <span className="text-[10px] font-bold text-[#420054]">{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Website Banners Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display-lg text-xl font-bold text-[#420054] flex items-center gap-2">
                  <span className="material-symbols-outlined">view_carousel</span>
                  <span>Website Hero Banners</span>
                </h2>

                <button
                  onClick={() => showToast('Version history logs synchronized')}
                  className="px-3 py-1.5 rounded-full border border-[#d1c2d0] text-xs font-semibold text-[#4e434f] hover:bg-white transition-colors cursor-pointer"
                >
                  Version History
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBanners.map((banner: Banner) => (
                  <div
                    key={banner.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#d1c2d0]/40 shadow-2xs flex flex-col justify-between"
                  >
                    <div className="relative h-48 bg-[#e5e2e1] overflow-hidden">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <span
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          banner.status === 'Live'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-amber-500 text-white'
                        }`}
                      >
                        {banner.status}
                      </span>
                    </div>

                    <div className="p-5 flex items-center justify-between bg-white">
                      <div>
                        <h3 className="font-bold text-sm text-[#420054]">{banner.title}</h3>
                        <p className="text-xs text-[#807380] mt-0.5">
                          {banner.resolution} • {banner.updated}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setReplacingItem({ type: 'banner', id: banner.id, name: banner.title })
                        }
                        className="px-4 py-2 rounded-xl bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                      >
                        <span className="material-symbols-outlined text-sm">published_with_changes</span>
                        <span>Replace</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Product Assets Table Section */}
            <section className="bg-white rounded-2xl border border-[#d1c2d0]/40 shadow-2xs p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display-lg text-xl font-bold text-[#420054] flex items-center gap-2">
                    <span className="material-symbols-outlined">inventory_2</span>
                    <span>Product Assets Library</span>
                  </h2>
                  <p className="text-xs text-[#807380]">
                    High-resolution imagery mapped to product SKUs.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="px-4 py-2 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>New Asset / Product</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#1c1b1b]">
                  <thead className="bg-[#f6f3f2] text-[#420054] font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 rounded-l-xl">Preview</th>
                      <th className="p-3.5">Product Name & SKU</th>
                      <th className="p-3.5">Asset Type</th>
                      <th className="p-3.5">Resolution</th>
                      <th className="p-3.5 text-right rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0eded]">
                    {filteredAssets.map((asset: ProductAsset) => (
                      <tr key={asset.id} className="hover:bg-[#fcf9f8] transition-colors">
                        <td className="p-3.5">
                          <img
                            src={asset.preview}
                            alt={asset.productName}
                            className="w-12 h-12 rounded-xl object-cover border border-[#d1c2d0]"
                          />
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-sm text-[#420054] block">
                            {asset.productName}
                          </span>
                          <span className="text-[11px] text-[#807380] font-mono">
                            {asset.sku}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-full bg-[#f0eded] text-[#765a16] text-[10px] font-bold uppercase">
                            {asset.type}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-[#4e434f]">{asset.resolution}</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() =>
                              setReplacingItem({ type: 'asset', id: asset.id, name: asset.productName })
                            }
                            className="px-3.5 py-1.5 rounded-lg bg-[#420054] text-[#ffdf9d] font-bold text-[11px] uppercase tracking-wider hover:bg-[#5d1a6f] transition-all cursor-pointer inline-flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-sm">swap_horiz</span>
                            <span>Replace</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* CUSTOMERS CRM TAB */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl border border-[#d1c2d0]/40 shadow-2xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display-lg text-xl font-bold text-[#420054]">
                  Royal Essence VIP Customers CRM
                </h2>
                <p className="text-xs text-[#807380]">
                  Manage registered customer accounts, loyalty tiers, and purchase metrics.
                </p>
              </div>

              <input
                type="text"
                placeholder="Search customer by name or email..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#420054] w-full sm:w-64"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f6f3f2] text-[#420054] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 rounded-l-xl">Customer Name</th>
                    <th className="p-3.5">Email Address</th>
                    <th className="p-3.5">Completed Orders</th>
                    <th className="p-3.5">Total Spent</th>
                    <th className="p-3.5">VIP Tier</th>
                    <th className="p-3.5 text-right rounded-r-xl">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0eded]">
                  {filteredCustomersList.map((c) => (
                    <tr key={c.id} className="hover:bg-[#fcf9f8] transition-colors">
                      <td className="p-3.5 font-bold text-[#420054]">{c.name}</td>
                      <td className="p-3.5 text-[#807380]">{c.email}</td>
                      <td className="p-3.5 font-semibold text-[#1c1b1b]">{c.orders} Orders</td>
                      <td className="p-3.5 font-bold text-[#765a16]">{c.totalSpent}</td>
                      <td className="p-3.5">
                        <button
                          onClick={() => toggleCustomerVip(c.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            c.isVip
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}
                        >
                          {c.isVip ? '★ VIP Royal Member' : 'Regular Tier'}
                        </button>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => showToast(`Sent VIP $50 Perfume Voucher to ${c.email}`)}
                          className="px-3.5 py-1.5 rounded-lg bg-[#420054] text-[#ffdf9d] font-bold text-[10px] uppercase hover:bg-[#5d1a6f] cursor-pointer"
                        >
                          Send Promo Voucher
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-[#d1c2d0]/40 shadow-2xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display-lg text-xl font-bold text-[#420054]">
                    Sales & Performance Metrics
                  </h2>
                  <p className="text-xs text-[#807380]">
                    Revenue trajectory, average basket size, and customer retention.
                  </p>
                </div>

                <div className="flex gap-2">
                  {(['7d', '30d', '1y'] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setAnalyticsRange(range)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                        analyticsRange === range
                          ? 'bg-[#420054] text-[#ffdf9d]'
                          : 'bg-[#f6f3f2] text-[#807380] hover:bg-[#e8e4e3]'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Performance Gauges */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#420054] mb-1">
                    <span>Perfume Category Revenue ($84,200)</span>
                    <span>65.5%</span>
                  </div>
                  <div className="w-full bg-[#f0eded] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#420054] h-full w-[65.5%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#420054] mb-1">
                    <span>Royal Collections & Gift Sets ($28,100)</span>
                    <span>21.8%</span>
                  </div>
                  <div className="w-full bg-[#f0eded] h-3 rounded-full overflow-hidden">
                    <div className="bg-[#765a16] h-full w-[21.8%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#420054] mb-1">
                    <span>Accessories & Atomizers ($16,150)</span>
                    <span>12.7%</span>
                  </div>
                  <div className="w-full bg-[#f0eded] h-3 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[12.7%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SYSTEM SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-[#d1c2d0]/40 shadow-2xs p-6 sm:p-8 space-y-6">
            <h2 className="font-display-lg text-2xl font-bold text-[#420054]">
              Executive System Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#420054] mb-1">
                    Store Sales Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={storeTaxRate}
                    onChange={(e) => setStoreTaxRate(Number(e.target.value))}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-3 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#420054] mb-1">
                    Free Shipping Threshold ($)
                  </label>
                  <input
                    type="number"
                    value={freeShippingThreshold}
                    onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-3 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4 bg-[#fcf9f8] p-5 rounded-2xl border border-[#d1c2d0]/50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#420054] block">Email Order Alerts</span>
                    <span className="text-[10px] text-[#807380]">Send real-time alerts to pranay.chakraborty@qubetperfume.com</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => {
                      setEmailAlerts(e.target.checked);
                      showToast(`Email alerts ${e.target.checked ? 'enabled' : 'disabled'}`);
                    }}
                    className="w-5 h-5 accent-[#420054] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#f0eded]">
                  <div>
                    <span className="font-bold text-xs text-[#420054] block">Maintenance Mode</span>
                    <span className="text-[10px] text-[#807380]">Temporarily pause store storefront</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => {
                      setMaintenanceMode(e.target.checked);
                      showToast(`Maintenance mode ${e.target.checked ? 'activated' : 'deactivated'}`);
                    }}
                    className="w-5 h-5 accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast('System preferences updated successfully')}
              className="px-6 py-3 rounded-xl bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        )}
      </main>

      {/* ADMIN AVATAR EDIT MODAL */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#d1c2d0]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display-lg text-xl font-bold text-[#420054]">
                Update Admin Profile Picture
              </h3>
              <button
                onClick={() => setShowAvatarModal(false)}
                className="p-1 rounded-full text-[#807380] hover:text-[#1c1b1b] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-[#4e434f] mb-6">
              Current Admin: <strong className="text-[#420054]">Pranay Chakraborty</strong>
            </p>

            <div className="space-y-5">
              {/* Option 1: Upload File */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#420054] mb-2">
                  Upload Profile Picture File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFileUpload}
                  className="w-full text-xs text-[#420054] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#420054] file:text-[#ffdf9d] hover:file:bg-[#5d1a6f] cursor-pointer"
                />
              </div>

              {/* Option 2: Avatar URL */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#420054] mb-2">
                  Or Profile Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={avatarInputUrl}
                    onChange={(e) => setAvatarInputUrl(e.target.value)}
                    className="flex-1 bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl px-3 py-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (avatarInputUrl.trim()) {
                        setUser((prev) => ({ ...prev, avatarUrl: avatarInputUrl.trim() }));
                        setShowAvatarModal(false);
                        setAvatarInputUrl('');
                        showToast('Admin Profile Picture Updated');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#420054] text-[#ffdf9d] text-xs font-bold cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Reset to Default "P" Profile Picture */}
              <div className="pt-3 border-t border-[#f0eded]">
                <button
                  type="button"
                  onClick={() => {
                    setUser((prev) => ({ ...prev, avatarUrl: null }));
                    setShowAvatarModal(false);
                    showToast('Reset profile picture to default "P" badge');
                  }}
                  className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">restart_alt</span>
                  <span>Reset to Default "P" Profile Badge</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REPLACE ASSET/BANNER MODAL */}
      {replacingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#d1c2d0]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display-lg text-xl font-bold text-[#420054]">
                Replace Image Asset
              </h3>
              <button
                onClick={() => setReplacingItem(null)}
                className="p-1 rounded-full text-[#807380] hover:text-[#1c1b1b] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-[#4e434f] mb-6">
              Target Item: <strong className="text-[#420054]">{replacingItem.name}</strong>
            </p>

            <form onSubmit={handleExecuteReplace} className="space-y-4">
              {/* Local File Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-1.5">
                  Upload Local Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleModalFileUpload}
                  className="w-full text-xs text-[#420054] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#420054] file:text-[#ffdf9d] hover:file:bg-[#5d1a6f] cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-2">
                  Or Image URL
                </label>
                <input
                  type="url"
                  required={!newImageUrl}
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-3 text-xs focus:outline-none focus:border-[#420054]"
                />
              </div>

              {/* Sample preset replacements for quick clicking */}
              <div>
                <span className="text-[10px] font-bold uppercase text-[#807380] block mb-2">
                  Or pick a sample preset image:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCN2TgXBSqj0fekSxXGaOaJVOSwA4ssfgoUt_IQOoFDgvDQPUftZh8UICHi6dcUO3bxXWJCwEEGfsqco1GYF2OZYJGbi_qp9JmnJ44GxZouYmFg-FztjaINLID5LjtAQbsJxHm01MWzg6P39DQ4Meui6qaagrahz5cgIm8ErCL4xrymkw6QD5r7SfUcVIeS3DFz_IVM1PdnaG0qYRY8zTn7gUIapAgWXf8hM8V_9qZEIb7JKeou6UiXq-vpNVdOa9a4avvU8Nlq8T4',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdWc1879yXZBPRzmF54M1siiy8sWywIwxw-I_wtU-kJf_FU7tA5KdxOxr7rjfBD4Pfa_fPFAUyhOD3puCVY4yt4CJh9cLSe2nlQrqXy38urnh3Q3n76dw3Y-zMQduTbMF0WDNpDgKLoK5br7CwyrdVoDouhZKialMebXQN3pDGtQdy3SGkYTzc8l1sGqHN7qCX2vgYlEAqxX3DOZ6GBR5_NiQ4kwpeU7i7bEDPPrA58WeAZJc0IJ7kdPInVmcrj5WylkE8kg-A-wk',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDCRKhe3ensRlu-by0y7JgsjKyZ9LxJU4cHHXC2nzLAlhICQ-mOxd2jaT2Z7cQpuw_leH7gFa_Uzv-hCBa-guDUpDTNAjKSd_R9FxTs6admubBPjW5Q9OltvMXHLcvRjjlaaHaERB2u4L10EpnB2LKk2eEHqzXwzLIpFjS-8WfzXBjeFA1fRvizYYwmy3Zr0MkDYWueJC6BbyPFApZTy3tQqvVKcpwg5NkF8cfDPGu277s-ett3hQ530LFy7FMgt9eyCSbEhy4qh6k',
                  ].map((presetUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewImageUrl(presetUrl)}
                      className="h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#420054] focus:border-[#420054] cursor-pointer"
                    >
                      <img src={presetUrl} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setReplacingItem(null)}
                  className="flex-1 py-3 rounded-full border border-[#d1c2d0] text-xs font-bold text-[#4e434f] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] cursor-pointer"
                >
                  Apply Replacement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#d1c2d0] my-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f0eded]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#765a16] block">
                  Product Editor
                </span>
                <h3 className="font-display-lg text-xl font-bold text-[#420054]">
                  Edit Product Name & Details
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded-full text-[#807380] hover:text-[#1c1b1b] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="space-y-4">
              {/* Product Name Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#420054] mb-1">
                  Product Name (Editable)
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-3 text-sm font-bold text-[#420054] focus:outline-none focus:border-[#420054]"
                  placeholder="Enter product name..."
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={editingProduct.subtitle}
                  onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                  className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs text-[#1c1b1b] focus:outline-none"
                  placeholder="e.g. royal & regal notes"
                />
              </div>

              {/* Price & Currency & Category */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-1">
                    Currency
                  </label>
                  <select
                    value={editingProduct.currency}
                    onChange={(e) => setEditingProduct({ ...editingProduct, currency: e.target.value })}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                  >
                    <option value="$">$ (USD)</option>
                    <option value="₹">₹ (INR)</option>
                    <option value="€">€ (EUR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-1">
                    Category
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                  >
                    <option value="Perfume">Perfume</option>
                    <option value="Collection">Collection</option>
                    <option value="Accessories">Accessories</option>
                    <option value="News">News</option>
                  </select>
                </div>
              </div>

              {/* SKU & Fragrance Notes */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-1">
                    Fragrance Notes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editNotesInput}
                    onChange={(e) => setEditNotesInput(e.target.value)}
                    placeholder="Bergamot, Rose, Oud"
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4e434f] mb-1">
                  Full Fragrance Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                  placeholder="Enter full luxury fragrance notes & stories..."
                />
              </div>

              {/* Image Uploader & Preview */}
              <div className="p-4 bg-[#fcf9f8] rounded-2xl border border-[#d1c2d0]/60 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#420054]">
                  Product Image Asset
                </label>

                <div className="flex items-center gap-4">
                  <img
                    src={editingProduct.image}
                    alt={editingProduct.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#d1c2d0] shrink-0"
                  />

                  <div className="flex-1 space-y-2">
                    <div>
                      <span className="text-[10px] text-[#807380] font-bold uppercase block mb-1">
                        Upload Local File
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditProductImageFileUpload}
                        className="w-full text-xs text-[#420054] file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#420054] file:text-[#ffdf9d] cursor-pointer"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-[#807380] font-bold uppercase block mb-1">
                        Or Image URL
                      </span>
                      <input
                        type="url"
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        className="w-full bg-white border border-[#d1c2d0] rounded-lg p-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Flags: Best Seller & Featured */}
              <div className="flex items-center justify-between p-3 bg-[#f6f3f2] rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!editingProduct.isBestSeller}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                    className="w-4 h-4 accent-[#420054] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#420054]">★ Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!editingProduct.isFeatured}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                    className="w-4 h-4 accent-[#420054] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-[#420054]">Featured on Home</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3 border-t border-[#f0eded]">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${editingProduct.name}"?`)) {
                      deleteProduct(editingProduct.id);
                      setEditingProduct(null);
                    }
                  }}
                  className="px-4 py-3 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer"
                >
                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-3 rounded-full border border-[#d1c2d0] text-xs font-bold text-[#4e434f] cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] cursor-pointer"
                >
                  Save Product Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#d1c2d0] my-8">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f0eded]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#765a16] block">
                  New Product Publisher
                </span>
                <h3 className="font-display-lg text-xl font-bold text-[#420054]">
                  Add New Perfume Product
                </h3>
              </div>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="p-1 rounded-full text-[#807380] hover:text-[#1c1b1b] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Amethyst Oud"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-3 text-sm font-bold text-[#420054] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. mystic, regal & seductive"
                  value={newProd.subtitle}
                  onChange={(e) => setNewProd({ ...newProd, subtitle: e.target.value })}
                  className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                    Currency
                  </label>
                  <select
                    value={newProd.currency}
                    onChange={(e) => setNewProd({ ...newProd, currency: e.target.value })}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                  >
                    <option value="$">$ (USD)</option>
                    <option value="₹">₹ (INR)</option>
                    <option value="€">€ (EUR)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                    Category
                  </label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                  >
                    <option value="Perfume">Perfume</option>
                    <option value="Collection">Collection</option>
                    <option value="Accessories">Accessories</option>
                    <option value="News">News</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={newProd.sku}
                    onChange={(e) => setNewProd({ ...newProd, sku: e.target.value })}
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                    Fragrance Notes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newProdNotesInput}
                    onChange={(e) => setNewProdNotesInput(e.target.value)}
                    placeholder="Bergamot, Rose, Oud"
                    className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#4e434f] mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Enter detailed fragrance description..."
                  className="w-full bg-[#f6f3f2] border border-[#d1c2d0] rounded-xl p-2.5 text-xs focus:outline-none"
                />
              </div>

              {/* Image Input Options */}
              <div className="p-4 bg-[#fcf9f8] rounded-2xl border border-[#d1c2d0]/60 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#420054]">
                  Product Image Asset
                </label>

                <div className="flex items-center gap-4">
                  <img
                    src={newProd.image}
                    alt="Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-[#d1c2d0] shrink-0"
                  />

                  <div className="flex-1 space-y-2">
                    <div>
                      <span className="text-[10px] text-[#807380] font-bold uppercase block mb-1">
                        Upload Local File
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewProductImageFileUpload}
                        className="w-full text-xs text-[#420054] file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-[#420054] file:text-[#ffdf9d] cursor-pointer"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-[#807380] font-bold uppercase block mb-1">
                        Or Image URL
                      </span>
                      <input
                        type="url"
                        value={newProd.image}
                        onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                        className="w-full bg-white border border-[#d1c2d0] rounded-lg p-2 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="flex-1 py-3 rounded-full border border-[#d1c2d0] text-xs font-bold text-[#4e434f] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#420054] text-[#ffdf9d] text-xs font-bold uppercase tracking-wider hover:bg-[#5d1a6f] cursor-pointer"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
