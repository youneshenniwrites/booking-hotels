import Button from "../../shared/ui/Button";

function CheckoutButton({ bookingId }: { bookingId: number }) {
  return (
    <Button variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
