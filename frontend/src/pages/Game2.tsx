// // import { useEffect, useRef, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { BallManager } from "../game/classes/BallManager";
// // import axios from "axios";
// // import { Button } from "../components/ui";
// // import { baseURL } from "../utils";

// // export function Game2() {
// //   const [ballManager, setBallManager] = useState<BallManager>();
// //   const canvasRef = useRef<any>();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (canvasRef.current) {
// //       const ballManager = new BallManager(
// //         canvasRef.current as unknown as HTMLCanvasElement
// //       );
// //       setBallManager(ballManager);
// //     }
// //   }, [canvasRef]);

// //   const handleAddBall = async () => {
// //     const response = await axios.post(`${baseURL}/game`, { data: 2 });
// //     if (ballManager) {
// //       ballManager.addBall(response.data.point);
// //       if (response.data.point >= 15) { // Example condition to move to next level
// //         navigate("/game3");
// //       } else {
// //         navigate("/game1"); // Restart from level 1
// //       }
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col lg:flex-row items-center justify-center">
// //       <canvas ref={canvasRef} width="800" height="800"></canvas>
// //       <Button className="px-10 mb-4" onClick={handleAddBall}>
// //         Add ball
// //       </Button>
// //     </div>
// //   );
// // }

// import React ,{ useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { BallManager } from "../game/classes/BallManager";
// import axios from "axios";
// import { Button } from "../components/ui";
// import { baseURL } from "../utils";

// export function Game2() {
//   const [ballManager, setBallManager] = useState<BallManager>();
//   const [clickCount, setClickCount] = useState(0);  
//   const canvasRef = useRef<any>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (canvasRef.current) {
//       const ballManager = new BallManager(
//         canvasRef.current as unknown as HTMLCanvasElement
//       );
//       setBallManager(ballManager);
//     }
//   }, [canvasRef]);

//   // const addBallHandler = async () => {
//   //   if (clickCount < 10) {
//   //     try {
//   //       const response = await axios.post(`${baseURL}/game`, { data: 1 });
//   //       if (ballManager) {
//   //         ballManager.addBall(response.data.point);
//   //       }
//   //       setClickCount((prevCount) => prevCount + 1);
//   //     } catch (error) {
//   //       console.error("Failed to add ball:", error);
//   //     }
//   //   }
//   // };

//   // const resetClickCount = () => {
//   //   setClickCount(0);
//   // };
//   // const handleAddBall = async () => {
//   //   const response = await axios.post(`${baseURL}/game`, { data: 1 });
//   //   if (ballManager) {
//   //     ballManager.addBall(response.data.point);
//   //     if (response.data.point >= 10) { // Example condition to move to next level
//   //       navigate("/Game2");
//   //     } else {
//   //       navigate("/Game1"); // Restart from level 1
//   //     }
//   //   }
//   // };
//   return (
//     <div className="flex flex-col lg:flex-row items-center justify-center">
//       <canvas ref={canvasRef} width="800" height="800"></canvas>
//       <div className="flex flex-col items-center">
//         <Button
//           className={`px-10 mb-4 ${
//             clickCount >= 10 ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700"
//           }`}
//           onClick={async () => {
//             if (clickCount < 10) {
//               try {
//                 const response = await axios.post(`${baseURL}/game`, { data: 1 });
//                 if (ballManager) {
//                   ballManager.addBall(response.data.point);
//                 }
//                 setClickCount((prevCount) => prevCount + 1);
//               } catch (error) {
//                 console.error("Failed to add ball:", error);
//               }
//             }
//           }}
//           disabled={clickCount >= 10}
//         >
//           Add ball
//         </Button>
//         <p>Balls added: {clickCount} / 10</p>
//         <Button
//           className="px-4 mt-2 bg-red-500 text-white hover:bg-red-700"
//           onClick={() => setClickCount(0)}
//         >
//           Reset Count
//         </Button>
//         {/* Navigation Button */}
//         <Button
//           className="px-4 mt-4 bg-green-500 text-white hover:bg-green-700"
//           onClick={() => navigate("/game2")}
//         >
//           Go to Game 2
//         </Button>
//       </div>
//     </div>
//   );
// }  


import React ,{ useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BallManager } from "../game/classes/BallManager2";
import axios from "axios";
import { Button } from "../components/ui";
import { baseURL } from "../utils";

export function Game2() {
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
          onClick={() => navigate("/game3")}
        >
          Go to Game 3
        </Button>
      </div>
    </div>
  );
}  
