import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppErrorBoundary } from "./AppErrorBoundary";

function Crash(): never {
  throw new Error("Storybook crash test");
}

const meta: Meta<typeof AppErrorBoundary> = {
  title: "App/AppErrorBoundary",
  component: AppErrorBoundary,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AppErrorBoundary>;

export const Default: Story = {
  args: {
    children: <Crash />,
  },
};
