import type { Meta, StoryObj } from "@storybook/react-vite";

import VulIcon from "@/assets/icons/eco.svg?react";
import LevelIcon from "@/assets/icons/equalizer.svg?react";
import HeartIcon from "@/assets/icons/favorite.svg?react";
import HeartOutlineIcon from "@/assets/icons/favorite_outline.svg?react";
import SkullIcon from "@/assets/icons/skull.svg?react";
import StarIcon from "@/assets/icons/star.svg?react";
import WaterIcon from "@/assets/icons/water_drop.svg?react";
import psyduckImage from "@/assets/images/pokemons/psyduck.png";

import PokemonCard from "./PokemonCard";

const meta: Meta<typeof PokemonCard> = {
  title: "PokemonCard/PokemonCard",
  component: PokemonCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: 300,
          height: 286,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PokemonCard>;

const defaultArgs = {
  number: "054",
  name: "Psyduck",
  description:
    "Usare i suoi poteri gli causa mal di testa, per questo passa il tempo cercando di non pensare.",
  imageSrc: psyduckImage,
  typologyName: "acqua",
  typologyIcon: <WaterIcon />,
  footerLabel: "POKÉMON BASE",
  footerIcons: [<WaterIcon />, <StarIcon />],
  items: [
    { icon: <LevelIcon />, label: "LV. 15" },
    { icon: <VulIcon />, label: "VUL. -20" },
    { icon: <HeartIcon />, iconOutline: <HeartOutlineIcon />, label: "PS. 100" },
  ],
};

export const Default: Story = {
  args: { ...defaultArgs, status: "default", variant: "full" },
};

export const Warning: Story = {
  args: {
    ...defaultArgs,
    status: "warning",
    variant: "full",
    items: [
      { icon: <LevelIcon />, label: "LV. 15" },
      { icon: <VulIcon />, label: "VUL. -20" },
      { icon: <HeartIcon />, iconOutline: <HeartOutlineIcon />, label: "PS. 10" },
    ],
  },
};

export const Expired: Story = {
  args: {
    ...defaultArgs,
    status: "expired",
    variant: "full",
    items: [
      { icon: <LevelIcon />, label: "LV. 15" },
      { icon: <VulIcon />, label: "VUL. -20" },
      { icon: <SkullIcon />, label: "PS. 0" },
    ],
  },
};

export const Compact: Story = {
  args: { ...defaultArgs, variant: "compact" },
};

export const WithErrorOverlay: Story = {
  args: {
    ...defaultArgs,
    status: "default",
    variant: "full",
    showErrorOverlay: true,
    errorOverlayText: "Oops... qualcosa è andato storto!",
  },
};
