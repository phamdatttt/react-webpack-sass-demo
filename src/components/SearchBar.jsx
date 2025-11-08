import { useEffect, useState } from 'react';
import { Input, InputGroup, Button, Spinner } from 'reactstrap';
import useDebounce from '../hooks/useDebounce';

export default function SearchBar({ onSearch, loading }) {
  const [q, setQ] = useState('');
  const dq = useDebounce(q, 350);

  // Gợi ý trực tiếp khi gõ (debounce); vẫn giữ nút Tìm nếu muốn click
  useEffect(() => {
    const s = dq.trim();
    if (s.length >= 2) onSearch(s);
  }, [dq]);

  const submit = (e) => { e.preventDefault(); onSearch(q.trim()); };

  return (
    <form onSubmit={submit} className="search-wrap">
      <InputGroup>
        <Input
          placeholder="Tìm món theo tên, ví dụ: gà, bún, pasta, curry..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button color="primary" type="submit" disabled={!q.trim() || loading}>
          {loading ? <Spinner size="sm" /> : 'Tìm'}
        </Button>
      </InputGroup>
    </form>
  );
}
