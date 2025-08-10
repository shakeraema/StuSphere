import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { db, collection, getDocs, setDoc, doc } from "../firebaseConfig"; // Import Firebase Firestore functions

export default function NotesScreen() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState("");

  // Load notes from Firestore on component mount
  useEffect(() => {
    const loadNotes = async () => {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesArray = [];
      querySnapshot.forEach((doc) => {
        notesArray.push({ id: doc.id, ...doc.data() });
      });
      setNotes(notesArray);
    };
    loadNotes();
  }, []);

  // Save notes to Firestore whenever the notes array changes
  useEffect(() => {
    notes.forEach(async (note) => {
      await setDoc(doc(db, "notes", note.id), note);
    });
  }, [notes]);

  // Add a new note
  const addNote = () => {
    if (newNote.trim() === "") {
      Alert.alert("Please enter some text.");
      return;
    }
    const newNoteObject = {
      id: Date.now().toString(),
      text: newNote,
      timestamp: new Date().toLocaleString(),
    };
    setNotes([...notes, newNoteObject]);
    setNewNote(""); // Reset the input field
  };

  // Edit a note
  const editNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setNoteToEdit(noteToEdit.text);
    setEditingNoteId(id); // Set the note to be edited
    setModalVisible(true); // Open modal
  };

  // Save edited note
  const saveEditedNote = () => {
    if (noteToEdit.trim() === "") {
      Alert.alert("Please enter some text.");
      return;
    }
    const updatedNotes = notes.map((note) =>
      note.id === editingNoteId
        ? { ...note, text: noteToEdit, timestamp: new Date().toLocaleString() }
        : note
    );
    setNotes(updatedNotes);
    setNewNote(""); // Reset the input field
    setEditingNoteId(null); // Clear editing state
    setModalVisible(false); // Close modal
  };

  // Delete a note
  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Notes</Text>

      {/* Input field for creating or editing notes */}
      <TextInput
        style={styles.input}
        placeholder="Write a note..."
        value={newNote}
        onChangeText={setNewNote}
      />
      <Button title="Add Note" onPress={addNote} />

      {/* List of notes */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>
              {item.text}{" "}
              <Text style={styles.timestamp}>({item.timestamp})</Text>
            </Text>
            <TouchableOpacity onPress={() => editNote(item.id)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal for editing notes */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Edit note"
              value={noteToEdit}
              onChangeText={setNoteToEdit}
            />
            <Button title="Save" onPress={saveEditedNote} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
    borderColor: "#ccc",
  },
  noteItem: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteText: {
    fontSize: 16,
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  editText: {
    color: "blue",
    fontSize: 14,
  },
  deleteText: {
    color: "red",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
});
