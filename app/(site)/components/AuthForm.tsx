'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Icons
import { BsGithub, BsGoogle } from 'react-icons/bs';

// Components
import Input from '@/app/components/input/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>('REGISTER');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users');
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false));
    }
    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials');
          } else if (callback?.ok) {
            toast.success('Logged in!');
            router.push('/users');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials');
        } else if (callback?.ok) {
          toast.success('Logged in!');
          router.push('/users');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="sm:mx-auto mt-8 sm:w-full sm:max-w-md">
      <div
        className="
            py-8
            px-4
            bg-white
            mx-auto
            shadow
            sm:rounded-lg
            sm:px-10
        ">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              disabled={isLoading}
              label="Name"
              id="name"
              register={register}
              errors={errors}
            />
          )}
          <Input
            disabled={isLoading}
            label="Email adress"
            id="email"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            disabled={isLoading}
            label="Password"
            id="password"
            type="password"
            register={register}
            errors={errors}
          />
          <div>
            <Button fullWidth disabled={isLoading} type="submit">
              {(variant === 'LOGIN' && 'Sign In') || 'Register'}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                    absolute
                    inset-0
                    flex
                    items-center
                ">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-center">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>
        <div
          className="
            flex
            gap-2
            justify-center
            text-sm
            mt-6
            px-2
            text-gray-500
        ">
          <div>{variant === 'LOGIN' ? 'New to SChat?' : 'Already have an account?'}</div>
          <div className="underline cursor-pointer select-none" onClick={toggleVariant}>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
