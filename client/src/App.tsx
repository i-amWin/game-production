import { Link } from 'react-router';

const App = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-neutral-900 text-4xl text-white">
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

export default App;
