import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE = process.env.REACT_APP_API_URL;

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');
  const transactionId = searchParams.get('transaction_id'); // Only exists for Flutterwave

  const verifyPayment = async () => {
    if (!token) return;

    try {
      if (transactionId) {
        const res = await axios.post(backendUrl + `${API_BASE}/api/order/verifyFlutterwave`, { transactionId, orderId }, { headers: { token } }
        );
        if (res.data.success) {
          setCartItems({});
          navigate('/orders');
        } else {
          navigate('/cart');
        }
      } else {
        // Stripe
        const res = await axios.post(backendUrl + `${API_BASE}/api/order/verifyStripe`, { success, orderId },{ headers: { token } }
        );
        if (res.data.success) {
          setCartItems({});
          navigate('/orders');
        } else {
          navigate('/cart');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || err.message);
      navigate('/cart');
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div>
      {verifying ? 'Verifying your payment...' : 'Redirecting...'}
    </div>
  );
};

export default Verify;