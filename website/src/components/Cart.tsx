import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@lulu/engine';
import { PaymentOptions } from '@lulu/engine';

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { items, subtotal, add, remove, clear } = useCart();

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      remove(id);
    } else {
      const item = items.find(i => i.id === id);
      if (item) {
        remove(id);
        add({
          ...item,
          qty: newQty,
          total: item.unitPrice * newQty
        });
      }
    }
  };

  const removeItem = (id: string) => {
    remove(id);
  };

  const getTotal = () => {
    return subtotal;
  };

  const clearCart = () => {
    clear();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheckout = () => {
    // In a real app, this would initiate the checkout process
    console.log('Proceeding to checkout with items:', items);
    alert('Checkout functionality would be implemented here');
  };

  return (
    <div className="cart-overlay" onClick={handleBackdropClick}>
      <div className="cart-modal">
        <div className="cart-header">
          <h2>{t('cart')}</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.id}</h4>
                    <p>${item.unitPrice.toFixed(2)} each</p>
                    {item.note && <p style={{ fontStyle: 'italic' }}>Note: {item.note}</p>}
                  </div>
                  
                  <div className="cart-item-controls">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.qty - 1))}
                      className="quantity-btn"
                      disabled={item.qty <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span style={{ minWidth: '2rem', textAlign: 'center' }}>
                      {item.qty}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.qty + 1)}
                      className="quantity-btn"
                    >
                      <Plus size={16} />
                    </button>
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="quantity-btn"
                      style={{ marginLeft: '0.5rem', color: '#dc2626' }}
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <span style={{ minWidth: '4rem', textAlign: 'right', fontWeight: 'bold' }}>
                      ${item.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="cart-total">
                <h3>{t('orderTotal')}: ${getTotal().toFixed(2)}</h3>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {t('checkout')}
                </button>
                
                <button
                  onClick={() => {
                    clearCart();
                    onClose();
                  }}
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                >
                  Clear Cart
                </button>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <PaymentOptions onSelect={(method) => {
                  console.log('Payment method selected:', method);
                  alert(`Payment method selected: ${method}`);
                }} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;