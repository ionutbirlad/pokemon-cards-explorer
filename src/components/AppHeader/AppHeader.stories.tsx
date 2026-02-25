import type { Meta, StoryObj } from "@storybook/react-vite";

import AppHeader from "./AppHeader";

const meta: Meta<typeof AppHeader> = {
  title: "Components/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const Default: Story = {};
