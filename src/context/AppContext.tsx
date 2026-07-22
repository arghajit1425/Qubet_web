import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ViewMode, Product, CartItem, Banner, ProductAsset, User } from '../types';
import { INITIAL_PRODUCTS, INITIAL_BANNERS, INITIAL_ASSETS } from '../data';

interface AppContextType {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  banners: Banner[];
  replaceBanner: (bannerId: string, newImage: string) => void;
  assets: ProductAsset[];
  replaceAsset: (assetId: string, newImage: string) => void;
  customLogoUrl: string | null;
  updateCustomLogo: (newLogoUrl: string | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('qubet_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('qubet_wishlist');
    return saved ? JSON.parse(saved) : ['p1'];
  });
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('qubet_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Pranay Chakraborty',
          email: 'pranay.chakraborty@qubetperfume.com',
          isLoggedIn: true,
          isAdmin: true,
          avatarUrl: null,
        };
  });

  useEffect(() => {
    localStorage.setItem('qubet_user', JSON.stringify(user));
  }, [user]);

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('qubet_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('qubet_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [assets, setAssets] = useState<ProductAsset[]>(() => {
    const saved = localStorage.getItem('qubet_assets');
    return saved ? JSON.parse(saved) : INITIAL_ASSETS;
  });

  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('qubet_custom_logo') || null;
  });

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('qubet_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('qubet_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('qubet_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('qubet_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('qubet_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    if (customLogoUrl) {
      localStorage.setItem('qubet_custom_logo', customLogoUrl);
    } else {
      localStorage.removeItem('qubet_custom_logo');
    }
  }, [customLogoUrl]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from favorites');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to favorites');
        return [...prev, productId];
      }
    });
  };

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProd,
      id: 'p_' + Date.now(),
    };
    setProducts((prev) => [product, ...prev]);
    showToast(`Added product "${product.name}"`);
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? updatedProd : p))
    );
    showToast(`Updated product "${updatedProd.name}"`);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog');
  };

  const replaceBanner = (bannerId: string, newImage: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === bannerId ? { ...b, image: newImage, updated: 'Updated just now' } : b))
    );
    showToast('Banner image replaced successfully');
  };

  const replaceAsset = (assetId: string, newImage: string) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === assetId ? { ...a, preview: newImage } : a))
    );
    showToast('Product asset updated');
  };

  const updateCustomLogo = (newLogoUrl: string | null) => {
    setCustomLogoUrl(newLogoUrl);
    if (newLogoUrl) {
      showToast('Brand Logo updated successfully!');
    } else {
      showToast('Logo reset to default Qubet emblem');
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        user,
        setUser,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        banners,
        replaceBanner,
        assets,
        replaceAsset,
        customLogoUrl,
        updateCustomLogo,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        toastMessage,
        showToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
