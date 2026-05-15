import { useEffect, useState } from 'react';
import { Table } from '@consta/uikit/Table';
import { apiGorest } from '@/api/apiGorest';
import { usePagination } from '@/hooks/usePagination';
import type { Post } from '@/types';
import styles from './PostsTable.module.css';

interface PostsTableProps {
  onPostClick: (postId: number) => void;
}

interface TableRow {
  id: string;
  originalId: number;
  title: string;
}

export const PostsTable = ({ onPostClick }: PostsTableProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState("")
  
  const { currentPage, goToPage, nextPage, prevPage } = usePagination({
    totalPages,
    initialPage: 1
  });

  const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await apiGorest.getPosts(currentPage, perPage);
        setPosts(response.data);
        const total = response.headers['x-pagination-total'] || 0;
        setTotalPages(Math.ceil(Number(total) / perPage));
      } catch (error) {
        setError('Не удалось загрузить посты. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, perPage]);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    goToPage(1);
  };

  const tableData: TableRow[] = posts.map(post => ({
    id: String(post.id),
    originalId: post.id,
    title: post.title
  }));

  const columns = [
    { title: 'ID', accessor: 'id' as const },
    { title: 'Заголовок', accessor: 'title' as const }
  ];

  const handleRowClick = ({ id }: { id: string; e: React.MouseEvent }) => {
    const row = tableData.find(item => item.id === id);
    if (row) {
      onPostClick(row.originalId);
    }
  };

  if (loading) {
    return <div className={styles.container}>
      <div className={styles.loader}>Загрузка постов...</div>
      </div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <button 
            onClick={fetchPosts} 
            className={styles.retryButton}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!loading && !error && posts.length === 0) {
  return (
    <div className={styles.container}>
      <div className={styles.empty}>Посты не найдены</div>
    </div>
  );
}

  return (
    <div className={styles.container}>
      <Table
        rows={tableData}
        columns={columns}
        onRowClick={handleRowClick}
        emptyRowsPlaceholder="Нет данных"
      />
      
      <div className={styles.pagination}>
        <div className={styles.perPage}>
          <span>Показывать:</span>
          <select value={perPage} onChange={(e) => handlePerPageChange(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        
        <div className={styles.controls}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Предыдущая
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = currentPage;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={currentPage === pageNum ? styles.active : ''}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Следующая
          </button>
        </div>
      </div>
    </div>
  );
};
