import { useForm } from '@/hooks/service';

interface IniialValuesType {
  email: string;
  password: string;
}
const initialValue: IniialValuesType = {
  email: '',
  password: '',
};
const Login = () => {
  const { values, register } = useForm<IniialValuesType>(initialValue);

  return (
    <div>
      <form>
        <div style={{ marginBottom: 20 }}>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            {...register('email')}
          />
        </div>
        <div>
          <input type="text" />
          {values.email}
        </div>
      </form>
    </div>
  );
};

export default Login;
