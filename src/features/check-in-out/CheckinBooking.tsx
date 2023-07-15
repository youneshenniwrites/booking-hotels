import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";

type BookingType = {
  id: number;
  guests: string[];
  totalPrice: number;
  numGuests: number;
  hasBreakfast: boolean;
  numNights: number;
};

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const booking: BookingType = {
    id: 123,
    guests: ["1", "3", "4"],
    totalPrice: 235,
    numGuests: 3,
    hasBreakfast: true,
    numNights: 5,
  };

  const {
    id: bookingId,
    // guests,
    // totalPrice,
    // numGuests,
    // hasBreakfast,
    // numNights,
  } = booking;

  function handleCheckin() {
    return null;
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
