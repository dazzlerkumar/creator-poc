'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { LogIn, ShieldAlert } from 'lucide-react'
import { authApi } from '@/api/auth'
import { signIdentityToken } from '@/lib/hmac'

const loginSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const isDev = process.env.NODE_ENV === 'development'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  if (!isDev) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <ShieldAlert className="h-12 w-12 text-red-500" />
          <h1 className="text-2xl font-bold text-white">Access Denied</h1>
          <p className="text-zinc-400">This tool is only available in development mode.</p>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      const secret = process.env.NEXT_PUBLIC_HMAC_KEY || 'dev-only-key'
      const identityToken = await signIdentityToken(data.identifier, secret)
      
      await authApi.login(identityToken)
      
      toast.success('Login successful!')
      
      // Redirect to join with dummy params for development
      router.push('/auth/join?session=dev-session&invite=dev-invite')
    } catch (error) {
      console.error('Login failed:', error)
      toast.error('Login failed. Please check your credentials or backend status.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#050505] p-4 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-[1px]">
            <div className="flex h-full w-full items-center justify-center rounded-[15px] bg-[#090909]">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Creator Stage
            </h1>
            <p className="text-zinc-400 font-medium">Development Authentication</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="identifier" className="block text-sm font-semibold text-zinc-300 ml-1">
              Identifier
            </label>
            <div className="relative group">
              <input
                id="identifier"
                {...register('identifier')}
                type="text"
                placeholder="e.g. creator-1"
                className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-4 py-4 text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-blue-500/50 focus:bg-white/[0.05] focus:ring-8 focus:ring-blue-500/5"
                disabled={isLoading}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity -z-10" />
            </div>
            {errors.identifier && (
              <p className="text-xs text-red-500 font-medium ml-1 animate-in fade-in slide-in-from-top-1">
                {errors.identifier.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-white px-4 py-4 font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-3 border-black/20 border-t-black" />
            ) : (
              <span className="flex items-center gap-2">
                Launch Session <LogIn className="h-5 w-5" />
              </span>
            )}
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="flex items-start gap-3 rounded-2xl bg-blue-500/5 p-4 border border-blue-500/10 transition-all hover:bg-blue-500/10">
            <ShieldAlert className="h-5 w-5 shrink-0 text-blue-500" />
            <div className="space-y-1">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Dev Tool Active</p>
              <p className="text-[11px] leading-relaxed text-blue-200/60">
                This page signs identity tokens using the local HMAC key: 
                <code className="ml-1 font-mono text-blue-300 bg-blue-500/20 px-1.5 py-0.5 rounded">
                  {process.env.NEXT_PUBLIC_HMAC_KEY || 'dev-only-key'}
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
