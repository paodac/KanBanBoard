import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route

  try {
    // We want to SEND the USER(captured data) to our Server/API (endpoint)
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    if (!response.ok) {
      throw new Error('Login failed: ' + response.statusText);
    }
  

    const data = await response.json();
    console.log("results: ", data);

    return data;
    
  } catch (error) {
    console.log("Error: ", error);
  }

}



export { login };
