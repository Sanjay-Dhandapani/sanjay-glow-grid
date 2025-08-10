// Simple test script for the contact form API
const testData = {
  name: "Test User",
  email: "test@example.com", 
  subject: "Test Subject",
  message: "This is a test message for the contact form validation."
};

fetch('http://localhost:4321/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
.then(response => response.json())
.then(data => {
  console.log('✅ API Response:', JSON.stringify(data, null, 2));
})
.catch(error => {
  console.error('❌ Error:', error);
});