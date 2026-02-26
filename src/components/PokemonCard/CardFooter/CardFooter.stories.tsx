import type { Meta, StoryObj } from "@storybook/react-vite";

import StarIcon from "@/assets/icons/star.svg?react";
import WaterIcon from "@/assets/icons/water_drop.svg?react";

import CardFooter from "./CardFooter";

const meta: Meta<typeof CardFooter> = {
  title: "PokemonCard/CardFooter",
  component: CardFooter,
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
type Story = StoryObj<typeof CardFooter>;

export const WithTwoIcons: Story = {
  args: {
    label: "POKÉMON BASE",
    icons: [<WaterIcon />, <StarIcon />],
  },
};

export const WithOneIcon: Story = {
  args: {
    label: "POKÉMON BASE",
    icons: [<StarIcon />],
  },
};
