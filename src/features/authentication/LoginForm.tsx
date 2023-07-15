import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e: React.SetStateAction<string>) =>
            setEmail(e.target.value)
          }
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e: React.SetStateAction<string>) =>
            setPassword(e.target.value)
          }
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" onClick={() => console.log("Login")}>
          Login
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
