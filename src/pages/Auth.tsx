import { useEffect } from 'react';
import { useSignIn } from 'react-auth-kit';
import { useLocation, useNavigate } from 'react-router-dom';

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const SignIn = useSignIn();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const name = searchParams.get('name');
  useEffect(() => {
    if (!token || !name) navigate('/login');
    SignIn({
      token: token as string,
      tokenType: 'Bearer',
      expiresIn: 3600,
      authState: { email: 'email' },
    });
    navigate('/');
  }, [SignIn, name, navigate, token]);

  return <h1> {token} - {name} </h1>;
}

export default Auth;
