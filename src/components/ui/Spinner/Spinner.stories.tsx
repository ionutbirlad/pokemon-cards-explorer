import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "range", min: 32, max: 128, step: 8 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: 64,
  },
};

export const Small: Story = {
  args: {
    size: 32,
  },
};

export const Large: Story = {
  args: {
    size: 128,
  },
};
