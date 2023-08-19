'use client';

import React, { useState, useCallback } from 'react';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';

// Icons
import { BsGithub, BsGoogle, Bs8Square } from 'react-icons/bs';

// Components
import Input from '@/app/components/input/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

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
      // Axios register
    }
    if (variant === 'LOGIN') {
      // NextAuth SignIn
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NExtAuth Social SignIn
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
            <Input label="Name" id="Name" register={register} errors={errors} />
          )}
          <Input label="Email adress" id="email" type="email" register={register} errors={errors} />
          <Input
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
