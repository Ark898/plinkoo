import { HEIGHT, NUM_SINKS, WIDTH, obstacleRadius, sinkWidth } from "./constants";
import { pad } from "./padding";

export interface Obstacle {
    x: number;
    y: number;
    radius: number;
}

export interface Sink {
    x: number;
    y: number;
    width: number;
    height: number;
    multiplier?: number;
}

const MULTIPLIERS: {[ key: number ]: number} = {
    1: 16,
    2: 9,
    3: 2,
    4: 1.4,
    5: 1.4,
    6: 1.2,
    7: 1.1,
    8: 1,
    9: 0.5,
    10: 1,
    11: 1.1,
    12: 1.2,
    13: 1.4,
    14: 1.4,
    15: 2,
    16: 9,
    17: 16
}

// export const createObstacles = (): Obstacle[] => {
//     const obstacles: Obstacle[] = [];
//     const rows = 18;
//     for (let row = 2; row < rows; row++) {
//         const numObstacles = row + 1;
//         const y = 0 + row * 35;
//         const spacing = 36;
//         for (let col = 0; col < numObstacles; col++) {
//             const x = WIDTH / 2 - spacing * (row / 2 - col);
//             obstacles.push({x: pad(x), y: pad(y), radius: obstacleRadius });
//         }   
//     }
//     return obstacles;
// }


//Circle obstacles
export const createObstacles = (): Obstacle[] => {
    const obstacles: Obstacle[] = [];
    const centerX = WIDTH / 2; // Center of the concentric circles
    const centerY = HEIGHT / 2; // Center of the concentric circles
    const numCircles = 9; // Number of concentric circles
    const initialObstacles = 8; // Base number of obstacles in the innermost circle
    const radiusIncrement = 35; // Distance between consecutive circles

    for (let circle = 1; circle <= numCircles; circle++) {
        const currentRadius = circle * radiusIncrement; // Radius of the current circle
        const obstaclesInThisCircle = initialObstacles + circle * 2; // Increase obstacles with radius
        for (let i = 0; i < obstaclesInThisCircle; i++) {
            const angle = (2 * Math.PI * i) / obstaclesInThisCircle; // Angle for the current obstacle
            const x = centerX + currentRadius * Math.cos(angle); // X-coordinate based on angle
            const y = centerY + currentRadius * Math.sin(angle); // Y-coordinate based on angle
            obstacles.push({
                x: pad(x), // Adjusted X-coordinate
                y: pad(y), // Adjusted Y-coordinate
                radius: obstacleRadius // Radius of the obstacle
            });
        }
    }
    return obstacles;
};



// export const createObstacles = (): Obstacle[] => {
//     const obstacles: Obstacle[] = [];
//     const rows = 18; // Number of rows
//     const cols = 16; // Number of columns
//     const spacingX = 39; // Horizontal spacing between obstacles
//     const spacingY = 32; // Vertical spacing between obstacles
//     const startX = WIDTH / 2 - (cols - 1) * spacingX / 2; // Center the grid horizontally
//     const startY = 60; // Start position for the grid vertically

//     for (let row = 0; row < rows; row++) {
//         for (let col = 0; col < cols; col++) {
//             const x = startX + col * spacingX;
//             const y = startY + row * spacingY;
//             obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
//         }
//     }
//     return obstacles;
// };


export const createSinks = (): Sink[] => {
    const sinks = [];
    const SPACING = obstacleRadius * 2;

    for (let i = 0; i < NUM_SINKS; i++) {
      const x = WIDTH / 2 + sinkWidth * (i - Math.floor(NUM_SINKS/2)) - SPACING * 1.5;
      const y = HEIGHT - 170;
      const width = sinkWidth;
      const height = width;
      sinks.push({ x, y, width, height, multiplier: MULTIPLIERS[i+1] });
    }

    return sinks;
}
