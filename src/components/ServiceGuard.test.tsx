import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceGuard } from './ServiceGuard';

describe('ServiceGuard Component', () => {
  it('renders children normally when not locked', () => {
    render(
      <ServiceGuard isLocked={false} supportEmail="test@example.com">
        <div data-testid="child-content">App Content</div>
      </ServiceGuard>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.queryByTestId('service-guard-overlay')).not.toBeInTheDocument();

    const contentWrapper = screen.getByTestId('service-guard-content');
    expect(contentWrapper).not.toHaveClass('lockedContent');
  });

  it('renders overlay when locked and disables pointer events', () => {
    render(
      <ServiceGuard isLocked={true} supportEmail="test@example.com">
        <div data-testid="child-content">App Content</div>
      </ServiceGuard>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByTestId('service-guard-overlay')).toBeInTheDocument();

    // Default text
    expect(screen.getByText('Akses Dibatasi')).toBeInTheDocument();
    expect(screen.getByText('Masa berlaku layanan telah berakhir. Silakan hubungi administrator untuk pembaruan.')).toBeInTheDocument();

    const contentWrapper = screen.getByTestId('service-guard-content');
    expect(contentWrapper).toHaveClass('lockedContent');
  });

  it('displays custom message if provided', () => {
    render(
      <ServiceGuard isLocked={true} supportEmail="test@example.com" customMessage="Please pay your bill.">
        <div>App Content</div>
      </ServiceGuard>
    );

    expect(screen.getByText('Please pay your bill.')).toBeInTheDocument();
  });

  it('applies dark theme correctly', () => {
    render(
      <ServiceGuard isLocked={true} supportEmail="test@example.com" theme="dark">
        <div>App Content</div>
      </ServiceGuard>
    );

    const overlay = screen.getByTestId('service-guard-overlay');
    expect(overlay).toHaveClass('overlay');
    expect(overlay).toHaveClass('dark');
  });

  it('renders meta info (customerId and expirationDate) correctly', () => {
    render(
      <ServiceGuard
        isLocked={true}
        supportEmail="test@example.com"
        customerId="CUST-9981"
        expirationDate="08/05/2026"
      >
        <div>App Content</div>
      </ServiceGuard>
    );

    const metaBox = screen.getByTestId('service-guard-meta');
    expect(metaBox).toBeInTheDocument();

    expect(screen.getByText('CUST-9981')).toBeInTheDocument();
    expect(screen.getByText('Expired sejak 08/05/2026')).toBeInTheDocument();
  });

  it('redirects to mailto link when "Hubungi Support" is clicked', () => {
    const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    render(
      <ServiceGuard isLocked={true} supportEmail="admin@company.com">
        <div>App Content</div>
      </ServiceGuard>
    );

    const button = screen.getByRole('button', { name: /hubungi support/i });
    fireEvent.click(button);

    expect(windowOpenSpy).toHaveBeenCalledWith('mailto:admin@company.com', '_self');

    windowOpenSpy.mockRestore();
  });
});
