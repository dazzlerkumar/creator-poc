import { Suspense } from 'react';
import { LoginForm } from './_components/login-form';
export default function Login() {
  return (

    <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[350px] p-6">
      <div className="text-center">
        <h1 className="text-3xl font-medium">Login to your account</h1>
      </div>
      <div className="space-y-4">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>



  );
}
