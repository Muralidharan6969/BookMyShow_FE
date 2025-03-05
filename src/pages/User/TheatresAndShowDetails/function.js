const handleSeatSelection = (seatObj) => {
    if (seatObj.seatStatus !== "AVAILABLE") return;

    setSelectedSeats((prevSelectedSeats) => {
      // Reset remaining seats if we already have selectedSeatCount seats
      if (prevSelectedSeats.length === selectedSeatCount) {
        setRemainingSeats(selectedSeatCount);
        return []; // Clear previous selection
      }

      let updatedSeats = [];
      let newRemainingSeats = selectedSeatCount - prevSelectedSeats.length;

      // Get all available seats in the same row, sorted by column
      const rowSeats = showSeatLayouts
        .filter((seat) => seat.seatRow === seatObj.seatRow)
        .sort((a, b) => a.seatCol - b.seatCol);

      // Find the index of the clicked seat
      const clickedIndex = rowSeats.findIndex(
        (seat) => seat.showSeatMappingId === seatObj.showSeatMappingId
      );

      // Select seats starting from the clicked one
      for (
        let i = clickedIndex;
        i < rowSeats.length && updatedSeats.length < newRemainingSeats;
        i++
      ) {
        const seat = rowSeats[i];
        if (seat.seatStatus !== "AVAILABLE") break;
        updatedSeats.push(seat);
      }

      // Combine with previously selected seats
      const finalSeats = [...prevSelectedSeats, ...updatedSeats];
      setRemainingSeats(selectedSeatCount - finalSeats.length);

      // Update seat layout state
      setShowSeatLayouts((prevLayouts) =>
        prevLayouts.map((seat) => ({
          ...seat,
          seatStatus: finalSeats.some(
            (s) => s.showSeatMappingId === seat.showSeatMappingId
          )
            ? "SELECTED"
            : seat.seatStatus === "SELECTED"
            ? "AVAILABLE"
            : seat.seatStatus,
        }))
      );

      return finalSeats;
    });
  };

const handleSeatSelection = (seatObj) => {
  if (seatObj.seatStatus !== "AVAILABLE") return; // Only process available seats

  setSelectedSeats((prevSelectedSeats) => {
    let updatedSeats = [];
    let newRemainingSeats =
      selectedSeatCount - prevSelectedSeats.length ?? selectedSeatCount;

    // Get all available seats in the same row, sorted by column
    const rowSeats = showSeatLayouts
      .filter((seat) => seat.seatRow === seatObj.seatRow)
      .sort((a, b) => a.seatCol - b.seatCol);

    // Find the index of the clicked seat in the row
    const clickedIndex = rowSeats.findIndex(
      (seat) => seat.showSeatMappingId === seatObj.showSeatMappingId
    );

    // Select seats starting from the clicked one
    for (
      let i = clickedIndex;
      i < rowSeats.length && updatedSeats.length < newRemainingSeats;
      i++
    ) {
      const seat = rowSeats[i];
      if (seat.seatStatus !== "SELECTED" && seat.seatStatus !== "AVAILABLE")
        break;
      updatedSeats.push(seat);
    }

    // If the newly selected seats count is equal to selectedSeatCount, remove the old selection.
    // Otherwise, append only if it doesn't exceed the limit.
    if (updatedSeats.length === selectedSeatCount) {
      // Clear only the necessary seats
      prevSelectedSeats = prevSelectedSeats.filter(
        (seat) =>
          !updatedSeats.some(
            (s) => s.showSeatMappingId === seat.showSeatMappingId
          )
      );
    } else {
      updatedSeats = [...updatedSeats, ...prevSelectedSeats];
    }

    // Update seat layout state
    setShowSeatLayouts((prevLayouts) =>
      prevLayouts.map((seat) => {
        if (
          prevSelectedSeats.some(
            (s) => s.showSeatMappingId === seat.showSeatMappingId
          ) &&
          !updatedSeats.some(
            (s) => s.showSeatMappingId === seat.showSeatMappingId
          )
        ) {
          return { ...seat, seatStatus: "AVAILABLE" }; // Reset deselected seats
        } else if (
          updatedSeats.some(
            (s) => s.showSeatMappingId === seat.showSeatMappingId
          )
        ) {
          return { ...seat, seatStatus: "SELECTED" }; // Mark newly selected seats
        }
        return seat;
      })
    );

    return updatedSeats; // Update selectedSeats state
  });
};
