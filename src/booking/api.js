// api.js
const BASE_URL = "http://localhost:5000"; // Update with the appropriate server URL

// Function to make payment
export async function makePayment(seatType, seatCount) {
  try {
    const response = await fetch(`${BASE_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seat_type: seatType, seat_count: seatCount }),
    });

    if (!response.ok) {
      throw new Error("Payment failed");
    }

    const data = await response.json();
    console.log(data.message); // Payment successful
  } catch (error) {
    console.log("Payment failed:", error);
    // Handle error during payment
  }
}

// Function to insert seat
export async function insertSeat(seatType, movie) {
  try {
    const response = await fetch(`${BASE_URL}/seat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seat_type: seatType, movie }),
    });

    if (!response.ok) {
      throw new Error("Seat insertion failed");
    }

    const data = await response.json();
    console.log(data.message); // Seat inserted
  } catch (error) {
    console.log("Seat insertion failed:", error);
    // Handle error during seat insertion
  }
}
