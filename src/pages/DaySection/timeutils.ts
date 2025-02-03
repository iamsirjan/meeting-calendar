import dayjs from "dayjs";

export const generateTimeSlots = () =>
  Array.from({ length: 48 }, (_, i) =>
    dayjs()
      .hour(0)
      .minute(i * 30)
      .format("HH:mm A")
  );
