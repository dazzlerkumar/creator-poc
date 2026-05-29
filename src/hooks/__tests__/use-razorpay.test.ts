import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach, Mock } from 'vitest';
import { useRazorpay } from '../use-razorpay';
import { loadRazorpayScript } from '@/lib/razorpay';
import { createOrder, verifyPayment } from '@/api/payments';
import { usePaymentStore } from '@/stores/payment-store';

vi.mock('@/lib/razorpay', () => ({
  loadRazorpayScript: vi.fn(),
}));

vi.mock('@/api/payments', () => ({
  createOrder: vi.fn(),
  verifyPayment: vi.fn(),
}));

vi.mock('@/stores/payment-store', () => ({
  usePaymentStore: vi.fn(),
}));

vi.mock('@/lib/local-storage', () => ({
  default: {
    set: vi.fn(),
    get: vi.fn(),
    remove: vi.fn(),
    clear: vi.fn(),
  }
}));

describe('useRazorpay', () => {
  const mockSetProcessing = vi.fn();
  const mockSetSuccess = vi.fn();
  const mockSetFailed = vi.fn();

  const mockRazorpayOpen = vi.fn();
  let mockRazorpayConstructor: Mock;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(usePaymentStore).mockReturnValue({
      setProcessing: mockSetProcessing,
      setSuccess: mockSetSuccess,
      setFailed: mockSetFailed,
    } as unknown as ReturnType<typeof usePaymentStore>);

    mockRazorpayConstructor = vi.fn();
    const RazorpayMock = function(this: Record<string, unknown>, options: Record<string, unknown>) {
      mockRazorpayConstructor(options);
      this.open = mockRazorpayOpen;
    };

    Object.defineProperty(window, 'Razorpay', {
      value: RazorpayMock,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    delete (window as unknown as Record<string, unknown>).Razorpay;
  });

  const paymentConfig = {
    planId: 42,
    amount: 99900,
    currency: 'INR',
    phoneNumber: '+919876543210',
    memberName: 'Test User',
    memberEmail: 'test@example.com',
    regionCode: 'IND',
    productName: 'Test Product',
    description: 'Test Description',
  };

  const mockOrderResponse = {
    id: 'uuid-internal-order-123',
    orderId: 'uuid-internal-order-123',
    plan_id: 42,
    amount: 99900,
    currency: 'INR',
    status: 'created',
    member_name: 'Test User',
    member_email: 'test@example.com',
    phone_number: '+919876543210',
    gateway_id: 1,
    gateway_order_id: 'order_RAZORPAY_123',
    metadata: {},
    created_at: '2026-05-21T10:00:00.000Z',
    updated_at: '2026-05-21T10:00:00.000Z',
  };

  it('should create order with full payload and open Razorpay', async () => {
    vi.mocked(loadRazorpayScript).mockResolvedValue(undefined);
    vi.mocked(createOrder).mockResolvedValue(mockOrderResponse);

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    expect(loadRazorpayScript).toHaveBeenCalled();
    expect(createOrder).toHaveBeenCalledWith({
      plan_id: 42,
      amount: 99900,
      currency: 'INR',
      phone_number: '+919876543210',
      member_name: 'Test User',
      member_email: 'test@example.com',
      region_code: 'IND',
    });
    expect(mockSetProcessing).toHaveBeenCalledWith(
      'uuid-internal-order-123',
      'order_RAZORPAY_123',
    );

    const LocalStorageService = (await import('@/lib/local-storage')).default;
    expect(LocalStorageService.set).toHaveBeenCalledWith(
      'habuild-audience-payment-internal-order-id',
      'uuid-internal-order-123'
    );
    expect(LocalStorageService.set).toHaveBeenCalledWith(
      'habuild-audience-payment-gateway-order-id',
      'order_RAZORPAY_123'
    );

    expect(mockRazorpayConstructor).toHaveBeenCalledWith(expect.objectContaining({
      key: expect.any(String),
      amount: 99900,
      currency: 'INR',
      name: 'Test Product',
      description: 'Test Description',
      order_id: 'order_RAZORPAY_123',
      prefill: {
        contact: '+919876543210',
        name: 'Test User',
        email: 'test@example.com',
      },
    }));

    expect(mockRazorpayOpen).toHaveBeenCalled();
  });

  it('should handle failure when loading script fails', async () => {
    const error = new Error('Script load failed');
    vi.mocked(loadRazorpayScript).mockRejectedValue(error);

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    expect(mockSetFailed).toHaveBeenCalledWith('Script load failed');
    expect(createOrder).not.toHaveBeenCalled();
    expect(mockRazorpayOpen).not.toHaveBeenCalled();
  });

  it('should handle failure when creating order fails', async () => {
    vi.mocked(loadRazorpayScript).mockResolvedValue(undefined);
    const error = new Error('Order creation failed');
    vi.mocked(createOrder).mockRejectedValue(error);

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    expect(mockSetFailed).toHaveBeenCalledWith('Order creation failed');
    expect(mockSetProcessing).not.toHaveBeenCalled();
    expect(mockRazorpayOpen).not.toHaveBeenCalled();
  });

  it('should verify payment with internal order_id and signature', async () => {
    vi.mocked(loadRazorpayScript).mockResolvedValue(undefined);
    vi.mocked(createOrder).mockResolvedValue(mockOrderResponse);
    vi.mocked(verifyPayment).mockResolvedValue({
      id: 'payment-uuid',
      order_id: 'uuid-internal-order-123',
      gateway_id: 1,
      gateway_payment_id: 'pay_RAZORPAY_456',
      gateway_signature: 'sig_123',
      status: 'success',
      amount: 99900,
      currency: 'INR',
      amount_refunded: 0,
      receipt: 'receipt_XXXX',
      phone_number: '+919876543210',
      metadata: {},
      settlement_id: null,
      settled_at: null,
      created_at: '2026-05-21T10:00:05.000Z',
      updated_at: '2026-05-21T10:00:05.000Z',
    });

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    const options = mockRazorpayConstructor.mock.calls[0]![0];
    const handler = options.handler;

    await act(async () => {
      await handler({
        razorpay_payment_id: 'pay_RAZORPAY_456',
        razorpay_order_id: 'order_RAZORPAY_123',
        razorpay_signature: 'sig_123',
      });
    });

    expect(verifyPayment).toHaveBeenCalledWith({
      order_id: 'uuid-internal-order-123',
      razorpay_payment_id: 'pay_RAZORPAY_456',
      signature: 'sig_123',
    });
    expect(mockSetSuccess).toHaveBeenCalledWith('pay_RAZORPAY_456');

    const LocalStorageService = (await import('@/lib/local-storage')).default;
    expect(LocalStorageService.set).toHaveBeenCalledWith(
      'habuild-audience-payment-done',
      true
    );
    expect(LocalStorageService.set).toHaveBeenCalledWith(
      'habuild-audience-payment-gateway-payment-id',
      'pay_RAZORPAY_456'
    );
  });

  it('should handle failed payment verification', async () => {
    vi.mocked(loadRazorpayScript).mockResolvedValue(undefined);
    vi.mocked(createOrder).mockResolvedValue(mockOrderResponse);
    vi.mocked(verifyPayment).mockResolvedValue({
      id: 'payment-uuid',
      order_id: 'uuid-internal-order-123',
      gateway_id: 1,
      gateway_payment_id: 'pay_RAZORPAY_456',
      gateway_signature: 'sig_123',
      status: 'failed',
      amount: 99900,
      currency: 'INR',
      amount_refunded: 0,
      receipt: '',
      phone_number: '+919876543210',
      metadata: {},
      settlement_id: null,
      settled_at: null,
      created_at: '2026-05-21T10:00:05.000Z',
      updated_at: '2026-05-21T10:00:05.000Z',
    });

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    const options = mockRazorpayConstructor.mock.calls[0]![0];
    const handler = options.handler;

    await act(async () => {
      await handler({
        razorpay_payment_id: 'pay_RAZORPAY_456',
        razorpay_order_id: 'order_RAZORPAY_123',
        razorpay_signature: 'sig_123',
      });
    });

    expect(mockSetFailed).toHaveBeenCalledWith('Payment verification failed');
  });

  it('should handle payment verification network error', async () => {
    vi.mocked(loadRazorpayScript).mockResolvedValue(undefined);
    vi.mocked(createOrder).mockResolvedValue(mockOrderResponse);
    vi.mocked(verifyPayment).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    const options = mockRazorpayConstructor.mock.calls[0]![0];
    const handler = options.handler;

    await act(async () => {
      await handler({
        razorpay_payment_id: 'pay_RAZORPAY_456',
        razorpay_order_id: 'order_RAZORPAY_123',
        razorpay_signature: 'sig_123',
      });
    });

    expect(mockSetFailed).toHaveBeenCalledWith('Payment verification failed');
  });

  it('should handle payment dismissal', async () => {
    vi.mocked(loadRazorpayScript).mockResolvedValue(undefined);
    vi.mocked(createOrder).mockResolvedValue(mockOrderResponse);

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    const options = mockRazorpayConstructor.mock.calls[0]![0];
    const ondismiss = options.modal.ondismiss;

    act(() => {
      ondismiss();
    });

    expect(mockSetFailed).toHaveBeenCalledWith('Payment was cancelled');
  });
});
