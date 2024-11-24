import Input from "@/components/atoms/form/Input";

interface ConfirmEmailProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  emailError?: string;
  passwordError?: string;
}

export default function ConfirmEmail({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  emailError,
  passwordError,
}: ConfirmEmailProps) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <div>
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          error={!!emailError}
          helperText={emailError}
          placeholder="Please enter your email"
        />
      </div>
      <div>
        <Input
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          placeholder="Please enter your password"
        />
      </div>
    </div>
  );
}
