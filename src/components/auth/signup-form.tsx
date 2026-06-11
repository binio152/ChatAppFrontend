import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";

const signUpSchema = z.object({
  username: z
    .string()
    .min(1, "Tên người dùng phải có ít nhất 1 ký tự")
    .max(50, "Tên người dùng không được quá 50 ký tự"),
  firstName: z
    .string()
    .min(1, "Tên phải có ít nhất 1 ký tự")
    .max(50, "Tên không được quá 50 ký tự"),
  lastName: z
    .string()
    .min(1, "Họ phải có ít nhất 1 ký tự")
    .max(50, "Họ không được quá 50 ký tự"),
  email: z.email("Vui lòng nhập email hợp lệ"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(50, "Mật khẩu không được quá 50 ký tự"),
});

type signUpSchemaType = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const horizontalFields = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
    },
  ] as const;

  const verticalFields = [
    {
      name: "username",
      label: "Username",
      type: "text",
    },

    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
  ] as const;

  const onSubmit = async (data: signUpSchemaType) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("Submitting");
    form.reset();
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>

        <Field orientation="horizontal">
          {horizontalFields.map((el) => (
            <Controller
              key={el.name}
              name={el.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>{el.label}</FieldLabel>
                  <Input
                    type={el.type}
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                    className="h-8 text-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-sm text-destructive"
                    />
                  )}
                </Field>
              )}
            />
          ))}
        </Field>

        <Field orientation="vertical">
          {verticalFields.map((el) => (
            <Controller
              key={el.name}
              name={el.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>{el.label}</FieldLabel>
                  <Input
                    type={el.type}
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                    className="h-8 text-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
        </Field>

        <Field>
          <Button
            type="submit"
            size="sm"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Continue"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Already have an account? <a href="/signin">Sign in</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

export default SignUpForm;
