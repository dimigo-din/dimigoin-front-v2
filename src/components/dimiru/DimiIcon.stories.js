import React from "react";
import DimiIcon from "./DimiIcon";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

export default {
  title: "components|basic/DimiIcon",
  component: DimiIcon,
  decorators: [withKnobs]
};

export const dimiicon = () => {
  const icon = text('icon', 'alert')
  const children = text('children', 'content')
  const title = text('title', 'title');
  const pointer = boolean('pointer', false)
  return <DimiIcon icon={icon} title={title} pointer={pointer}>
    {children}
  </DimiIcon>;
};
dimiicon.story = {
  name: "Default"
};
