const API = 'https://www.themealdb.com/api/json/v1/1';

const ok = async (res) => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data;
};

export const searchMeals = async (q) => {
  // search by name
  const data = await ok(await fetch(`${API}/search.php?s=${encodeURIComponent(q)}`));
  return data.meals || [];
};

export const listCategories = async () => {
  const data = await ok(await fetch(`${API}/list.php?c=list`));
  return (data.meals || []).map(m => m.strCategory);
};

export const filterByCategory = async (cat) => {
  const data = await ok(await fetch(`${API}/filter.php?c=${encodeURIComponent(cat)}`));
  // filter API chỉ trả idMeal, strMeal, strMealThumb
  return data.meals || [];
};

export const lookupById = async (id) => {
  const data = await ok(await fetch(`${API}/lookup.php?i=${id}`));
  return data.meals?.[0] || null;
};
