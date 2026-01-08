// @/components/ui/FormInput.tsx
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  required?: boolean;
}

const FormInput = ({ label, id, required = false, ...props }: FormInputProps) => {
  return (
    <label className="space-y-1 text-sm text-amber-600">
      {label} {required && <span className="text-amber-400">*</span>}
      <input
        id={id}
        className="w-full rounded-lg border border-amber-200 px-3 py-2 text-sm text-amber-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        required={required}
        {...props}
      />
    </label>
  );
};

export default FormInput;