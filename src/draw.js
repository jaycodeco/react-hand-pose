//###### styles ##############

export const graph_style = {
  position: "absolute",
  marginRight: "10px",
  right: 0,
  zIndex: 9,
  width: 650,
  height: 480,
  background: "green",
};

export const cam_style = {
  position: "absolute",
  marginLeft: "10px",
  left: 0,
  zIndex: 9,
  width: 650,
  height: 480,
};
//###############################

//######## fingers ##################

const fingers = {
  thumb: [2, 3, 4, "white"],
  finger2: [5, 6, 7, 8, "white"],
  finger3: [9, 10, 11, 12, "white"],
  finger4: [13, 14, 15, 16, "white"],
  finger5: [17, 18, 19, 20, "white"],
  palm: [0, 1, 5, 9, 13, 17, 0, "red"],
};
//###################################

// the draw function
export const drawMarks = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const marks = prediction.landmarks;

      for (let s = 0; s < Object.keys(fingers).length; s++) {
        let finger = Object.keys(fingers)[s];
        const pt1 = fingers[finger][0];

        ctx.beginPath();
        ctx.moveTo(marks[pt1][0], marks[pt1][1]);

        for (let j = 0; j < fingers[finger].length - 2; j++) {
          const pt2 = fingers[finger][j + 1];

          ctx.lineTo(marks[pt2][0], marks[pt2][1]);
        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = fingers[finger][fingers[finger].length - 1];
        ctx.stroke();

        if (finger === "palm") {
          ctx.closePath();
          ctx.fillStyle = fingers[finger][fingers[finger].length - 1];
          ctx.fill();
        }
      }

      for (let i = 0; i < marks.length; i++) {
        const x = marks[i][0];
        const y = marks[i][1];

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
      }
    });
  }
};
//############################################
