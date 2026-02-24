import type { Meta, StoryObj } from "@storybook/react-vite";

import WaterIcon from "@/assets/icons/water_drop.svg?react";

import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["light", "dark"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Light: Story = {
  args: {
    label: "ELETTRO",
    icon: <WaterIcon />,
    variant: "light",
  },
};

export const Dark: Story = {
  args: {
    label: "ELETTRO",
    icon: <WaterIcon />,
    variant: "dark",
  },
};
