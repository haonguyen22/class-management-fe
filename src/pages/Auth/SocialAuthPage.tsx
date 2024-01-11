import { useEffect } from 'react';
import { useAuthHeader, useSignIn } from 'react-auth-kit';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiCall } from '../../utils/apiCall';
import { userService } from '../../services/user/UserService';
import { IUser } from '../../models/User';

function SocialAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const SignIn = useSignIn();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const name = searchParams.get('name');

  const getMe = async () => {
    const authHeader = useAuthHeader();

    const [tokenType, token] = authHeader().split(' ');

    await apiCall(userService.getMe(), {
      ifSuccess: (data) => {
        SignIn({
          token,
          tokenType,
          expiresIn: 3600,
          authState: { user: data.metadata as IUser },
        });
      },
      ifFailed: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    if (!token || !name) {
      navigate('/login');
    } else {
      SignIn({
        token: token as string,
        tokenType: 'Bearer',
        expiresIn: 3600,
        authState: { email: 'email' },
      });
      getMe();

      navigate('/');
    }
  }, [SignIn, name, navigate, token]);

  return <h1>Redirecting...</h1>;
}

export default SocialAuth;
