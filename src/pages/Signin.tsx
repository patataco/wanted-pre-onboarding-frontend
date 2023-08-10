import { ChangeEvent, startTransition, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { validateEmail, validatePassword } from 'src/utils/utils';
import { UserAuthInput } from 'src/type/type';
import { useAuthContext } from 'src/hooks/useAuthContext';
import { useRouter } from 'src/hooks/useRouter';

const Signin = () => {
  const { login } = useAuthContext();
  const router = useRouter();

  const [inputData, setInputData] = useState<UserAuthInput>({ email: '', password: '' });

  const isValid = validateEmail(inputData.email) && validatePassword(inputData.password);

  const handleSignin = async (e: ChangeEvent<HTMLFormElement>) => {
    if (!isValid) return;
    e.preventDefault();
    try {
      await login(inputData.email, inputData.password);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const goToSignup = () => {
    startTransition(() => {
      router.push('/signup');
    });
  };

  return (
    <div className="mx-auto flex h-screen w-[560px] items-center">
      <form
        onSubmit={handleSignin}
        className="flex h-[400px]  w-full flex-col items-center justify-center gap-6 border border-gray-700 p-4"
      >
        <h1 className="text-lg">로그인</h1>
        <Input
          data-testid="email-input"
          name="email"
          placeholder="email"
          value={inputData.email}
          onChange={handleChange}
          autoComplete="username"
          className="h-9 w-56 border border-gray-700  pl-2"
        />
        <Input
          data-testid="password-input"
          name="password"
          type="password"
          placeholder="password"
          value={inputData.password}
          onChange={handleChange}
          className="h-9 w-56 border border-gray-700  pl-2"
          autoComplete="current-password"
        />
        <div className="flex gap-4">
          <Button
            type="submit"
            data-testid="signin-button"
            disabled={!isValid}
            className={`flex items-center ${
              isValid ? 'bg-blue-300' : 'border border-gray-300 text-gray-400'
            }`}
          >
            로그인
          </Button>
          <Button type="button" className="flex items-center bg-blue-300" onClick={goToSignup}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Signin;
