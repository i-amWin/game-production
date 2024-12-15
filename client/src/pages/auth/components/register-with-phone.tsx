import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/form/checkbox';
import { Input } from '@/components/ui/form/input';
import { InputError } from '@/components/ui/form/input-error';
import { InputItem } from '@/components/ui/form/input-item';
import { Label } from '@/components/ui/form/label';

import { registerApi } from '@/api/auth';

import { IconBag } from '@/assets/icons/icon-bag';
import { IconInvitation } from '@/assets/icons/icon-invitation';
import { IconPhone } from '@/assets/icons/icon-phone';
import { IconUser } from '@/assets/icons/icon-user';

type RegisterWithPhoneProps = {
  inviteCode: string | null;
  sponsorName?: string;
};

const registerWithPhoneSchema = z
  .object({
    invite_code: z.string().min(1, 'Invite code is required'),
    name: z
      .string()
      .min(1, 'Name is required')
      .max(255, 'Name is too long (>255)'),
    phone: z
      .string()
      .regex(/^\d+$/, 'Phone number must be numeric')
      .min(10, 'Phone number must be at least 10 digits')
      .max(10, 'Phone number must be at most 10 digits'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
    password_confirmation: z
      .string()
      .min(4, 'Password must be at least 4 characters'),
    agree_privacy: z.boolean().refine((value) => value, {
      message: 'You must agree to the privacy agreement',
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match.',
    path: ['password_confirmation'],
  });

export type RegisterWithPhoneData = z.infer<typeof registerWithPhoneSchema>;

export const RegisterWithPhone = ({
  inviteCode,
  sponsorName,
}: RegisterWithPhoneProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterWithPhoneData>({
    resolver: zodResolver(registerWithPhoneSchema),
    defaultValues: {
      invite_code: inviteCode || '',
    },
  });

  const { mutate, isLoading } = useMutation(registerApi, {
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
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    },
  });

  const onSubmit = async (data: RegisterWithPhoneData) => {
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
        <Label className="flex gap-2" htmlFor="invite_code">
          <IconInvitation className="w-6 text-primary" />
          Invite Code
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="text"
            id="invite_code"
            {...register('invite_code')}
            disabled
          />
          <Input
            type="text"
            id="sponsor_name"
            name="sponsor_name"
            value={sponsorName || ''}
            disabled
          />
        </div>
        <InputError>
          {!sponsorName && !isLoading && 'Invalid Invite Code'}
        </InputError>
        <InputError>{errors.invite_code?.message}</InputError>
      </InputItem>

      <InputItem>
        <Label className="flex gap-2" htmlFor="name">
          <IconUser className="w-6 text-primary" />
          Name
        </Label>
        <Input
          type="text"
          placeholder="Enter your name"
          id="name"
          {...register('name')}
          autoFocus
        />
        <InputError>{errors.name?.message}</InputError>
      </InputItem>

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
          id="password"
          {...register('password')}
        />
        <InputError>{errors.password?.message}</InputError>
      </InputItem>

      <InputItem>
        <Label className="flex gap-2" htmlFor="password_confirmation">
          <IconBag className="w-6 text-primary" />
          Confirm Password
        </Label>
        <Input
          type="password"
          placeholder="Enter your password again"
          id="password_confirmation"
          {...register('password_confirmation')}
        />
        <InputError>{errors.password_confirmation?.message}</InputError>
      </InputItem>

      <InputItem>
        <div className="flex items-center gap-2 py-2">
          <Checkbox id="agree_privacy" {...register('agree_privacy')} />
          <label htmlFor="agree_privacy" className="text-neutral-700">
            I have read and agree{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Agreement
            </a>
          </label>
        </div>
        <InputError>{errors.agree_privacy?.message}</InputError>
      </InputItem>

      <Button size="full" type="submit" disabled={isLoading || !sponsorName}>
        Register
      </Button>

      <Button
        size="full"
        variant="outline"
        asChild
        className="text-neutral-400"
      >
        <Link to="/login" className="group w-full text-center">
          Already have an account?
          <span className="ml-2 font-bold text-primary group-hover:underline">
            Login
          </span>
        </Link>
      </Button>
    </motion.form>
  );
};
