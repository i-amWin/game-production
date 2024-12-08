import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/form/checkbox';
import { Input } from '@/components/ui/form/input';
// import { InputError } from '@/components/ui/form/input-error';
import { InputItem } from '@/components/ui/form/input-item';
import { Label } from '@/components/ui/form/label';
// import { useAlert } from '@/hooks/useAlert';
import { IconBag } from '@/assets/icons/icon-bag';
import { IconEmail } from '@/assets/icons/icon-email';
// import { Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FormEventHandler } from 'react';
import { Link } from 'react-router';

export const LoginWithEmail = () => {
  // useAlert('error');

  // const { data, setData, post, processing, errors, reset } = useForm({
  //   email: '',
  //   password: '',
  //   remember: false,
  // });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    // post(route('login-email'), {
    //   onFinish: () => reset('password'),
    // });
  };

  return (
    <motion.form
      action=""
      initial={{ x: 100 }}
      animate={{
        x: 0,
      }}
      exit={{
        x: 100,
      }}
      className="space-y-6 py-6"
      onSubmit={submit}
    >
      <InputItem>
        <Label className="flex gap-2" htmlFor="email">
          <IconEmail className="w-6 text-primary" />
          Email
        </Label>
        <Input
          type="email"
          placeholder="Enter your email address"
          id="email"
          name="email"
          // value={data.email}
          // onChange={(value) => setData('email', value)}
          required
        />
        {/* <InputError>{errors.email}</InputError> */}
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
          name="password"
          // value={data.password}
          // onChange={(value) => setData('password', value)}
          required
        />
        {/* <InputError>{errors.password}</InputError> */}
      </InputItem>

      <InputItem>
        <div className="flex items-center gap-2 py-2">
          <Checkbox
            id="agree_privacy"
            name="agree_privacy"
            // checked={data.remember}
            // onChange={(value) => setData('remember', value)}
          />
          <label htmlFor="agree_privacy" className="text-neutral-700">
            Remember me.
          </label>
        </div>
      </InputItem>

      <Button size="full" type="submit" disabled={false}>
        Login
      </Button>

      <Button
        size="full"
        variant="outline"
        asChild
        className="text-neutral-400"
      >
        <Link to="/register" className="group w-full text-center">
          Don't have an account?
          <span className="ml-2 font-bold text-primary group-hover:underline">
            Register
          </span>
        </Link>
      </Button>
    </motion.form>
  );
};
