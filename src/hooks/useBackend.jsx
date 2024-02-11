import { BACKEND_API } from "../config";
import { useStateContext } from "../../StateContext";

export default function useBackend() {

  const { accessToken } = useStateContext();

  const updateReservation = async (newReservationData) => {
    try {
      const response = await fetch(`${BACKEND_API}/reservation/update`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newReservationData),
      });

      const responseData = await response.json();

      if (response.ok) {
        return true;
      } else {
        alert(responseData.error);
        console.error("Reservation modification failed:", responseData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(error);
    }

    // Operation failed
    return false;
  };

  const deleteReservation = async (reservationId) => {
    try {
      const response = await fetch(`${BACKEND_API}/reservation/delete`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reservationId: reservationId })
      });

      const responseData = await response.json();

      if (response.ok) {
        return true;
      } else {
        console.error("Reservation Deletion failed:", responseData.error);
        alert(responseData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(error);
    }

    // Operation failed
    return false;
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${BACKEND_API}/reservations`, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const reservationsData = await response.json();

      if (response.ok) {
        console.log("fetch successfully")
        return reservationsData;
      } else {      
        console.error("Reservation fetch failed:", reservationsData.error);
      }
    } catch(err) {
      console.error(err);
    }

    // Operation failed
    return [];
  }

  const createNewReservation = async (newReservationData) => {
    try {
      // Send reservation data via API request
      const response = await fetch(`${BACKEND_API}/reservation/new`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newReservationData),
      });

      if (response.ok) {
        return true;
      }
    } catch (error) {
      alert(error);
      console.error("An error occurred:", error);
    }

    // Operation failed
    return false;
  }

  return {
    updateReservation,
    deleteReservation,
    fetchReservations,
    createNewReservation,
  }
}