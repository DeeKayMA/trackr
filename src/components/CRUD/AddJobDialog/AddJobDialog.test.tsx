import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddJobDialog from "./AddJobDialog";
import { toast } from "sonner";
import { supabaseBrowser } from "@/lib/supabase/supabase";

// Mock Supabase
jest.mock("@/lib/supabase/supabase", () => ({
  supabaseBrowser: {
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: "test-user-id" } },
        error: null,
      }),
    },
    from: jest.fn(() => ({
      insert: jest.fn().mockResolvedValue({ data: {}, error: null }),
    })),
  },
}));

// Mock toast
jest.mock("sonner", () => ({
  toast: jest.fn(),
}));

// Force Dialog mode
jest.mock("@react-hook/media-query", () => ({
  useMediaQuery: () => true,
}));

describe("AddJobDialog", () => {
  it("renders the Add Job button", () => {
    render(<AddJobDialog />);
    expect(
      screen.getByRole("button", { name: /add job/i })
    ).toBeInTheDocument();
  });

  it("opens dialog and submits the form", async () => {
    render(<AddJobDialog />);

    const button = screen.getByRole("button", { name: /add job/i });
    await userEvent.click(button);

    const positionInput = await screen.findByLabelText(/position/i);
    await userEvent.type(positionInput, "Frontend Developer");

    const companyInput = screen.getByLabelText(/company/i);
    await userEvent.type(companyInput, "OpenAI");

    const locationInput = screen.getByLabelText(/location/i);
    await userEvent.type(locationInput, "Remote");

    // Find both comboboxes by role
    const comboboxes = screen.getAllByRole("combobox");

    const statusTrigger = comboboxes[0];
    await userEvent.click(statusTrigger);
    await userEvent.click(await screen.findByText("Applied"));

    const jobTypeTrigger = comboboxes[1];
    await userEvent.click(jobTypeTrigger);
    await userEvent.click(await screen.findByText("Full-time"));

    // Date Picker
    const dateButton = screen.getByRole("button", { name: /date applied/i });
    await userEvent.click(dateButton);
    const dateToSelect = await screen.findByRole("button", {
      name: /15 june 2025/i,
    });
    await userEvent.click(dateToSelect);

    const submitBtn = screen.getByRole("button", { name: /add job/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(supabaseBrowser.from).toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith("Job Added", {
        description: "Frontend Developer at OpenAI",
      });
    });
  });
});
