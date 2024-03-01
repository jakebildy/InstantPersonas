import { TextInput, NumberInput, SelectInput } from "./AssessmentInputs";
import { SurveyQuestion } from "./generic-questions";

export default function AssessmentQuestion({
  question,
  index,
}: {
  question: SurveyQuestion;
  index: number;
}) {
  const renderInput = () => {
    switch (question.response_type) {
      case "text":
        return <TextInput question={question} />;
      case "number":
        return <NumberInput question={question} />;
      case "select":
        return <SelectInput question={question} />;
      default:
        return null; // Handle unsupported response types or provide a default input component.
    }
  };

  return (
    <div className="my-4">
      <p className="text-gray-400 text-xs py-2 mt-2">
        {index + 1}. {question.category ? question.category : "Assessment"}
      </p>
      <h3 className="text-gray-900 text-md font-semibold mb-2">
        {question.question}
      </h3>
      <div className="px-2">{renderInput()}</div>
    </div>
  );
}
