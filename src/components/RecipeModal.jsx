import { Modal, ModalHeader, ModalBody, Badge } from 'reactstrap';

function ingredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];
    if (ing && ing.trim()) list.push(`${ing}${mea ? ` - ${mea}` : ''}`);
  }
  return list;
}

export default function RecipeModal({ open, toggle, meal }) {
  if (!meal) return null;
  const ings = ingredients(meal);

  return (
    <Modal isOpen={open} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>{meal.strMeal}</ModalHeader>
      <ModalBody>
        <div className="d-flex gap-3 mb-3">
          <img src={meal.strMealThumb} alt={meal.strMeal} width="260" style={{ borderRadius: 12 }} />
          <div className="flex-grow-1">
            <div className="mb-2">
              {meal.strCategory && <Badge color="secondary" className="badge-pill me-2">{meal.strCategory}</Badge>}
              {meal.strArea && <Badge color="info" className="badge-pill">{meal.strArea}</Badge>}
            </div>
            <h6>Nguyên liệu</h6>
            <ul className="mb-2">
              {ings.map((it, idx) => <li key={idx}>{it}</li>)}
            </ul>
          </div>
        </div>

        <h6>Hướng dẫn</h6>
        <p style={{ whiteSpace: 'pre-wrap' }}>{meal.strInstructions}</p>

        {meal.strYoutube && (
          <p className="mt-3">
            <a href={meal.strYoutube} target="_blank" rel="noreferrer">Xem video trên YouTube</a>
          </p>
        )}
      </ModalBody>
    </Modal>
  );
}
