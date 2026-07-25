import AdminContentEditor from './AdminContentEditor';
import styles from './admin.module.css';

export const metadata = {
  title: 'Website Content | Motal Well Services',
};

export default function AdminPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <h1>Motal Website Content</h1>
        <AdminContentEditor />
      </div>
    </main>
  );
}
