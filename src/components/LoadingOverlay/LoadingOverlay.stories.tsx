import type { Meta, StoryObj } from "@storybook/react-vite";

import LoadingOverlay from "./LoadingOverlay";

const meta: Meta<typeof LoadingOverlay> = {
  title: "Components/LoadingOverlay",
  component: LoadingOverlay,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

export const Default: Story = {};
