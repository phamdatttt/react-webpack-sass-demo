import { Card, CardBody, Badge, Button } from 'reactstrap';
import FavoriteButton from '../features/favorites/FavoriteButton';

export default function RecipeCard({ item, onOpen }) {
  return (
    <Card className="shadow-sm">
      <img className="recipe-thumb" src={item.strMealThumb} alt={item.strMeal} loading="lazy" />
      <CardBody className="d-flex flex-column gap-2">
        <h6 className="m-0" title={item.strMeal}>{item.strMeal}</h6>

        <div className="d-flex justify-content-between align-items-center">
          {item.strCategory && (
            <Badge color="secondary" className="badge-pill">{item.strCategory}</Badge>
          )}
          <FavoriteButton id={item.idMeal} />
        </div>

        <Button color="primary" className="mt-1" onClick={() => onOpen(item.idMeal)}>
          Xem chi tiết
        </Button>
      </CardBody>
    </Card>
  );
}
