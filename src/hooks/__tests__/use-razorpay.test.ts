import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useRazorpay } from '../use-razorpay';
import { loadRazorpayScript } from '@/lib/razorpay';
import { createOrder, verifyPayment } from '@/api/payments';
import { usePaymentStore } from '@/stores/payment-store';

// Mock dependencies
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
    amount: 500,
    currency: 'INR',
    productName: 'Test Product',
    description: 'Test Description',
  };

  it('should initiate payment successfully', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(loadRazorpayScript).mockResolvedValue(true as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(createOrder).mockResolvedValue({ orderId: 'order_123' } as any);

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    expect(loadRazorpayScript).toHaveBeenCalled();
    expect(createOrder).toHaveBeenCalledWith(500, 'INR');
    expect(mockSetProcessing).toHaveBeenCalledWith('order_123');
    
    expect(mockRazorpayConstructor).toHaveBeenCalledWith(expect.objectContaining({
      key: expect.any(String),
      amount: 500,
      currency: 'INR',
      name: 'Test Product',
      description: 'Test Description',
      order_id: 'order_123',
    }));

    expect(mockRazorpayOpen).toHaveBeenCalled();
  });

  it('should not pass order_id if order is mocked', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(loadRazorpayScript).mockResolvedValue(true as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(createOrder).mockResolvedValue({ orderId: 'order_mock_123' } as any);

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    expect(mockRazorpayConstructor).toHaveBeenCalledWith(expect.not.objectContaining({
      order_id: expect.anything(),
    }));
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(loadRazorpayScript).mockResolvedValue(true as any);
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

  it('should handle successful payment verification', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(loadRazorpayScript).mockResolvedValue(true as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(createOrder).mockResolvedValue({ orderId: 'order_123' } as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(verifyPayment).mockResolvedValue({ verified: true } as any);

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    // Extract the handler from the options passed to Razorpay constructor
    const options = mockRazorpayConstructor.mock.calls[0][0];
    const handler = options.handler;

    // Simulate handler being called
    await act(async () => {
      await handler({
        razorpay_payment_id: 'pay_123',
        razorpay_order_id: 'order_123',
        razorpay_signature: 'sig_123',
      });
    });

    expect(verifyPayment).toHaveBeenCalledWith({
      razorpay_payment_id: 'pay_123',
      razorpay_order_id: 'order_123',
      razorpay_signature: 'sig_123',
    });
    expect(mockSetSuccess).toHaveBeenCalledWith('pay_123');
  });

  it('should handle failed payment verification', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(loadRazorpayScript).mockResolvedValue(true as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(createOrder).mockResolvedValue({ orderId: 'order_123' } as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(verifyPayment).mockResolvedValue({ verified: false } as any);

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    const options = mockRazorpayConstructor.mock.calls[0][0];
    const handler = options.handler;

    await act(async () => {
      await handler({
        razorpay_payment_id: 'pay_123',
        razorpay_order_id: 'order_123',
        razorpay_signature: 'sig_123',
      });
    });

    expect(mockSetFailed).toHaveBeenCalledWith('Payment verification failed');
  });

  it('should handle payment verification error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(loadRazorpayScript).mockResolvedValue(true as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(createOrder).mockResolvedValue({ orderId: 'order_123' } as any);
    vi.mocked(verifyPayment).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    const options = mockRazorpayConstructor.mock.calls[0][0];
    const handler = options.handler;

    await act(async () => {
      await handler({
        razorpay_payment_id: 'pay_123',
        razorpay_order_id: 'order_123',
        razorpay_signature: 'sig_123',
      });
    });

    expect(mockSetFailed).toHaveBeenCalledWith('Payment verification failed');
  });

  it('should handle payment dismissal', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(loadRazorpayScript).mockResolvedValue(true as any);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(createOrder).mockResolvedValue({ orderId: 'order_123' } as any);

    const { result } = renderHook(() => useRazorpay());

    await act(async () => {
      await result.current.initiatePayment(paymentConfig);
    });

    const options = mockRazorpayConstructor.mock.calls[0][0];
    const ondismiss = options.modal.ondismiss;

    act(() => {
      ondismiss();
    });

    expect(mockSetFailed).toHaveBeenCalledWith('Payment was cancelled');
  });
});
