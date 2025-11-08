import { useFavorites } from './favorites.store';

export default function FavoriteButton({ id }) {
  const { has, toggle } = useFavorites();
  const liked = has(id);
  return (
    <button
      type="button"
      aria-label="Yêu thích"
      onClick={() => toggle(id)}
      className={`btn btn-sm ${liked ? 'btn-danger' : 'btn-outline-secondary'}`}
      style={{ borderRadius: 999 }}
      title={liked ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
    >
      {liked ? '♥' : '♡'}
    </button>
  );
}
