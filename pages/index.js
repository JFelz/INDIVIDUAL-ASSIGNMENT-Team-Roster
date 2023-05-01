import { PropTypes } from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <Card.Img src="https://lh3.googleusercontent.com/a/AGNmyxbeTrjlx4Q_ViUW6E-EL7yWNHqWz7p7himTjBQUIA=s288" style={{ height: '400px', width: '350px' }} alt={user.displayName} />
        </div>
        <div className="text-white ms-5 details" style={{ width: '700px' }}>
          <h1 style={{ color: 'white' }}>Welcome, {user.displayName}! </h1>
          <p style={{ color: 'white' }}>Check out what is new!</p>
        </div>
      </div>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '50vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
          color: 'white',
        }}
      >
        <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </>
  );
}

Home.propTypes = {
  userObj: PropTypes.shape({
    photoUrl: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
};

export default Home;
