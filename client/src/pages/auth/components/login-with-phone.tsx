import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form/input';
import { InputError } from '@/components/ui/form/input-error';
import { InputItem } from '@/components/ui/form/input-item';
import { Label } from '@/components/ui/form/label';

import { loginApi } from '@/api/auth';

import { IconBag } from '@/assets/icons/icon-bag';
import { IconPhone } from '@/assets/icons/icon-phone';

const loginWithPhoneSchema = z.object({
  phone: z
    .string()
    .regex(/^\d+$/, 'Phone number must be numeric')
    .min(10, 'Phone number must be at least 10 digits')
    .max(10, 'Phone number must be at most 10 digits'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export type LoginWithPhoneData = z.infer<typeof loginWithPhoneSchema>;

export const LoginWithPhone = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginWithPhoneData>({
    resolver: zodResolver(loginWithPhoneSchema),
  });

  const { mutate, isLoading } = useMutation(loginApi, {
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorData = error?.response?.data;
        if (errorData) {
          toast.error(errorData.message);
        } else {
          toast.error('Something went wrong');
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong');
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        navigate('/dashboard');
      } else {
        toast.error(data.message);
      }
    },
  });

  const onSubmit = async (data: LoginWithPhoneData) => {
    mutate(data);
  };

  return (
    <motion.form
      action=""
      initial={{ x: -100 }}
      animate={{
        x: 0,
      }}
      exit={{
        x: -100,
      }}
      className="space-y-6 py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputItem>
        <Label className="flex gap-2" htmlFor="phone">
          <IconPhone className="w-6 text-primary" />
          Phone
        </Label>
        <Input
          placeholder="Enter your phone number"
          id="phone"
          {...register('phone')}
        />
        <InputError>{errors.phone?.message}</InputError>
      </InputItem>

      <InputItem>
        <Label className="flex gap-2" htmlFor="password">
          <IconBag className="w-6 text-primary" />
          Password
        </Label>
        <Input
          type="password"
          placeholder="Enter your password"
          {...register('password')}
        />
        <InputError>{errors.password?.message}</InputError>
      </InputItem>

      <Button size="full" type="submit" disabled={isLoading}>
        Login
      </Button>

      <Button
        size="full"
        variant="outline"
        asChild
        className="text-neutral-400"
      >
        <Link
          to={{
            pathname: '/register',
            search: `inviteCode=PD000001`,
          }}
          className="group w-full text-center"
        >
          Don't have an account?
          <span className="ml-2 font-bold text-primary group-hover:underline">
            Register
          </span>
        </Link>
      </Button>
    </motion.form>
  );
};
