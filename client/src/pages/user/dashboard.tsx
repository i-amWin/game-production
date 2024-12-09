import { useUser } from '@/session/user';

export const Dashboard = () => {
  const user = useUser();

  return (
    <div className="grid grid-cols-2">
      {Object.entries(user ?? []).map((data) => {
        return (
          <>
            <p>{data[0]}</p>
            <p>{String(data[1])}</p>
          </>
        );
      })}
    </div>
  );
};
