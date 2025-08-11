import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // keep if you’ll link to product pages later

// ---- Config ----
const API_URL = 'http://127.0.0.1:8000/api/v1/recommend';
const DUMMY_USER_ID = 3; // Replace real user ID when integrate

const SECTION_LABELS = ['History', 'Cross-sell', 'Occasion', 'Best'];

const Dashboard_Recommend = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(`${API_URL}?user_id=${encodeURIComponent(DUMMY_USER_ID)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Expecting: [historyObj, crossObj, occasionObj, bestObj]
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(String(e));
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  const renderProductId = (_section, obj) => {
   if (!obj) return '—';
   return obj.product_id || '—';
  };

  const renderSubtext = (obj) => {
    if (!obj) return '';
    // Optional: show color or event when present
    if (obj.event) return obj.event;
    if (obj.color) return obj.color;
    return '';
  };

  return (
    <div className="bg-gray-100 w-full flex flex-col gap-4 pt-4 px-4 md:px-8 lg:px-16">
      <p className="font-semibold text-2xl mx-auto">Recommendation</p>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0,1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 h-[260px] animate-pulse">
              <div className="h-6 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-5 w-40 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && err && (
        <div className="text-red-600 text-center">
          Failed to load recommendations: {err}
        </div>
      )}

      {!loading && !err && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTION_LABELS.map((label, i) => {
            const obj = items?.[i] || null;
            return (
              <div
                key={label}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">{label}</h3>
                  <p className="text-sm text-gray-500 mb-4">flag: {obj?.flag || label.toLowerCase()}</p>
                  <p className="text-3xl font-semibold text-gray-900 break-words">
                    {renderProductId(label, obj)}
                  </p>
                  {renderSubtext(obj) && (
                    <p className="mt-2 text-gray-600">{renderSubtext(obj)}</p>
                  )}
                </div>

                {/* Optional: button to view product or section */}
                {/* <button
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                  onClick={() => navigate(`/product/${renderPrimaryIdForRoute(label, obj)}`)}
                >
                  VIEW
                </button> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard_Recommend;
