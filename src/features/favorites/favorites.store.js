import useLocalStorage from '../../hooks/useLocalStorage';

export function useFavorites() {
  const [ids, setIds] = useLocalStorage('fav_meals', []);
  const has = (id) => ids.includes(id);
  const toggle = (id) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  return { ids, has, toggle };
}
