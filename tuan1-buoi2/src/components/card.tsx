import { UserProps } from '../App';
import './card.css';

const CardUI = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default function Card({ user }: { user: UserProps | null }) {
  return (
    <CardUI>
      {user ? (
        <div>
          <img src={user.avatar} alt="Avatar" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        'Loading...'
      )}
    </CardUI>
  );
}
