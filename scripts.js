const words = ["POPULATION", "ECONOMY", "HEALTH", "INDUSTRY", "CLIMATE", "ENERGY", "CULTURE","TOURISM", 
    "SPORTS", "MEDIA", "SCIENCE", "DESIGN", "JUSTICE", "PEACE", "FREEDOM", "COMPUTER", "RESPONSE", "RECOVERY",
    "EARN","EARTH","EASIER","EASILY","EAST","EASY","SPELL","SPEND","SPENT","SPIDER","SPIN","SPIRIT","SPITE",
    "SPLIT","SPOKEN","SPORT","SPREAD","SPRING","SQUARE","STAGE","STAIRS","STAND","STANDARD","STAR"];
  let correctWords = []; // สร้างอาร์เรย์เก็บคำที่พิมพ์ถูก
  let score = 0;
  let time = 60;
  let output = ""; // สร้างตัวแปรเก็บข้อความที่แสดง
  let input = ""; // สร้างตัวแปรเก็บข้อความที่ผู้เล่นพิมพ์
  let timer; // สร้างตัวแปรเก็บ setInterval
  let randomWords = 0;
  let isGameRunning = false; 
  let correctAudio = new Audio("Material/correct-choice-43861.mp3"); 
  let incorrectAudio = new Audio("Material/wronganswer-37702.mp3"); 
  
  const Score = document.getElementById("score");
  const Time = document.getElementById("time");
  const Word = document.getElementById("word");
  const startButton = document.getElementById("start");
