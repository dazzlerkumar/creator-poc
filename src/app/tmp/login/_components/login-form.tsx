'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { authApi } from '@/api/temp';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { COOKIES_KEYS, COOKIES_EXPIRY } from '@/lib/constants';

type LoginFormValues = {
  name: string;
  phoneNumber: string;
  broadcast_id: string;
};

type OtpFormValues = {
  otp: string;
};

/* 
NOTE: refrence_code is internal as Habuild Auth service returns the same keyword.
*/

export function LoginForm() {
  const router = useRouter();

  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [referenceCode, setReferenceCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      name: '',
      phoneNumber: '',
      broadcast_id: '',
    },
  });

  const otpForm = useForm<OtpFormValues>({
    defaultValues: {
      otp: '',
    },
  });

  // Format phone for API (+91 prefix)
  const formatPhoneForApi = (phone: string) => {
    if (phone.length !== 10) {
      return '';
    }
    const cleaned = phone.replace(/\D/g, '');
    return `+91${cleaned}`;
  };

  const onLoginSubmit = async (data: LoginFormValues) => {
    const fullPhoneNumber = formatPhoneForApi(data.phoneNumber);
    try {
      setIsLoading(true);
      // For new users, call send-otp API explicitly
      const result = await authApi.sendOtp({
        phone: fullPhoneNumber,
        purpose: 'login',
        channel: 'sms',
      });

      const otpData = ('data' in result ? result.data : result) as { refrence_code?: string; reference_code?: string };
      const refCode = otpData?.refrence_code || otpData?.reference_code;

      if (refCode) {
        setPhoneNumber(fullPhoneNumber);
        setReferenceCode(refCode);
        setStep('otp');
        toast.success((result as { message?: string })?.message || 'OTP sent successfully!');
      } else {
        const errorMsg = (result as { message?: string })?.message || "Couldn't send OTP. Please try again.";
        toast.error(errorMsg);
      }
    } catch (error: unknown) {
      console.log(error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (data: OtpFormValues) => {
    setError(null);
    try {
      setIsLoading(true);
      const result = await authApi.verifyOtp({
        phone: phoneNumber,
        reference_code: referenceCode,
        otp: data.otp,
      });

      const verifyData = ('data' in result ? result.data : result) as { accessToken?: string; refreshToken?: string; freeMember?: unknown };

      if (verifyData && verifyData.accessToken) {
        toast.success('Login successful!');

        const expiresDays = COOKIES_EXPIRY / (24 * 60 * 60);
        Cookies.set(COOKIES_KEYS.ACCESS_TOKEN, verifyData.accessToken, { secure: true, sameSite: 'lax', expires: expiresDays });
        if (verifyData.refreshToken) {
          Cookies.set(COOKIES_KEYS.REFRESH_TOKEN, verifyData.refreshToken, { secure: true, sameSite: 'lax', expires: expiresDays });
        }
        Cookies.set('USER_DATA', JSON.stringify(verifyData.freeMember), { secure: true, sameSite: 'lax', expires: expiresDays });

        // Clear URL params before redirecting
        router.replace('/join?v=' + loginForm.getValues('broadcast_id'));
      } else {
        const errorMsg = (result as { message?: string })?.message || 'Invalid OTP';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Verification failed. Please try again.';
      setError(errorMessage);
      console.log(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    loginForm.setValue('phoneNumber', value);
  };

  if (step === 'otp') {
    return (
      <form
        onSubmit={otpForm.handleSubmit(onOtpSubmit)}
        className="space-y-6"
      >
        <Controller
          control={otpForm.control}
          name="otp"
          rules={{
            required: 'OTP is required',
            minLength: { value: 6, message: 'OTP must be 6 digits' },
          }}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={field.value}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  field.onChange(val);
                  if (val.length === 6) {
                    otpForm.handleSubmit(onOtpSubmit)();
                  }
                }}
                autoComplete="one-time-code"
                autoFocus
                placeholder="------"
                className={`flex h-12 w-full rounded-md border bg-background px-3 py-2 text-center text-2xl tracking-[0.5em] ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error || fieldState.error ? 'border-red-500' : 'border-input'}`}
              />
              {fieldState.error && (
                <p className="text-[0.8rem] font-medium text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        {error ? (
          <p className="animate-in fade-in slide-in-from-top-1 text-xs font-medium text-red-500">
            {error}
          </p>
        ) : (
          <p className="text-muted-foreground text-xs">
            Enter the 6-digit code sent to your mobile number
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full text-xs"
          onClick={() => {
            setStep('login');
            otpForm.reset();
          }}
        >
          Back to Login
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={loginForm.handleSubmit(onLoginSubmit)}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label htmlFor="phoneNumber">Mobile Number</label>
        <div className="flex gap-2">
          <div className="bg-muted flex items-center rounded-md px-3">
            <span className="text-sm font-medium">+91</span>
          </div>
          <Controller
            control={loginForm.control}
            name="phoneNumber"
            rules={{
              required: 'Mobile number is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Please enter a valid 10-digit number',
              },
            }}
            render={({ field, fieldState }) => (
              <div className="flex-1">
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  {...field}
                  onChange={(e) => {
                    handlePhoneChange(e);
                    field.onChange(e);
                  }}
                  autoComplete="tel"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {fieldState.error && (
                  <p className="mt-2 text-[0.8rem] font-medium text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="broadcast_id">Broadcast Id</label>
        <div className="flex gap-2">
          <Controller
            control={loginForm.control}
            name="broadcast_id"
            rules={{
              required: 'Broadcast ID is required',
            }}
            render={({ field, fieldState }) => (
              <div className="flex-1">
                <input
                  id="broadcast_id"
                  type="text"
                  placeholder="Enter your Broadcast Id"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {fieldState.error && (
                  <p className="mt-2 text-[0.8rem] font-medium text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Continue'}
      </Button>
    </form>
  );
}
