import type { Meta, StoryObj } from "@storybook/react-vite";

import CardStatus from "./CardStatus";

const meta: Meta<typeof CardStatus> = {
  title: "PokemonCard/CardStatus",
  component: CardStatus,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ background: "#101A2E", padding: "32px", borderRadius: "16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CardStatus>;

export const Default: Story = {};
