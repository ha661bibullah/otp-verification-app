function sendOtp() {
    const email = document.getElementById("email").value;
  
    fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          document.getElementById("msg").innerText = "OTP পাঠানো হয়েছে!";
          console.log("OTP:", data.otp); // কনসোলে দেখা যাবে (চাইলে hide করতে পারেন)
        } else {
          document.getElementById("msg").innerText = "OTP পাঠানো যায়নি!";
        }
      });
  }


  
 
  let sentOtp = ""; // ইমেইলে পাঠানো OTP-টা এখানে রাখব

  async function sendOtp() {
    const email = document.getElementById("email").value;

    const res = await fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      sentOtp = data.otp; // OTP এখানে রাখুন (পরবর্তীতে ব্যাকএন্ড থেকে সরিয়ে নেব)
      alert("OTP sent to your email!");
    } else {
      alert("OTP পাঠানো যায়নি!");
    }
  }

  function verifyOtp() {
    const userOtp = document.getElementById("otpInput").value;
    const message = document.getElementById("verifyMessage");

    if (userOtp === sentOtp) {
      message.textContent = "✅ OTP সঠিক!";
      message.style.color = "green";
    } else {
      message.textContent = "❌ OTP ভুল!";
      message.style.color = "red";
    }
  }

  

