'use client';

import ProfileFormContainer from '@/components/myPage/profile/ProfileFormContainer';

import ContentBox from '@common/contentBox';

const SignUp = () => {
  return (
    <>
      <ContentBox size="max-w-2xl max-h-[768px]" layout="p-4 md:p-6">
        <section className="flex flex-col items-center gap-4 w-full h-full">
          <h3 className="font-lilita text-cream stroke text-3xl md:text-4xl">Sign Up</h3>
          <ProfileFormContainer />
        </section>
      </ContentBox>
    </>
  );
};

export default SignUp;
