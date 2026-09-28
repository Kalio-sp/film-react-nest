import type { Meta, StoryObj } from "@storybook/react";
import { SelectSession } from "./SelectSession";

const meta: Meta<typeof SelectSession> = {
  title: "Components/SelectSession",
  component: SelectSession,
};

export default meta;

type Story = StoryObj<typeof SelectSession>;

export const Default: Story = {
  args: {
    selected: null,

    sessions: [
      {
        id: "1",
        daytime: "2026-09-28T10:30:00.000Z",
      },

      {
        id: "2",
        daytime: "2026-09-28T13:00:00.000Z",
      },

      {
        id: "3",
        daytime: "2026-09-28T16:30:00.000Z",
      },

      {
        id: "4",
        daytime: "2026-09-28T19:00:00.000Z",
      },
    ],

    onSelect: (id: string) => {
      console.log(id);
    },
  },
};
