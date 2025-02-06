import ProfileForm from './ProfileForm';

const Profile = () => {
  return (
    <section className="flex flex-col justify-between items-center w-full h-full">
      <h3 className="font-lilita text-cream stroke text-3xl md:text-4xl">Profile</h3>
      <ProfileForm isEditMode={true} />
    </section>
  );
};

export default Profile;
