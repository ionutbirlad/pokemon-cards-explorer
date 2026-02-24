import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["active", "hover", "disabled"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Active: Story = {
  args: {
    children: "TEXT",
    status: "active",
  },
};

export const Hover: Story = {
  args: {
    children: "TEXT",
    status: "hover",
  },
};

export const Disabled: Story = {
  args: {
    children: "TEXT",
    status: "disabled",
  },
};
