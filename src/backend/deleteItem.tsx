import { useSelected } from "@/context/selectedContext";
import { firestore } from "./firebase";
import { doc, deleteDoc } from "firebase/firestore";

export const useDeleteItem = () => {
  const { selected, setSelected } = useSelected();

  const handleDelete = async () => {
    const newSelected = [...selected];
    console.log(selected);
    for (const entry of selected) {
      console.log(entry);
      await deleteDoc(doc(firestore, "inventory", entry));
      const index = newSelected.indexOf(entry);
      if (index > -1) {
        newSelected.splice(index, 1);
      }

      setSelected(newSelected);
    }
  };

  return { handleDelete };
};
