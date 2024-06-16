import create from "zustand";

const useStore = create((set) => ({
  username: "AllanMuhari", // Initial state
  setUsername: (newUsername) => set({ username: newUsername }), // Function to update username
}));

export default useStore;
