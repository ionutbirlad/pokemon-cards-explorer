import type { Meta, StoryObj } from "@storybook/react-vite";

import TextBlock from "./TextBlock";

const meta: Meta<typeof TextBlock> = {
  title: "UI/TextBlock",
  component: TextBlock,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextBlock>;

export const Default: Story = {
  args: {
    title: "Il tuo Poké Deck",
    description:
      "Dai un'occhiata al più grande e completo database di carte Pokémon! Troverai carte di ogni espansione e tante curiosità sulle tue collezioni. Clicca sui tuoi Pokémon per scoprire di più su di loro!",
    variant: "default",
  },
};

export const Empty: Story = {
  args: {
    description: "Non sono stati trovati risultati per questa pagina ti invitiamo a riprovare",
    variant: "empty",
  },
};
