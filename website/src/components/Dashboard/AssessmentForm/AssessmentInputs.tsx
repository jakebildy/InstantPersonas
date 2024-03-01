import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";
import {
  TextQuestion,
  NumberQuestion,
  SelectQuestion,
} from "./generic-questions";

export function TextInput({ question }: { question: TextQuestion }) {
  const { register } = useFormContext();

  return (
    <Textarea
      {...register(question.question, { required: false })}
      placeholder={
        question.placeholder ? question.placeholder : "Type your answer..."
      }
      className="min-h-[200px] max-h-fit resize-none"
    />
  );
}

export function NumberInput({ question }: { question: NumberQuestion }) {
  const { register } = useFormContext();

  return (
    <Input
      type="number"
      {...register(question.question, { valueAsNumber: true, required: false })}
      placeholder={
        question.placeholder ? question.placeholder : "Enter a number..."
      }
    />
  );
}

export function SelectInput({ question }: { question: SelectQuestion }) {
  const { control } = useFormContext();
  return (
    <div>
      <Controller
        name={question.question}
        control={control}
        rules={{ required: false }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  question.placeholder
                    ? question.placeholder
                    : "Select an option"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {question.options.map((option: string) => (
                  <SelectItem value={option} key={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
