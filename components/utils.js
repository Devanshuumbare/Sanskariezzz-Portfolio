// Generate points for inner ring
function generatePointsInner() {
  const points = [];
  const numPoints = 100;
  const radius = 5;

  // Define brand colors
  const colors = ["#4a4ab1", "#6366f1", "#8b5cf6", "#a855f7", "#ffffff"];

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    // Add some randomness to make it look more natural
    const randomRadius = radius + (Math.random() - 0.5) * 0.5;

    const x = Math.cos(angle) * randomRadius;
    const y = Math.sin(angle) * randomRadius;
    const z = (Math.random() - 0.5) * 0.5;

    // Select a color from the palette
    const colorIndex = Math.floor(Math.random() * colors.length);

    points.push({
      idx: i,
      position: [x, y, z],
      color: colors[colorIndex],
    });
  }

  return points;
}

// Generate points for outer ring
function generatePointsOuter() {
  const points = [];
  const numPoints = 150;
  const radius = 8;

  // Define brand colors
  const colors = ["#4a4ab1", "#6366f1", "#8b5cf6", "#a855f7", "#ffffff"];

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2;
    // Add some randomness to make it look more natural
    const randomRadius = radius + (Math.random() - 0.5) * 1;

    const x = Math.cos(angle) * randomRadius;
    const y = Math.sin(angle) * randomRadius;
    const z = (Math.random() - 0.5) * 1;

    // Select a color from the palette
    const colorIndex = Math.floor(Math.random() * colors.length);

    points.push({
      idx: i + 1000, // Ensure unique keys
      position: [x, y, z],
      color: colors[colorIndex],
    });
  }

  return points;
}

export const pointsInner = generatePointsInner();
export const pointsOuter = generatePointsOuter();
