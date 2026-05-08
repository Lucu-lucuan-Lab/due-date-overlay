import React from 'react';
import styles from './ServiceGuard.module.css';

export interface ServiceGuardProps {
  isLocked: boolean;
  supportEmail: string;
  customMessage?: string;
  theme?: 'light' | 'dark';
  customerId?: string;
  expirationDate?: string;
  children: React.ReactNode;
}

export const ServiceGuard: React.FC<ServiceGuardProps> = ({
  isLocked,
  supportEmail,
  customMessage,
  theme = 'light',
  customerId,
  expirationDate,
  children
}) => {
  const handleContactSupport = () => {
    window.open(`mailto:${supportEmail}`, '_self');
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={isLocked ? styles.lockedContent : undefined}
        aria-hidden={isLocked}
        data-testid="service-guard-content"
      >
        {children}
      </div>

      {isLocked && (
        <div
          className={`${styles.overlay} ${styles[theme]}`}
          data-testid="service-guard-overlay"
        >
          <div className={styles.modal}>
            <div className={styles.iconContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.warningIcon} aria-hidden="true">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className={styles.title}>Akses Dibatasi</h2>
            <p className={styles.message}>
              {customMessage || 'Masa berlaku layanan telah berakhir. Silakan hubungi administrator untuk pembaruan.'}
            </p>

            {(customerId || expirationDate) && (
              <div className={styles.metaInfo} data-testid="service-guard-meta">
                {customerId && (
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>ID Pelanggan</span>
                    <span>{customerId}</span>
                  </div>
                )}
                {expirationDate && (
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Status</span>
                    <span>Expired sejak {expirationDate}</span>
                  </div>
                )}
              </div>
            )}

            <button
              className={styles.button}
              onClick={handleContactSupport}
            >
              Hubungi Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
