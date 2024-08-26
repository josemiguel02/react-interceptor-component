import { Toaster } from 'sonner';
import { Interceptor } from './Http/Interceptor';
import { Posts } from './components/Posts';

const App = () => {
  return (
    <>
      <Interceptor />
      <Toaster richColors position="top-right" />
      <Posts />
    </>
  );
};

export default App;
