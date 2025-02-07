import ProfileFormContainer from './ProfileFormContainer';

const Profile = () => {
  return (
    <section className="flex flex-col justify-between items-center w-full h-full">
      <h3 className="font-lilita text-cream stroke text-3xl md:text-4xl">Profile</h3>
      <ProfileFormContainer />
    </section>
  );
};

export default Profile;
