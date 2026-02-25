import type { Meta, StoryObj } from "@storybook/react-vite";

import WaterIcon from "@/assets/icons/water_drop.svg?react";

import CardHeading from "./CardHeading";

const meta: Meta<typeof CardHeading> = {
  title: "PokemonCard/CardHeading",
  component: CardHeading,
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
type Story = StoryObj<typeof CardHeading>;

const defaultArgs = {
  cardNumber: "054",
  typologyName: "acqua",
  typologyIcon: <WaterIcon />,
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
