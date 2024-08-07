import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateDiscount from "app/create-discount/page.tsx";
import { ErrorFormTypes } from "enums/erros.enum.ts";
import { DiscountProvider } from "../hooks/useDiscount";
import { TypeDiscount } from "../enums/types.enum";
import { UploadDropzone } from "../utils/uploadthing";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Screen create discount", () => {
  const jsdomAlert = window.alert; // remember the jsdom alert
  window.alert = () => {}; // provide an empty implementation for window.alert
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("User can`t create a discount if anyone input be void", async () => {
    render(
      <DiscountProvider>
        <CreateDiscount />
      </DiscountProvider>,
    );

    const buttonSave = screen.getByRole("buttonSave");
    fireEvent.click(buttonSave);

    await waitFor(() => {
      expect(screen.getAllByText(ErrorFormTypes.OBRIGATORIO)).toHaveLength(5);
    });
  });

  it("User can`t create a discount without a image", async () => {
    render(
      <DiscountProvider>
        <CreateDiscount />
      </DiscountProvider>,
    );

    const inputNameDiscount = screen.getByRole("nameDiscountRole");
    fireEvent.change(inputNameDiscount, {
      target: { value: "Texto de teste" },
    });
    await waitFor(() => expect(inputNameDiscount.value).toBe("Texto de teste"));

    const inputDescription = screen.getByRole("descriptionRole");
    fireEvent.change(inputDescription, { target: { value: "Texto de teste" } });
    await waitFor(() => expect(inputDescription.value).toBe("Texto de teste"));

    const selectTypeDiscountRoleElement = screen.getByRole(
      "selectTypeDiscountRole",
    );
    fireEvent.change(selectTypeDiscountRoleElement, {
      target: { value: TypeDiscount.DEPOR },
    });
    await waitFor(() =>
      expect(selectTypeDiscountRoleElement.value).toBe(TypeDiscount.DEPOR),
    );

    const inputPriceDPRole = screen.getByRole("priceDPRole");
    fireEvent.change(inputPriceDPRole, { target: { value: 20 } });
    await waitFor(() => expect(inputPriceDPRole.value).toBe("20"));

    const inputPriceWithDiscountRole = screen.getByRole(
      "priceWithDiscountRole",
    );
    fireEvent.change(inputPriceWithDiscountRole, {
      target: { value: 20 },
    });
    await waitFor(() => expect(inputPriceWithDiscountRole.value).toBe("20"));

    const selectActivateDateRoleElement = screen.getByRole(
      "selectActivateDateRole",
    );
    fireEvent.change(selectActivateDateRoleElement, {
      target: { value: "09:00" },
    });
    await waitFor(() =>
      expect(selectActivateDateRoleElement.value).toBe("09:00"),
    );

    const selectDesactiveDateSelectRoleElement = screen.getByRole(
      "selectDesactiveDateSelectRole",
    );
    fireEvent.change(selectDesactiveDateSelectRoleElement, {
      target: { value: "09:00" },
    });
    await waitFor(() =>
      expect(selectDesactiveDateSelectRoleElement.value).toBe("09:00"),
    );
    const buttonSave = screen.getByRole("buttonSave");
    fireEvent.click(buttonSave);

    waitFor(() => {
      expect(screen.getAllByText(ErrorFormTypes.ERROIMAGE)).toHaveLength(1);
    });
  });

  it("User can`t create a discount if the input numbers not filled correctly", async () => {
    render(
      <DiscountProvider>
        <CreateDiscount />
      </DiscountProvider>,
    );

    const inputNameDiscount = screen.getByRole("nameDiscountRole");
    fireEvent.change(inputNameDiscount, {
      target: { value: "Texto de teste" },
    });
    await waitFor(() => expect(inputNameDiscount.value).toBe("Texto de teste"));

    const inputDescription = screen.getByRole("descriptionRole");
    fireEvent.change(inputDescription, { target: { value: "Texto de teste" } });
    await waitFor(() => expect(inputDescription.value).toBe("Texto de teste"));

    const selectTypeDiscountRoleElement = screen.getByRole(
      "selectTypeDiscountRole",
    );
    fireEvent.change(selectTypeDiscountRoleElement, {
      target: { value: TypeDiscount.DEPOR },
    });

    const inputPriceDPRole = screen.getByRole("priceDPRole");
    fireEvent.change(inputPriceDPRole, { target: { value: "Texto de teste" } });

    const inputPriceWithDiscountRole = screen.getByRole(
      "priceWithDiscountRole",
    );
    fireEvent.change(inputPriceWithDiscountRole, {
      target: { value: "Teste de erro" },
    });

    const selectActivateDateRoleElement = screen.getByRole(
      "selectActivateDateRole",
    );
    fireEvent.change(selectActivateDateRoleElement, {
      target: { value: "09:00" },
    });
    await waitFor(() =>
      expect(selectActivateDateRoleElement.value).toBe("09:00"),
    );

    const selectDesactiveDateSelectRoleElement = screen.getByRole(
      "selectDesactiveDateSelectRole",
    );
    fireEvent.change(selectDesactiveDateSelectRoleElement, {
      target: { value: "09:00" },
    });
    await waitFor(() =>
      expect(selectDesactiveDateSelectRoleElement.value).toBe("09:00"),
    );
    const onClientUploadCompleteMock = jest.fn();

    const { getByText } = render(
      <UploadDropzone
        endpoint="imageUploader"
        multiple={false}
        content={{
          button: <span className="z-50">Upload image</span>,
        }}
        onClientUploadComplete={onClientUploadCompleteMock}
        onUploadError={jest.fn()} // Mock the onUploadError callback
      />,
    );
    fireEvent.click(getByText("Upload image"));

    waitFor(() => {
      expect(onClientUploadCompleteMock).toHaveBeenCalled();
    });

    const buttonSave = screen.getByRole("buttonSave");
    fireEvent.click(buttonSave);
    await waitFor(() => {
      expect(screen.getAllByText(ErrorFormTypes.VALOROBRIGATORIO)).toHaveLength(
        2,
      );
    });
  });

  it("User can create a discount", async () => {
    render(
      <DiscountProvider>
        <CreateDiscount />
      </DiscountProvider>,
    );

    const inputNameDiscount = screen.getByRole("nameDiscountRole");
    fireEvent.change(inputNameDiscount, {
      target: { value: "Texto de teste" },
    });
    await waitFor(() => expect(inputNameDiscount.value).toBe("Texto de teste"));

    const inputDescription = screen.getByRole("descriptionRole");
    fireEvent.change(inputDescription, { target: { value: "Texto de teste" } });
    await waitFor(() => expect(inputDescription.value).toBe("Texto de teste"));

    const selectTypeDiscountRoleElement = screen.getByRole(
      "selectTypeDiscountRole",
    );
    fireEvent.change(selectTypeDiscountRoleElement, {
      target: { value: TypeDiscount.DEPOR },
    });

    const inputPriceDPRole = screen.getByRole("priceDPRole");
    fireEvent.change(inputPriceDPRole, { target: { value: 20 } });

    const inputPriceWithDiscountRole = screen.getByRole(
      "priceWithDiscountRole",
    );
    fireEvent.change(inputPriceWithDiscountRole, {
      target: { value: 20 },
    });

    const selectActivateDateRoleElement = screen.getByRole(
      "selectActivateDateRole",
    );
    fireEvent.change(selectActivateDateRoleElement, {
      target: { value: "09:00" },
    });
    await waitFor(() =>
      expect(selectActivateDateRoleElement.value).toBe("09:00"),
    );

    const selectDesactiveDateSelectRoleElement = screen.getByRole(
      "selectDesactiveDateSelectRole",
    );
    fireEvent.change(selectDesactiveDateSelectRoleElement, {
      target: { value: "09:00" },
    });
    await waitFor(() =>
      expect(selectDesactiveDateSelectRoleElement.value).toBe("09:00"),
    );
    const onClientUploadCompleteMock = jest.fn();

    const { getByText } = render(
      <UploadDropzone
        endpoint="imageUploader"
        multiple={false}
        content={{
          button: <span className="z-50">Upload image</span>,
        }}
        onClientUploadComplete={onClientUploadCompleteMock}
        onUploadError={jest.fn()} // Mock the onUploadError callback
      />,
    );
    fireEvent.click(getByText("Upload image"));

    waitFor(() => {
      expect(onClientUploadCompleteMock).toHaveBeenCalled();
    });

    const buttonSave = screen.getByRole("buttonSave");
    fireEvent.click(buttonSave);
    expect(() => screen.getByText(ErrorFormTypes.VALOROBRIGATORIO)).toThrow();
    expect(() => screen.getByText(ErrorFormTypes.OBRIGATORIO)).toThrow();
  });
  window.alert = jsdomAlert; // restore the jsdom alert
});
