import { create } from "zustand";
import dayjs from "dayjs";

interface MeetingStore {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedDateFormatted: string;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  guests: string[];
  guestEmail: string;
  setGuestEmail: (email: string) => void;
  addGuest: () => void;
  removeGuest: (email: string) => void;
}

export const useMeeting = create<MeetingStore>((set) => ({
  selectedDate: dayjs().format("YYYY-MM-DD"),
  setSelectedDate: (date: string) => set({ selectedDate: date }),
  selectedDateFormatted: dayjs().format("dddd, D MMMM"),
  startTime: "",
  setStartTime: (time: string) => set({ startTime: time }),
  endTime: "",
  setEndTime: (time: string) => set({ endTime: time }),
  guests: [],
  guestEmail: "",
  setGuestEmail: (email: string) => set({ guestEmail: email }),
  addGuest: () =>
    set((state) => {
      if (state.guestEmail.trim() !== "") {
        return {
          guests: [...state.guests, state.guestEmail.trim()],
          guestEmail: "",
        };
      }
      return state;
    }),
  removeGuest: (email: string) =>
    set((state) => ({
      guests: state.guests.filter((g) => g !== email),
    })),
}));
