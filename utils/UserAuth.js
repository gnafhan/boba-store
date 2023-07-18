// /utils/AdminAuth.js
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Spinner from '../components/Loader';

const UserAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Show a loading spinner while the session is being fetched.
    if (status === 'loading') {
      return <Spinner />;
    }

    // Redirect to login page if the user is not logged in.
    if (!session) {
      router.replace('/auth/signIn'); // Redirect to your login page.
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default UserAuth;
