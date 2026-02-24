import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["active", "disabled"],
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

export const Disabled: Story = {
  args: {
    children: "TEXT",
    status: "disabled",
  },
};
