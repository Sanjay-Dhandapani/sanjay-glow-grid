// Test validation scenarios
const testCases = [
  {
    name: "Empty fields",
    data: { name: "", email: "", subject: "", message: "" }
  },
  {
    name: "Invalid email",
    data: { name: "Test", email: "invalid-email", subject: "Test", message: "Test message" }
  },
  {
    name: "Short message",
    data: { name: "Test", email: "test@test.com", subject: "Test", message: "Short" }
  },
  {
    name: "Honeypot spam",
    data: { name: "Test", email: "test@test.com", subject: "Test", message: "Test message", honeypot: "spam" }
  }
];

async function testValidation() {
  for (const testCase of testCases) {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    try {
      const response = await fetch('http://localhost:4321/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.data)
      });
      const result = await response.json();
      console.log(`Status: ${response.status}`);
      console.log(`Response:`, JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(`❌ Error:`, error.message);
    }
  }
}

testValidation();