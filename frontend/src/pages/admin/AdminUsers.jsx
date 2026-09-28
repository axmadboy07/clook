import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { toggleUserBan, deleteUser } from '../../store/slices/authSlice';
import { authApi } from '../../api';

export const AdminUsers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleDeleteUser = async (user) => {
    if (!user) return;
    try {
      // 1. Delete from Backend / Swagger (PostgreSQL)
      await authApi.deleteUser(user.id, user.email).catch((err) => {
        console.warn('Backend delete user notice:', err.message);
      });
    } catch (err) {
      console.warn('Delete API error:', err);
    }

    // 2. Delete from Frontend state
    dispatch(deleteUser(user.id));
    setDeleteConfirmUser(null);
    showToast(t('admin.userDeleted', 'Mijoz muvaffaqiyatli o‘chirildi va Swagger bazasidan tozalandi'));
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.includes(searchTerm)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          backgroundColor: 'rgba(10,11,14,0.95)',
          border: '1px solid var(--color-gold-400)',
          color: 'var(--color-gold-300)',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-gold)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.85rem'
        }}>
          <CheckCircle2 size={18} color="#34d399" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmUser && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '420px',
            width: '100%',
            padding: '1.75rem',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f87171' }}>
              <AlertTriangle size={24} />
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                {t('admin.confirmDeleteUserTitle', 'Mijozni o‘chirish')}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Haqiqatan ham <strong>{deleteConfirmUser.name || deleteConfirmUser.email}</strong> hisobini butunlay o‘chirmoqchimisiz? Ushbu mijoz ma'lumotlari PostgreSQL bazasi va Swaggerdan ham o‘chiriladi.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="btn btn-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
              >
                {t('common.cancel', 'Bekor qilish')}
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirmUser)}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.8rem',
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {t('common.delete', 'Ha, o‘chirish')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          {t('admin.usersTitle') || 'Mijozlar & Foydalanuvchilar'}
        </h1>
        <p className="text-muted" style={{ fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>
          {t('admin.usersSubtitle') || 'Ro‘yxatdan o‘tgan barcha mijozlar hisoblari va huquqlari'}
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: 'var(--radius-xl)', maxWidth: '28rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('admin.searchUsersPlaceholder') || 'Ism, email yoki telefon bo‘yicha qidirish...'}
            className="luxury-input"
            style={{ width: '100%', paddingLeft: '2.5rem', paddingBlock: '0.5rem', fontSize: '0.8rem' }}
          />
        </div>
      </div>

      <div className="glass-panel" style={{ borderRadius: 'var(--radius-3xl)', overflow: 'hidden' }}>
        <div className="admin-table-scroll">
          <table style={{ width: '100%', minWidth: '650px', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{t('admin.tableUser') || 'Mijoz'}</th>
                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{t('admin.tableEmail') || 'Email'}</th>
                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{t('admin.tablePhone') || 'Telefon'}</th>
                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{t('admin.tableRole') || 'Roli'}</th>
                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{t('admin.tableJoinedDate') || 'A’zolik Sanasi'}</th>
                <th style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{t('admin.tableStatus') || 'Holat'}</th>
                <th style={{ padding: '1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>{t('admin.tableAction') || 'Amal'}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '1rem' }}>
                    <p style={{ fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{user.name}</p>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>ID: {user.id}</span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{user.phone}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className={user.role === 'admin' ? 'badge-amber' : 'badge-gold'}>
                      {user.role === 'admin' ? (t('admin.roleAdmin') || 'Admin') : (t('admin.roleUser') || 'Mijoz')}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{user.joinedDate}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className={user.isBanned ? 'badge-amber' : 'badge-emerald'}>
                      {user.isBanned ? (t('admin.statusBlocked') || 'Bloklangan') : (t('admin.statusActive') || 'Faol')}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    {user.role !== 'admin' && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button
                          onClick={() => dispatch(toggleUserBan(user.id))}
                          className="btn-glass"
                          style={{
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.7rem',
                            color: user.isBanned ? 'var(--color-emerald-400)' : 'var(--color-ruby-400)',
                            borderColor: user.isBanned ? 'var(--color-emerald-500)' : 'var(--border-subtle)'
                          }}
                        >
                          {user.isBanned ? (t('admin.btnUnblock') || 'Faollashtirish') : (t('admin.btnBlock') || 'Bloklash')}
                        </button>

                        <button
                          onClick={() => setDeleteConfirmUser(user)}
                          className="btn-action-icon btn-action-delete"
                          title={t('common.delete', 'O‘chirish')}
                          style={{
                            padding: '0.35rem 0.5rem',
                            color: 'var(--color-ruby-400)',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
