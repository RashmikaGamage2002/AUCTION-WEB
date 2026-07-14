import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

export default function Payment() {
  const { orderId } = useParams();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);
  const deliveryCharge = 500;

  useEffect(()=>{
    // fetch order from backend
    const fetchOrder = async () => {
      try {
        const res = await fetch(`https://localhost:7172/api/orders/${orderId}`, {
          headers: user?.token ? { 'Authorization': 'Bearer ' + user.token } : {}
        });
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
        // fallback demo order
        setOrder({ id: orderId, productName: 'Demo Item', price: 2000 });
      }
    };
    fetchOrder();
  }, [orderId, user]);

  if (!order) return <p>Loading order...</p>;

  const total = order.price + deliveryCharge;

  const handlePay = async () => {
    try {
      // try calling backend payment endpoint
      const res = await fetch('https://localhost:7172/api/payments/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(user?.token ? { 'Authorization': 'Bearer ' + user.token } : {}) },
        body: JSON.stringify({ orderId: order.id, amount: total })
      });
      if (!res.ok) {
        // fallback local success simulation
        toast.success('Payment simulated locally (no backend)');
        return;
      }
      const data = await res.json();
      toast.success('Payment successful: ' + (data.status || 'OK'));
    } catch (err) {
      console.error(err);
      toast.success('Payment simulated locally (network)');
    }
  };

  return (
    <div style={{maxWidth:560, margin:'0 auto'}}>
      <h3>Payment</h3>
      <div className="card">
        <p>Product: {order.productName}</p>
        <p>Winning Bid: Rs. {order.price}</p>
        <p>Delivery Charge: Rs. {deliveryCharge}</p>
        <hr />
        <h4>Total: Rs. {total}</h4>
        <button className="btn" onClick={handlePay}>Proceed to Payment</button>
      </div>
    </div>
  );
}
