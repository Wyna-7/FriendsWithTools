import { SignIn } from '@clerk/nextjs';
export default function SignInPage () {
  return (
    <>
      <div className='flex items-center'>
        <img src='../../../icon2.svg' alt='EquipMate logo' className='size-12'/>
        <h1 className='text-white text-2xl m-5'>EquipMate</h1>
      </div>
      <SignIn />
    </>
  );
}