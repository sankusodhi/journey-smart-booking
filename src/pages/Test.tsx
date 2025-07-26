import BookingForm from "../components/BookingForm";
import  PaymentButton  from "../components/PaymentButton";

const Test = () => {
  return (
    <div className="p-4">
      <h1>Bus Booking Test</h1>
      <BookingForm />
      <PaymentButton
        amount={500}
        passengerDetails={{
          name: "Sanku",
          phone: "9876543210",
          email: "sanku@example.com",
        }}
      />
    </div>
  );
};

export default Test;
