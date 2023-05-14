import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <div className="mt-5 d-flex flex-wrap justify-content-center">
        <div className="text-white justify-content-center" style={{ maxWidth: '100%', padding: '0px', margin: '0px' }}>
          <h1 style={{ color: 'white' }}>Welcome, {user.displayName}! </h1>
          <p style={{
            display: 'flex',
            color: 'white',
            margin: '0px',
            padding: '0px',
            maxWidth: '100%',
            justifyContent: 'center',
          }}
          >
            Check out whose new!
          </p>
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
