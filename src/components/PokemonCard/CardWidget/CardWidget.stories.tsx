import type { Meta, StoryObj } from "@storybook/react-vite";

import VulIcon from "@/assets/icons/eco.svg?react";
import LevelIcon from "@/assets/icons/equalizer.svg?react";
import HeartIcon from "@/assets/icons/favorite.svg?react";
import HeartIconOutline from "@/assets/icons/favorite_outline.svg?react";
import SkullOutline from "@/assets/icons/skull_outline.svg?react";

import CardWidget from "./CardWidget";

const meta: Meta<typeof CardWidget> = {
  title: "PokemonCard/CardWidget",
  component: CardWidget,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "260px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CardWidget>;

const items = [
  { icon: <LevelIcon />, label: "LV. 15", status: "default" as const },
  { icon: <VulIcon />, label: "VUL. -20", status: "default" as const },
  { icon: <HeartIcon />, label: "PS. 100", status: "default" as const },
];

export const Default: Story = {
  args: { items },
};

export const WithWarning: Story = {
  args: {
    items: [
      { icon: <LevelIcon />, label: "LV. 15", status: "default" as const },
      { icon: <VulIcon />, label: "VUL. -20", status: "default" as const },
      { icon: <HeartIconOutline />, label: "PS. 10", status: "warning" as const },
    ],
  },
};

export const WithExpired: Story = {
  args: {
    items: [
      { icon: <LevelIcon />, label: "LV. 15", status: "default" as const },
      { icon: <VulIcon />, label: "VUL. -20", status: "default" as const },
      { icon: <SkullOutline />, label: "PS. 0", status: "expired" as const },
    ],
  },
};
