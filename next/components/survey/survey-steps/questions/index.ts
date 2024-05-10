import {
  SurveyQuestionSelectInput,
  SurveyQuestionSelectInputProps,
} from "./survey-select-input-question";
import {
  SurveyQuestionTextArea,
  SurveyQuestionTextAreaProps,
} from "./survey-textarea-question";
import {
  SurveyQuestionSlider,
  SurveyQuestionSliderProps,
} from "./survey-slider-question";
import {
  SurveyQuestionTextInput,
  SurveyQuestionTextInputProps,
} from "./survey-text-input-question";

export type SurveyQuestionStepProps = {
  SelectInput: SurveyQuestionSelectInputProps;
  TextArea: SurveyQuestionTextAreaProps;
  Slider: SurveyQuestionSliderProps;
  TextInput: SurveyQuestionTextInputProps;
};

export const SurveyQuestionTemplates: {
  [k in keyof SurveyQuestionStepProps]: (
    Props: SurveyQuestionStepProps[k]
  ) => JSX.Element;
} = {
  SelectInput: SurveyQuestionSelectInput,
  TextArea: SurveyQuestionTextArea,
  Slider: SurveyQuestionSlider,
  TextInput: SurveyQuestionTextInput,
};
