import type { Meta, StoryObj } from "@storybook/react-vite";

import LevelIcon from "@/assets/icons/equalizer.svg?react";

import CardItem from "./CardItem";

const meta: Meta<typeof CardItem> = {
  title: "PokemonCard/CardItem",
  component: CardItem,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardItem>;

const defaultArgs = {
  icon: <LevelIcon />,
  label: "LV. 15",
};

export const Default: Story = {
  args: { ...defaultArgs, status: "default" },
};

export const Warning: Story = {
  args: { ...defaultArgs, status: "warning" },
};

export const Expired: Story = {
  args: { ...defaultArgs, status: "expired" },
};
