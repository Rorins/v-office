import React, { useState, useRef, useEffect } from 'react';
import firebase_app from "@/firebase/config";
import { getFirestore, collection, query, onSnapshot, addDoc, orderBy, limit, deleteDoc, updateDoc, arrayUnion ,getDocs} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default function Canvas() {
  const canvasRef = useRef();
  const contextRef = useRef();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Firestore reference to the collection of drawings
    const drawingsRef = query(collection(db, "canvas"));

    // Subscribe to changes in the drawing data
    const unsubscribe = onSnapshot(drawingsRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const drawing = change.doc.data();
        // Handle the drawing data update (e.g., draw on the canvas)
      });
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set the desired width and height of the canvas
  const width = window.innerWidth;
  const height = 500;

  // Set the canvas dimensions
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = '100%';
  canvas.style.height = `${height}px`;

    // Configure the drawing context
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);

    // Save the starting position of the drawing in Firestore
    addDoc(collection(db, 'canvas'), {
      startX: offsetX,
      startY: offsetY,
    });
  };

  const onMouseUp = () => {
    contextRef.current.closePath();
    setIsDrawing(false);

    // Delete the last drawing in Firestore
    const deleteLastDrawing = async () => {
      const drawingsQuery = query(collection(db, 'canvas'), orderBy('timestamp', 'desc'), limit(1));
      const snapshot = await getDocs(drawingsQuery);
      snapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    };
    deleteLastDrawing();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    // Save the drawing path in Firestore
    const saveDrawingPath = async () => {
      const drawingsQuery = query(collection(db, 'canvas'), orderBy('timestamp', 'desc'), limit(1));
      const snapshot = await getDocs(drawingsQuery);
      snapshot.forEach((doc) => {
        updateDoc(doc.ref, {
          path: arrayUnion({ x: offsetX, y: offsetY }),
        });
      });
    };
    saveDrawingPath();
  };

  return (
    <div className="canvas">
      <canvas
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}
