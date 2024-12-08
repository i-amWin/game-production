import { Link } from 'react-router';

export const App = () => {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center flex-col gap-4 text-4xl">
      <div>Main Page</div>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};
