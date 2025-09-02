import React, { useState, useEffect, useMemo } from 'react';
//import { assets, products as catalogProducts, demo_1 } from '../../../data/dummy';
import { useNavigate } from 'react-router-dom'; // keep if you’ll link to product pages later
import {useAuth} from '../../../context/AuthContext'
import { fetchProductsUrgent } from '../../../components/functions/product_functions';
import { assets } from '../../../data/dummy';


function Product_Items({ product, titleOverride }) {
  if (!product) return null;

  const navigate = useNavigate();

  const img = assets[product?.image_url?.[0]] ?? demo_1;
  const nameToShow = titleOverride || product.name;

  return (
    <div className="min-w-[170px] bg-white dark:bg-black">
      {/* Clickable image */}
      <div
        onClick={() => navigate(`/flower/${encodeURIComponent(product.product_id)}`)}
        className="w-full aspect-square overflow-hidden cursor-pointer"
      >
        {img ? (
          <img src={img} alt={nameToShow} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Clickable title */}
      <p
        onClick={() => navigate(`/flower/${encodeURIComponent(product.product_id)}`)}
        className="font-bold text-sm md:text-base pt-3 hover:underline cursor-pointer"
      >
        {nameToShow}
      </p>

      <p className="font-light text-sm py-1">
        from <span className="font-bold text-lg">${product.dynamicPrice}</span>
      </p>
    </div>
  );
}

// ---- Config ----
const API_URL = 'https://rec-server-app.onrender.com/api/v1/recommend';
//const DUMMY_USER_ID = 2; // Replace real user ID when integrate

const SECTION_LABELS = ['History', 'Cross-sell', 'Occasion', 'Best'];

const SECTION_SUBTITLES = {
  'History': 'You may like',
  'Cross-sell': 'You may want',
  'Occasion': 'For up comming event',
  'Best': 'Best selling',
};

const extractColor = (obj, product) => {
  let c = (obj?.color || '').trim();
  if (!c && Array.isArray(product?.colors) && product.colors.length) {
    c = String(product.colors[0]).trim();
  }
  if (!c) return '';
  // remove trailing "Flower"/"Flowers" (e.g., "White Flowers" -> "White")
  c = c.replace(/\s*flowers?$/i, '').trim();
  return c;
};

const Dashboard_Recommend = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const {user} = useAuth()
  const [catalogProducts, setCatalogProducts] = useState([])
  const [productsById, setProductsById] = useState([])

  const handleProducts = (products = []) => {
    const map = {};
    (products || []).forEach(p => {
      const key = p?.product_id != null ? String(p.product_id) : '';
      if (key) map[key] = p;
    });
    setProductsById(map);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErr(null);

        // Fetch urgent catalog first
        await fetchProductsUrgent({ setter: setCatalogProducts, setter2: handleProducts });

        // Then fetch recommendations
        const res = await fetch(`${API_URL}?user_id=${encodeURIComponent(user?.id ?? user?._id)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);

      } catch (e) {
        setErr(String(e));
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);


  if (!loading && err) return null;

  return (
  <div className="bg-gray-100 w-full flex flex-col gap-4 px-4 md:px-8 lg:px-16 md:pt-10 py-8">
    <p className='font-semibold text-xl md:text-2xl lg:text-4xl text-purple-700'>Recommendation</p>

    {loading ? (
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 h-[260px] animate-pulse">
              <div className="h-6 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-40 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    ) : (
      // ---- build only the sections that have a valid product ----
      (() => {
        const sectionsWithProducts = (SECTION_LABELS || [])
          .map((label, i) => {
            const obj = items?.[i] || null;
            const key = obj?.product_id != null ? String(obj.product_id) : '';
            const product = key ? productsById[key] : null;
            if (!product) {
              if (key) console.warn(`Skipping "${label}" – missing product_id ${key} in catalog`);
              return null;
            }

            // Title shown under the image (product name override)
            const color = extractColor(obj, product);
            const titleOverride = color ? `${color} ${product.name}` : undefined;

            // Title shown at the top of the card (green text)
            let cardTitle = SECTION_SUBTITLES[label];
            if (label === 'Occasion' && obj?.event) {
              cardTitle = `Flower for ${obj.event}`;
            }

            return { label, product, titleOverride, cardTitle };
          })
          .filter(Boolean);

        if (!sectionsWithProducts.length) return null;

        return (
          <div className="flex flex-wrap justify-center gap-6">
            {sectionsWithProducts.map(({ label, product, titleOverride, cardTitle }) => (
              <div key={label} className="bg-white flex-none rounded-xl shadow-lg p-6 w-[250px] md:w-[300px]">
                <div className="min-h-[64px] flex items-center justify-center text-center">
                  <h3 className="text-xl font-semibold text-purple-600 leading-tight">
                    {cardTitle}
                  </h3>
                </div>
                <Product_Items product={product} titleOverride={titleOverride} />
              </div>
            ))}
          </div>
        );
      })()
      )}
    </div>
  );
};

export default Dashboard_Recommend;
