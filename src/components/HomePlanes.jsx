import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import banner from '../assets/img/banner.jpg'
import Logo from '../assets/img/Logo.png'
import useCrud from '../hook/UseCrud'
import { API_URL } from '../../ConfigUrl'
import { useLocation, useNavigate } from 'react-router-dom'

const plans = [
  {
    name: 'Plan Estándar',
    price: '€ 0.00',
    color: 'text-green-400',
    border: 'border-green-500',
    button: 'bg-green-500 hover:bg-green-600',
    buttonText: '¡Quiero comenzar!',
    features: [
      '25 lecciones básicas trading',
      'Lecciones sobre cómo invertir en la bolsa de valores',
    ],
    priceColor: 'text-green-300',
    buttonTextColor: 'text-white',
    isFree: true,
  },
  {
    name: 'Plan Mensual',
    price: '€ 5.99',
    color: 'text-yellow-400',
    border: 'border-yellow-500',
    button: 'bg-yellow-400 hover:bg-yellow-500',
    buttonText: '¡Quiero comenzar!',
    features: [
      'Suscripción mensual',
      'Acceso a más 100 Lecciones avanzadas de trading',
    ],
    priceColor: 'text-yellow-300',
    buttonTextColor: 'text-black',
    priceId: import.meta.env.VITE_STRIPE_MONTHLY_PRICE_ID,
    isFree: false,
  },
  {
    name: 'Plan Anual',
    price: '€ 10.99',
    color: 'text-red-500',
    border: 'border-red-500',
    button: 'bg-red-600 hover:bg-red-700',
    buttonText: '¡Quiero comenzar!',
    features: [
      'Todas las ventajas anteriores',
      'Tutoria online con uno de los agentes de nuestro equipo',
    ],
    priceColor: 'text-red-400',
    buttonTextColor: 'text-white',
    priceId: import.meta.env.VITE_STRIPE_YEARLY_PRICE_ID,
    isFree: false,
  },
]

const HomePlanes = () => {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const { postApi: postStripeSession } = useCrud(`${API_URL}/stripe/crearsesion`);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('showWelcomeToast')) {
      toast.dismiss('welcome-toast')
      toast.success('Bienvenido a SV7- Trading Academy', {
        id: 'welcome-toast',
        position: 'top-right',
        duration: 2000,
        style: {
          background: '#10B981',
          color: 'white',
          borderRadius: '8px',
          padding: '16px',
        },
      });
      localStorage.removeItem('showWelcomeToast');
    }
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    if (status === 'success') {
      toast.success('¡Pago realizado con éxito! Ya tienes acceso al plan premium.');
    } else if (status === 'cancel') {
      toast.error('El pago fue cancelado o falló. No se realizó ningún cargo.');
    }
  }, [location]);

  const handleBuy = async (plan) => {
    setLoadingPlan(plan.name);
    try {
      const firebaseUser = JSON.parse(localStorage.getItem('firebaseUser'));
      if (!firebaseUser || !firebaseUser.uid) {
        toast.error('Debes iniciar sesión para comprar un plan.');
        setLoadingPlan(null);
        return;
      }
      const uid = firebaseUser.uid;
      if (plan.isFree) {
        toast.success('Bienvenido al plan gratuito.');
        setLoadingPlan(null);
        navigate('/dashboardfree');
        return;
      }
      const data = await postStripeSession({ uid, priceId: plan.priceId });
      if (data && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data?.message || 'Error al crear la sesión de pago');
      }
    } catch (error) {
      toast.error(error.message || 'Error al procesar el plan');
      setLoadingPlan(null);
    }
  };

  return (
    <>
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start px-2 sm:px-0"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="w-full flex justify-center mt-5 mb-2">
        <img src={Logo} alt="Logo S7V" className="h-24 sm:h-32 drop-shadow-lg" />
      </div>
      <div className="flex flex-col md:flex-row  cursor-pointer items-center justify-center gap-6 mt-2 sm:mt-6 w-4xl max-w-5xl">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`flex flex-col justify-between bg-neutral-800 bg-opacity-80 rounded-xl border-2 ${plan.border} shadow-[0_0_18px_2px_rgba(234,179,8,0.3)] p-6 w-80 min-h-[370px] max-w-xs text-center transition-transform hover:scale-105`}
          >
            <div>
              <h3 className={`text-4xl font-extrabold mb-2 ${plan.color}`}>{plan.name}</h3>
              <br />
              <div className={`text-xl font-bold border-t mb-2 ${plan.priceColor}`}>{plan.price}</div>
              <br />
              <ul className="mb-4 space-y-1">
                {plan.features.map((f, i) => (
                  <li key={i} className={i === 0 ? `${plan.color} font-semibold` : 'text-gray-200'}>{f}</li>
                ))}
              </ul>
            </div>
            <button
              className={`mt-2 py-2 cursor-pointer rounded-md font-bold ${plan.button} ${plan.buttonTextColor} border-2 ${plan.border} transition focus:outline-none focus:ring-2 focus:ring-yellow-400 flex items-center justify-center`}
              onClick={() => handleBuy(plan)}
              disabled={loadingPlan === plan.name}
            >
              {loadingPlan === plan.name ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              ) : (
                plan.buttonText
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default HomePlanes