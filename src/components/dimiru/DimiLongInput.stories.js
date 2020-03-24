import React from "react";
import { withKnobs, text, number } from "@storybook/addon-knobs";
import DimiLongInput from "./DimiLongInput";

export default {
  title: "components|basic/DimiLongInput",
  component: DimiLongInput,
  decorators: [withKnobs]
};

export const dimilonginput = () => {
  const placeholder = text("placeholder", "");
  const value = text("value", "");
  const height = number("height", 300);

  return (
    <DimiLongInput placeholder={placeholder} value={value} height={height} />
  );
};

dimilonginput.story = {
  name: "Default"
};
