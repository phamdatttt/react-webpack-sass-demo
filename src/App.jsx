import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';
import { searchMeals, listCategories, filterByCategory, lookupById } from './services/mealApi';
import './styles/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [activeCat, setActiveCat] = useState(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  // >>> state cho LOAD-MORE
  const [visible, setVisible] = useState(12); // số card hiện trên grid

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  useEffect(() => {
    (async () => {
      setCats(await listCategories());
      setLoading(true);
      const initial = await searchMeals('chicken'); // gợi ý ban đầu
      setItems(initial);
      setVisible(12); // reset số lượng hiển thị
      setLoading(false);
    })();
  }, []);

  // reset lại visible mỗi khi nguồn dữ liệu items thay đổi (search/filter mới)
  useEffect(() => { setVisible(12); }, [items]);

  const onSearch = async (q) => {
    setError('');
    setActiveCat(null);
    setLoading(true);
    try {
      const data = await searchMeals(q);
      setItems(data);
      if (!data.length) setError(`Không tìm thấy món nào cho “${q}”.`);
    } catch {
      setError('Có lỗi khi tìm món. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const onFilter = async (cat) => {
    setError('');
    setActiveCat(cat);
    setLoading(true);
    try {
      if (!cat) {
        setItems(await searchMeals('chicken'));
      } else {
        setItems(await filterByCategory(cat));
      }
    } catch {
      setError('Có lỗi khi tải danh mục.');
    } finally {
      setLoading(false);
    }
  };

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

  // danh sách thực sự render theo "visible"
  const shown = items.slice(0, visible);
  const canLoadMore = visible < items.length;

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col className="d-flex justify-content-between align-items-center">
          <h4 className="m-0"></h4>
          <div className="d-flex gap-2">
            <Button
              outline
              color="secondary"
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
              className={classNames(theme === 'dark' && 'active')}
              title="Chuyển chế độ sáng/tối"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
          </div>
        </Col>
      </Row>

      <SearchBar onSearch={onSearch} loading={loading} />
      <Filters categories={cats} active={activeCat} onChange={onFilter} />

      {error && <Alert color="danger">{error}</Alert>}

      {loading && (
        <div className="grid">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton" />)}
        </div>
      )}

      {!loading && (
        <>
          <RecipeGrid items={shown} onOpen={openDetail} />

          {canLoadMore && (
            <div className="d-flex justify-content-center my-3">
              <Button
                outline
                color="primary"
                onClick={() => setVisible(v => v + 12)}
              >
                Tải thêm
              </Button>
            </div>
          )}

          {!error && items.length === 0 && (
            <div className="text-center text-muted py-4">Chưa có dữ liệu để hiển thị.</div>
          )}
        </>
      )}

      <RecipeModal open={open} toggle={() => setOpen(false)} meal={detail} />
    </Container>
  );
}
