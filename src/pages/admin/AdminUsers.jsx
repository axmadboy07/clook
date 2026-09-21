import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { toggleUserBan } from '../../store/slices/authSlice';

export const AdminUsers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.includes(searchTerm)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-obsidian-950)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem' }}>{t('admin.tableUser') || 'Mijoz'}</th>
                <th style={{ padding: '1rem' }}>{t('admin.tableEmail') || 'Email'}</th>
                <th style={{ padding: '1rem' }}>{t('admin.tablePhone') || 'Telefon'}</th>
                <th style={{ padding: '1rem' }}>{t('admin.tableRole') || 'Roli'}</th>
                <th style={{ padding: '1rem' }}>{t('admin.tableJoinedDate') || 'A’zolik Sanasi'}</th>
                <th style={{ padding: '1rem' }}>{t('admin.tableStatus') || 'Holat'}</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>{t('admin.tableAction') || 'Amal'}</th>
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
