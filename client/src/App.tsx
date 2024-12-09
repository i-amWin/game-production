import { Link } from 'react-router';

export const App = () => {
  return (
    <div className="w-full min-h-screen bg-neutral-900 text-white flex justify-center items-center flex-col gap-4 text-4xl">
      <div>Main Page</div>
      <Link to="/login">Login</Link>
      <Link
        to={{
          pathname: '/register',
          search: `inviteCode=PD000001`,
        }}
      >
        Register
      </Link>
    </div>
  );
};
