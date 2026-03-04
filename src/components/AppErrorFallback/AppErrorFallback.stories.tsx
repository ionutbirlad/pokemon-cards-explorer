import type { Meta, StoryObj } from "@storybook/react-vite";

import AppErrorFallback from "./AppErrorFallback";

const meta: Meta<typeof AppErrorFallback> = {
  title: "App/AppErrorFallback",
  component: AppErrorFallback,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof AppErrorFallback>;

export const Default: Story = {};
