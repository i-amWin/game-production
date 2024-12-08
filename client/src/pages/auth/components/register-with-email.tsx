import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/form/checkbox';
import { Input } from '@/components/ui/form/input';
// import { InputError } from '@/components/ui/form/input-error';
import { InputItem } from '@/components/ui/form/input-item';
import { Label } from '@/components/ui/form/label';
import { IconBag } from '@/assets/icons/icon-bag';
import { IconEmail } from '@/assets/icons/icon-email';
import { IconInvitation } from '@/assets/icons/icon-invitation';
import { IconUser } from '@/assets/icons/icon-user';
import { Link } from 'react-router';
// import { Link, useForm } from '@inertiajs/react';

type RegisterWithEmailProps = {
  inviteCode: string;
  sponsorName: string;
};

export const RegisterWithEmail = ({
  inviteCode,
  sponsorName,
}: RegisterWithEmailProps) => {
  // const { data, setData, post, processing, errors, reset } = useForm({
  //   invite_code: inviteCode,
  //   name: '',
  //   email: '',
  //   password: '',
  //   password_confirmation: '',
  //   agree_privacy: false,
  // });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    console.log(inviteCode);

    // post(route('register-email'), {
    //   onFinish: () => reset('password', 'password_confirmation'),
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
        <Label className="flex gap-2" htmlFor="invite_code">
          <IconInvitation className="w-6 text-primary" />
          Invite Code
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="text"
            id="invite_code"
            name="invite_code"
            // value={data.invite_code}
            // onChange={(value) => setData('invite_code', value)}
            disabled
            required
          />
          <Input
            type="text"
            id="sponsor_name"
            name="sponsor_name"
            value={sponsorName}
            disabled
          />
        </div>
        {/* <InputError>{!sponsorName && 'Invalid Invite Code'}</InputError> */}
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
          name="name"
          // value={data.name}
          // onChange={(value) => setData('name', value)}
          required
          autoFocus
        />
        {/* <InputError>{errors.name}</InputError> */}
      </InputItem>
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
        <Label className="flex gap-2" htmlFor="password_confirmation">
          <IconBag className="w-6 text-primary" />
          Confirm Password
        </Label>
        <Input
          type="password"
          placeholder="Enter your password again"
          id="password_confirmation"
          name="password_confirmation"
          // value={data.password_confirmation}
          // onChange={(value) => setData('password_confirmation', value)}
          required
        />
        {/* <InputError>{errors.password_confirmation}</InputError> */}
      </InputItem>

      <InputItem>
        <div className="flex items-center gap-2 py-2">
          <Checkbox
            id="agree_privacy"
            name="agree_privacy"
            // checked={data.agree_privacy}
            // onChange={(value) => setData('agree_privacy', value)}
            required
          />
          <label htmlFor="agree_privacy" className="text-neutral-700">
            I have read and agree{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Agreement
            </a>
          </label>
        </div>
        {/* <InputError>{errors.agree_privacy}</InputError> */}
      </InputItem>

      <Button
        size="full"
        type="submit"
        // disabled={processing || !sponsorName}
      >
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
