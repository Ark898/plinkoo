import React ,{ useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BallManager } from "../game/classes/BallManager";
import axios from "axios";
import { Button } from "../components/ui";
import { baseURL } from "../utils";

export function Game1() {
  const [ballManager, setBallManager] = useState<BallManager>();
  const [clickCount, setClickCount] = useState(0);  
  const [hitIndices, setHitIndices] = useState<number[]>([]);
  const [sumOfIndices, setSumOfIndices] = useState(0);
  const canvasRef = useRef<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (canvasRef.current) {
      const ballManager = new BallManager(
        canvasRef.current as unknown as HTMLCanvasElement,
        (index:number) => {
          setHitIndices((prevIndices) => [...prevIndices, index]);  // Update the hit indices state
          setSumOfIndices((prevSum) => prevSum + index);  // Update the sum of indices state
        }
      );
      setBallManager(ballManager);
    }
  }, [canvasRef]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center">
      <canvas ref={canvasRef} width="800" height="800"></canvas>
      <div className="flex flex-col items-center">
        <Button
          className={`px-10 mb-4 ${
            clickCount >= 10 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          onClick={async () => {
            if (clickCount < 10) {
              try {
                const response = await axios.post(`${baseURL}/game`, { data: 1 });
                if (ballManager) {
                  ballManager.addBall(response.data.point);
                }
                setClickCount((prevCount) => prevCount + 1);
              } catch (error) {
                console.error("Failed to add ball:", error);
              }
            }
          }}
          disabled={clickCount >= 10}
        >
          Add ball
        </Button>
        <p>Balls added: {clickCount} / 10</p>
        <p>Sum of indices touched: {sumOfIndices}</p> {/* Display the sum */}
        <Button
          className="px-4 mt-2 bg-red-500 text-white hover:bg-red-700"
          onClick={() => {
            setClickCount(0);
            setSumOfIndices(0); // Reset the sum when resetting the count
          }}
        >
          Reset Count
        </Button>
        {/* Display the indices of hits */}
        <div className="mt-4">
          <h3>Sinks Hit (Indices):</h3>
          <ul>
            {hitIndices.map((index, idx) => (
              <li key={idx}>Sink Index: {index}</li>
            ))}
          </ul>
        </div>
        {/* Navigation Button */}

        <Button
          className="px-4 mt-4 bg-green-500 text-white hover:bg-green-700"
          onClick={() => navigate("/game2")}
        >
          Go to Game 2
        </Button>
      </div>
    </div>
  );
}  
