import { useEffect, useState } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import RecipeModal from '../components/RecipeModal';
import { lookupById } from '../services/mealApi';
import { useFavorites } from '../features/favorites/favorites.store';

export default function Favorites() {
  const { ids } = useFavorites();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);
  const [open, setOpen] = useState(false);

  // Tải danh sách món từ các id đã lưu
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const arr = [];
        for (const id of ids) {
          const m = await lookupById(id);
          if (m) arr.push(m);
        }
        setItems(arr);
      } finally {
        setLoading(false);
      }
    })();
  }, [ids]);

  // Handler mở chi tiết (giống App)
  const openDetail = async (id) => {
    setLoading(true);
    try {
      const meal = await lookupById(id);
      setDetail(meal);
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4 className="mb-3">Món đã lưu ({ids.length})</h4>

      {loading && (
        <div className="grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton" />
          ))}
        </div>
      )}

      {!loading && (ids.length ? (
        <RecipeGrid items={items} onOpen={openDetail} />
      ) : (
        <p className="text-muted">Chưa có món nào. Về Trang chủ để thêm ♥.</p>
      ))}

      <RecipeModal open={open} toggle={() => setOpen(false)} meal={detail} />
    </>
  );
}
