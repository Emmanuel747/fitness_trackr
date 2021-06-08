const { REACT_APP_FITNESS_TRACKER_API_URL } = process.env;

export function getToken() {
  const userToken = localStorage.getItem("FitTkrToken");
  return userToken;
}
export function login(userToken) {
  localStorage.setItem("FitTkrToken", userToken);
}
export function logout() {
  localStorage.removeItem("FitTkrToken");
}

export function getUsername() {
  return fetch(`${REACT_APP_FITNESS_TRACKER_API_URL}api/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
