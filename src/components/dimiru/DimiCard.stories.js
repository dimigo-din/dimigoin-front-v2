import React from "react";
import DimiCard from "./DimiCard";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

export default {
  title: "components|basic/DimiCard",
  component: DimiCard,
  decorators: [withKnobs]
};

export const dimicard = () => {
  const hover = boolean("hover", false);
  const clickable = boolean("clickable", false);
  const children = text("children", "content");

  return (
    <DimiCard clickable={clickable} hover={hover}>
      {children}
    </DimiCard>
  );
};
dimicard.story = {
  name: "Default"
};
