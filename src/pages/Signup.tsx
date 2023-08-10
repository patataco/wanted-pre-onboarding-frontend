import { ChangeEvent, useState } from 'react';
import { useRouter } from 'src/hooks/useRouter';
import Button from '../components/Button';
import Input from '../components/Input';
import { validateEmail, validatePassword } from '../../src/utils/utils';
import { UserAuthInput } from 'src/type/type';
import { useAuthContext } from 'src/hooks/useAuthContext';

const Signup = () => {
  const { register } = useAuthContext();
  const [inputData, setinputData] = useState<UserAuthInput>({ email: '', password: '' });

  const isValid = validateEmail(inputData.email) && validatePassword(inputData.password);

  const router = useRouter();

  const handleSignup = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(inputData.email, inputData.password);
      router.push('/signin');
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputData({ ...inputData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto flex h-screen w-[560px] items-center">
      <form
        onSubmit={handleSignup}
        className="flex h-[400px] w-full flex-col  items-center justify-center gap-6 border border-gray-700 p-4"
      >
        <h1 className="text-lg">회원가입</h1>
        <Input
          data-testid="email-input"
          name="email"
          placeholder="email"
          value={inputData.email}
          onChange={handleChange}
          autoComplete="username"
          className="border border-gray-700 pl-2"
        />
        <Input
          data-testid="password-input"
          name="password"
          placeholder="password"
          type="password"
          value={inputData.password}
          onChange={handleChange}
          className="border border-gray-700 pl-2"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          data-testid="signup-button"
          disabled={!isValid}
          className={`flex items-center ${
            isValid ? 'bg-blue-300' : 'border border-gray-300 text-gray-400'
          }`}
        >
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default Signup;
