import AdminCompanyEditor from './AdminCompanyEditor';
import styles from './admin.module.css';

export const metadata = {
  title: 'Website Content | Motal Well Services',
};

export default function AdminPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <h1>Motal Website Content</h1>
        <AdminCompanyEditor />
      </div>
    </main>
  );
}
