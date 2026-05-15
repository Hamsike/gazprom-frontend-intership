import { useEffect, useState } from 'react';
import { Table } from '@consta/uikit/Table';
import { apiGorest } from '@/api/apiGorest';
import { usePagination } from '@/hooks/usePagination';
import type { User } from '@/types';
import styles from './UsersTable.module.css';

interface UsersTableProps {
  onUserClick: (userId: number) => void;
}

interface TableRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  originalId: number;
}

export const UsersTable = ({ onUserClick }: UsersTableProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  
  const { currentPage, goToPage, nextPage, prevPage } = usePagination({
    totalPages,
    initialPage: 1
  });

  const fetchUsers = async () => {
      setLoading(true);
      setError("")
      try {
        const response = await apiGorest.getUsers(currentPage, perPage);
        setUsers(response.data);
        const total = response.headers['x-pagination-total'] || 0;
        setTotalPages(Math.ceil(Number(total) / perPage));
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError("Не удалось загрузить пользователей. Пожалуйста, попробуйте позже.")
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, perPage]);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    goToPage(1);
  };

  const tableData: TableRow[] = users.map(user => ({
    id: String(user.id),
    originalId: user.id,
    firstName: user.name.split(' ')[0] || '',
    lastName: user.name.split(' ').slice(1).join(' ') || '-',
    email: user.email
  }));

  const columns = [
    { title: 'Имя', accessor: 'firstName' as const },
    { title: 'Фамилия', accessor: 'lastName' as const },
    { title: 'Email', accessor: 'email' as const }
  ];

  const handleRowClick = ({ id }: { id: string; e: React.MouseEvent }) => {
    const row = tableData.find(item => item.id === id);
    if (row) {
      onUserClick(row.originalId);
    }
  };

  if (loading) {
    return (<div className={styles.container}>
      <div className={styles.loader}>Загрузка пользователей...</div>
    </div>);
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <button 
            onClick={fetchUsers} 
            className={styles.retryButton}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!loading && !error && users.length === 0) {
  return (
    <div className={styles.container}>
      <div className={styles.empty}>Пользователи не найдены</div>
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
