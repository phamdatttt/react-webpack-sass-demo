import RecipeCard from './RecipeCard';

export default function RecipeGrid({ items, onOpen }) {
  if (!items?.length) return null;
  return (
    <div className="grid">
      {items.map(m => (
        <RecipeCard key={m.idMeal} item={m} onOpen={onOpen} />
      ))}
    </div>
  );
}
