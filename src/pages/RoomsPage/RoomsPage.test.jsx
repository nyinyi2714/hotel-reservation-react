import { filterRooms } from "./RoomsPage";

describe("filterRooms", () => {
  const rooms = [
    { roomType: "standard" },
    { roomType: "deluxe" },
    { roomType: "suite" }
  ];

  test("should return an array of rooms with matching room type", () => {
    const result = filterRooms(rooms, "deluxe");
    console.log(result)
    expect(result).toEqual([{ roomType: "deluxe" }]);
  });

  test("should return an empty array if no matching room type is found", () => {
    const result = filterRooms(rooms, "penthouse");
    expect(result).toEqual([]);
  });

  test("should be case-insensitive when matching room types", () => {
    const result = filterRooms(rooms, "sUITE");
    expect(result).toEqual([{ roomType: "suite" }]);
  });

  test("should return all rooms if roomQuery is an empty string", () => {
    const result = filterRooms(rooms, "");
    expect(result).toEqual(rooms);
  });

  test("should return an empty array if roomQuery is a room type that doesn\"t exist", () => {
    const result = filterRooms(rooms, "penthouse");
    expect(result).toEqual([]);
  });
});
