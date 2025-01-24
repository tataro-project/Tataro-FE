import StoreProvider from './StoreProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StoreProvider>{children}</StoreProvider>
    </>
  );
};

export default Providers;