//   const Speed = document.getElementById("speed");
//   const Accuracy = document.getElementById("accuracy");
  
  function startGame() {
      score = 0; // รีเซ็ตคะแนน
      time = 60; // รีเซ็ตเวลา
      input = ""; // รีเซ็ตข้อความที่พิมพ์
      isGameRunning = true; // ตั้งสถานะเริ่มเกม
      Score.textContent = score; 
      Time.textContent = time; 
      startButton.disabled = true; // ปิดปุ่มเริ่มเกม
      words.push(...correctWords); // เพิ่มคำที่พิมพ์ถูกไปแล้วกลับไปในอาร์เรย์ ***...correctWords คือการเพิ่มคำที่พิมพ์ถูกไปแล้วกลับไปในอาร์เรย์
      correctWords = []; // รีเซ็ตคำที่พิมพ์ถูก
  
      randomWord();
      timer = setInterval(countdown, 1000); // สร้าง setInterval ให้เรียกฟังก์ชัน countdown ทุกๆ 1 วินาที
  
    //document.body.focus(); // ให้เคอร์เซอร์อยู่ที่ body
  }
  
  function randomWord() {
      if (words.length === 0) {
          clearInterval(timer); // หยุด setInterval
          endGame();
          return;
      }
  
      // const randomWords = Math.floor(Math.random() * words.length); // สุ่มคำ **floor คือปัดเศษลง
      // output = words.splice(randomWords, 1)[0]; // ลบคำจากอาร์เรย์และนำมาใช้
      // correctWords.push(output); // เก็บคำที่พิมพ์ถูกไปแล้ว
      // Word.textContent = output; // แสดงคำใน UI
  
      randomWords = Math.floor(Math.random() * (words.length - 1)); // สุ่มคำ **floor คือปัดเศษลง
      output = words[randomWords]; // นำคำที่สุ่มได้ เก็บไว้ใน output
      Word.textContent = output; // แสดงคำใน UI
  }
  
  function countdown() {
      time--;
      Time.textContent = time;
  
      if (time <= 0) {
          clearInterval(timer);  // หยุด setInterval
          endGame();
      }
  }
  
  function wordsDisplay() {
      Word.innerHTML = ""; //ลบคำที่แสดงอยู่ **innerHTML คือการเข้าถึง element และเปลี่ยนค่าของ element นั้น
      for (let i = 0; i < output.length; i++) {
          const span = document.createElement("span"); // สร้าง element span
          if (i < input.length) {
              if (input[i].toLowerCase() === output[i].toLowerCase()) { // ถ้าตัวอักษรที่พิมพ์ตรงกับคำที่แสดง
                  span.classList.add("correct"); // ใส่ class correct
              } else {
                  span.classList.add("incorrect"); // ใส่ class incorrect
              }
              span.textContent = output[i]; 
          } else {
              span.classList.add("remaining"); // ใส่ class remaining
              span.textContent = output[i];
          }
          Word.appendChild(span); // เพิ่ม span ใน Word
      }
  }
  
  function checkInput(key) {
      if (!isGameRunning) return; // ถ้าเกมไม่ได้เริ่มให้หยุดฟังก์ชัน
      
      input += key; // เพิ่มตัวอักษรที่พิมพ์เข้าไปใน input
      wordsDisplay(); 
  
      if (input.trim().toLowerCase() === output.trim().toLowerCase()) { // ถ้าคำที่พิมพ์ตรงกับคำที่แสดง input.trim() คือตัดช่องว่างที่อยู่หน้าและหลังข้อความ **toLowerCase คือเปลี่ยนเป็นตัวพิมพ์เล็ก
        correctAudio.pause(); 
            correctAudio.currentTime = 0; 
        correctAudio.play(); 
          score++; 
          Score.textContent = score; 
          input = ""; 
          correctWords.push(output); // เพิ่มคำที่พิมพ์ถูกต้องลงในอาร์เรย์ correctWords
          words.splice(randomWords, 1); // ลบคำที่ถูกต้องออกจากอาร์เรย์ words
          randomWord();
      } else if (!output.toLowerCase().startsWith(input.trim().toLowerCase())) { // ถ้าคำที่พิมพ์ไม่ตรงกับคำที่แสดง **startsWith คือเช็คว่าคำที่พิมพ์เริ่มต้นด้วยคำที่แสดงหรือไม่
          incorrect = 0; //ตัวนับตัวอักษรที่พิมพ์ผิด
  
          //ตรวจสอบที่ละตัวอักษร **? คือถ้าไม่เท่ากันให้ทำอะไรกับตัวอักษรนั้น toLowerCase คือเปลี่ยนเป็นตัวพิมพ์เล็ก
          for (let i = 0; i < input.length; i++) {
              if (input[i].toLowerCase() !== output[i]?.toLowerCase()) {
                  incorrect++; 
              }
  
              // ถ้าพิมพ์ผิดมากกว่า 3 ตัว ให้ลดคะแนน และเปลี่ยนคำใหม่
              if (incorrect >= 3) {
                incorrectAudio.pause();
                    incorrectAudio.currentTime = 0; 
                incorrectAudio.play(); 
  
                  if (score > 0) {
                      score--; 
                      Score.textContent = score; 
                  }
                  input = ""; 
                  randomWord();
                  return;
              }
          }
          
          // ถ้าพิมพ์ถูกต้องทั้งคำและไม่ผิดเกิน3ครั้ง
          if (input.length === output.length) {
            correctAudio.pause(); 
                correctAudio.currentTime = 0; 
            correctAudio.play(); 

              score++; 
              Score.textContent = score; 
              input = ""; 
              correctWords.push(output); // เพิ่มคำที่พิมพ์ถูกต้องลงในอาร์เรย์ correctWords
              words.splice(randomWords, 1); // ลบคำที่ถูกต้องออกจากอาร์เรย์
              randomWord();
          }
      }
      result();
  }
  
  function endGame() {
      isGameRunning = false; // ตั้งสถานะหยุดเกม
      Word.textContent = "Game Over!!!"; 
      alert("Game over! Your score is " + score
       + "\nCorrect words is " + correctWords.length); 
      startButton.disabled = false; 

      result();
  }
  
  // ตรวจสอบการพิมพ์ **click คือเมื่อคลิก
  startButton.addEventListener("click", startGame); // เมื่อคลิกปุ่มเริ่มเกม
  
  // ตรวจสอบการพิมพ์ **keydown คือเมื่อกดปุ่ม event จะทำงาน รับการพิมพ์จากkyboard
  document.addEventListener("keydown", (event) => {
      // ตรวจสอบเงื่อนไขว่าพิมพ์ /^[a-zA-Z]$/ คือต้องเป็นตัวอักษร a-z หรือ A-Z **test คือเช็คว่าตรงกับเงื่อนไขหรือไม่
      if (time > 0 && /^[a-zA-Z]$/.test(event.key)) {
          checkInput(event.key); // ตรวจสอบคำที่พิมพ์ ส่ง event.key ไปให้ฟังก์ชัน checkInput
      }
  });

  function result() {
    //คิดออกค่อยมาเขียน
  }