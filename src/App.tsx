import React, { useState } from "react";

function App() {
  const [windows, setWindows] = useState([]);
  const [counter, setCounter] = useState(1);

  const createWindow = () => {
    const id = counter; // Use the counter value as ID
    const width = 300;
    const height = 200;
    const x = Math.floor(Math.random() * (window.innerWidth - width));
    const y = Math.floor(Math.random() * (window.innerHeight - height));
    const color = `hsl(${Math.floor(Math.random() * 360)}, 90%, 70%)`;

    setWindows((prev) => [
      ...prev,
      { id, x, y, width, height, color }
    ]);
    setCounter(counter + 1); // Increment counter after creating window
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const startDrag = (id, e) => {
    e.preventDefault();

    const win = windows.find((w) => w.id === id);
    if (!win) return;

    const offsetX = e.clientX - win.x;
    const offsetY = e.clientY - win.y;

    const onMouseMove = (moveEvent) => {
      const newX = moveEvent.clientX - offsetX;
      const newY = moveEvent.clientY - offsetY;

      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, x: newX, y: newY } : w))
      );
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="relative w-screen h-screen bg-gray-100 overflow-hidden">
      {windows.map((win) => (
        <div
          key={win.id}
          className="absolute shadow-lg rounded overflow-hidden"
          style={{
            left: win.x,
            top: win.y,
            width: win.width,
            height: win.height,
            backgroundColor: win.color,
          }}
        >
          <div
            className="bg-gray-800 text-white p-2 cursor-move flex justify-between items-center"
            onMouseDown={(e) => startDrag(win.id, e)}
          >
            <button
              className="bg-red-500 text-white px-2 ml-2 hover:bg-red-600"
              onClick={() => closeWindow(win.id)}
            >
              ×
            </button>
          </div>
          <div className="flex items-center justify-center h-full">
            Node: {win.id}
          </div>
        </div>
      ))}

      <button
        onClick={createWindow}
        className="fixed bottom-4 right-4 bg-black text-white rounded-full w-12 h-12 text-2xl flex items-center justify-center shadow-lg hover:bg-gray-800"
      >
        +
      </button>
    </div>
  );
}

export default App;
