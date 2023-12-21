import CheckboxGroupController from "../components/Form/CheckboxGroupController";
import InputController from "../components/Form/InputController";
import RadioGroupController from "../components/Form/RadioGroupController";
import SelectController from "../components/Form/SelectController";
import TextareaController from "../components/Form/TextareaController";
import UploadFileController from "../components/Form/UploadFileController";
import { FIELD_TYPE } from "../components/Form/constant";

export const fields = {
  [FIELD_TYPE.INPUT]: (field, control) => (
    <InputController
      control={control}
      name={field.name}
      label={field.label}
      type={field.typeInput}
      placeholder={field?.placeholder}
    />
  ),
  [FIELD_TYPE.TEXTAREA]: (field, control) => (
    <TextareaController
      control={control}
      name={field.name}
      label={field.label}
      option={field.option}
    />
  ),
  [FIELD_TYPE.FILE]: (field, control, watch) => (
    <UploadFileController
      control={control}
      watch={watch}
      name={field.name}
      nameUrl={field?.nameUrl}
      label={field.label}
      type={field.typeInput}
    />
  ),
  [FIELD_TYPE.CHECKBOX]: (field, control) => (
    <CheckboxGroupController
      control={control}
      name={field.name}
      label={field.label}
      option={field.option}
    />
  ),
  [FIELD_TYPE.RADIO]: (field, control) => (
    <RadioGroupController
      control={control}
      name={field.name}
      label={field.label}
      option={field.option}
    />
  ),
  [FIELD_TYPE.SELECT]: (field, control) => (
    <SelectController
      control={control}
      name={field.name}
      label={field.label}
      option={field.option}
      placeholder={field?.placeholder}
    />
  ),
};
