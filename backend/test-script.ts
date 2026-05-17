async function test() {
  try {
    console.log("Registering user...");
    let res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        role: 'Sales User'
      })
    });
    
    let data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to register');
    
    const token = data.token;
    console.log("Registered! Token:", token);
    
    console.log("Creating lead...");
    let leadRes = await fetch('http://localhost:5000/api/leads', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: 'Lead 1',
        email: 'lead@example.com',
        status: 'New',
        source: 'Website'
      })
    });
    
    let leadData = await leadRes.json();
    if (!leadRes.ok) throw new Error(leadData.message || JSON.stringify(leadData));
    
    console.log("Created Lead:", leadData);
    
  } catch (err: any) {
    console.error("ERROR:", err.message);
  }
}

test();
