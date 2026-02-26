import type { Meta, StoryObj } from "@storybook/react-vite";

import psyduckImage from "@/assets/images/pokemons/psyduck.png";

import CardImage from "./CardImage";

const meta: Meta<typeof CardImage> = {
  title: "PokemonCard/CardImage",
  component: CardImage,
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
type Story = StoryObj<typeof CardImage>;

const defaultArgs = {
  src: psyduckImage,
  alt: "Psyduck",
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
