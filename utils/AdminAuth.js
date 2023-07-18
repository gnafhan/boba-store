// /utils/AdminAuth.js
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Spinner from '../components/Loader';

const AdminAuth = (WrappedComponent) => {
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

    // Check if the user is an admin.
    if (!session.user || session.user.role !== 'admin') {
      // Redirect to another page, such as a restricted access page.
      router.replace('/restricted'); // Redirect to a restricted access page.
      return null;
    }

    // If the user is an admin, render the wrapped component.
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default AdminAuth;
